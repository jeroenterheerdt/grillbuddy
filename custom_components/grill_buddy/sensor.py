from datetime import timedelta
import logging

from homeassistant.components.sensor import DOMAIN as PLATFORM, SensorEntity
from homeassistant.components.sensor.const import SensorDeviceClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback, Event, EventStateChangedData
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.helpers.entity import generate_entity_id
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType
from homeassistant.util import slugify
from homeassistant.util.unit_system import METRIC_SYSTEM

from .const import (
    ABOVE_LOWER_BOUND,
    ABOVE_TARGET_TEMPERATURE,
    ABOVE_UPPER_BOUND,
    AT_TARGET_TEMPERATURE,
    BELOW_LOWER_BOUND,
    BELOW_TARGET_TEMPERATURE,
    BELOW_UPPER_BOUND,
    COORDINATOR,
    DOMAIN,
    MANUFACTURER,
    NAME,
    OUTSIDE_BOUNDS,
    PRESET_NAME,
    PRESET_TARGET_TEMPERATURE,
    PROBE_ID,
    PROBE_LOWER_BOUND,
    PROBE_NAME,
    PROBE_PRESET,
    PROBE_SOURCE,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_TEMPERATURE,
    PROBE_UPPER_BOUND,
    PROBES,
    SENSOR_ICON,
    STATE_UPDATE_SETTING_ID,
    STATE_UPDATE_SETTING_NAME,
    UNIT_DEGREES_C,
    UNIT_DEGREES_F,
    VERSION,
    WITHIN_BOUNDS,
)
from .helpers import (
    convert_temperatures,
    get_localized_temperature,
    get_localized_temperature_unit,
    is_number,
    parse_sensor_state,
)
from .localize import localize

_LOGGER = logging.getLogger(__name__)


def setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up the sensor platform."""


@callback
async def async_setup_entry(
    hass, config_entry: ConfigEntry, async_add_devices: AddEntitiesCallback
):
    """Set up the Grill Buddy sensor entities."""

    @callback
    def async_add_sensor_entity(config: dict):
        """Add each probe as Sensor entity."""
        entity_id = "{}.{}".format(PLATFORM, DOMAIN + "_" + slugify(config[PROBE_NAME]))

        sensor_entity = GrillBuddyProbeEntity(
            hass=hass,
            entity_id=entity_id,
            name=config[PROBE_NAME],
            id=config[PROBE_ID],
            source=config[PROBE_SOURCE],
            preset=config[PROBE_PRESET],
            temperature=config[PROBE_TEMPERATURE],
            lower_bound=config[PROBE_LOWER_BOUND],
            upper_bound=config[PROBE_UPPER_BOUND],
            state_update_setting=config[PROBE_STATE_UPDATE_SETTING],
        )

        hass.data[DOMAIN][PROBES][config[PROBE_ID]] = sensor_entity
        async_add_devices([sensor_entity])

    async_dispatcher_connect(hass, DOMAIN + "_register_entity", async_add_sensor_entity)
    async_dispatcher_send(hass, DOMAIN + "_platform_loaded")

    # register services if any here


class GrillBuddyProbeEntity(SensorEntity, RestoreEntity):
    def __init__(
        self,
        hass: HomeAssistant,
        id: str,
        name: str,
        entity_id: str,
        source: str,
        preset: float,
        temperature: float,
        lower_bound: float,
        upper_bound: float,
        state_update_setting: int,
    ) -> None:
        """Initialize the sensor entity."""
        self._hass = hass
        self.entity_id = generate_entity_id(
            entity_id_format="sensor.{}", name=entity_id.split(".")[1], hass=hass
        )
        self._id = id
        self._name = name
        self._source = source
        self._state_listener = None
        self._preset = self._hass.data[DOMAIN][COORDINATOR].store.async_get_preset(
            preset
        )
        self._temperature = temperature
        self._system_is_metric = hass.config.units is METRIC_SYSTEM
        self._status = None
        self._lower_bound = lower_bound
        self._upper_bound = upper_bound
        if self._preset is not None:
            if self._lower_bound is None:
                self._lower_bound = self._preset[PRESET_TARGET_TEMPERATURE]
            if self._upper_bound is None:
                self._upper_bound = self._preset[PRESET_TARGET_TEMPERATURE]
        self._state_update_setting = self._hass.data[DOMAIN][
            COORDINATOR
        ].store.async_get_state_update_setting(state_update_setting)
        self._time_to_target = None
        self._notification_sent = False
        self.async_watch_sensor_states()
        async_dispatcher_connect(
            hass, DOMAIN + "_config_updated", self.async_update_sensor_entity
        )

    def async_watch_sensor_states(self):
        if self._state_listener:
            self._state_listener()
        if self._source:
            self._state_listener = async_track_state_change_event(
                self._hass, self._source, self.async_sensor_state_changed
            )
        else:
            self._state_listener = None

    @callback
    def async_sensor_state_changed(
        self, event: Event[EventStateChangedData]
    ) -> None:  # old signature: entity, old_state, new_state):
        """Callback fired when a sensor state has changed."""

        old_state_obj = event.data["old_state"]
        new_state_obj = event.data["new_state"]
        entity = event.data["entity_id"]
        old_state = parse_sensor_state(old_state_obj)
        new_state = parse_sensor_state(new_state_obj)
        if new_state in (STATE_UNKNOWN, STATE_UNAVAILABLE):
            # sensor is unknown at startup, state which comes after is considered as initial state
            _LOGGER.debug("Initial state for {} is {}".format(entity, new_state))
            return
        if old_state == new_state:
            # not a state change - ignore
            return
        if is_number(new_state):
            self._temperature = float(new_state)
            # if system is not metric, convert to metric before proceeding
            if not self._system_is_metric:
                self._temperature = convert_temperatures(
                    UNIT_DEGREES_F, UNIT_DEGREES_C, self._temperature
                )
            if (
                is_number(self._temperature)
                and self._preset
                and is_number(self._preset[PRESET_TARGET_TEMPERATURE])
            ):
                # handle state update settings here
                if (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 0
                ):  # at target temperature
                    if self._temperature < self._preset[PRESET_TARGET_TEMPERATURE]:
                        self._status = BELOW_TARGET_TEMPERATURE
                    elif self._temperature > self._preset[PRESET_TARGET_TEMPERATURE]:
                        self._status = ABOVE_TARGET_TEMPERATURE
                    else:
                        self._status = AT_TARGET_TEMPERATURE
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 1
                ):  # within bounds
                    if (
                        self._temperature >= self.get_lower_bound()
                        and self._temperature <= self.get_upper_bound()
                    ):
                        self._status = WITHIN_BOUNDS
                    else:
                        self._status = OUTSIDE_BOUNDS
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 2
                ):  # below_lower_bound
                    if self._temperature < self.get_lower_bound():
                        self._status = BELOW_LOWER_BOUND
                    else:
                        self._status = ABOVE_LOWER_BOUND
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 3
                ):  # above_upper_bound
                    if self._temperature > self.get_upper_bound():
                        self._status = ABOVE_UPPER_BOUND
                    else:
                        self._status = BELOW_UPPER_BOUND

            # add prediction

            if not is_number(old_state) or not is_number(self._temperature):
                delta = 0
            else:
                if not self._system_is_metric:
                    old_state = convert_temperatures(
                        UNIT_DEGREES_F, UNIT_DEGREES_C, old_state
                    )
                delta = float(self._temperature) - float(old_state)
            if delta != 0:
                # time diff in seconds between old_state_obj and new_state_obj
                # calculate increase / decrease per second
                # take diff between current temp and target (depends on state setting)
                # estimate how long it's going to take by using increase/decrease per second

                time_diff_seconds = (
                    new_state_obj.last_changed - old_state_obj.last_changed
                ).total_seconds()
                if time_diff_seconds != 0:
                    delta_per_second = delta / time_diff_seconds

                    if self._temperature > self._preset[PRESET_TARGET_TEMPERATURE]:
                        self._time_to_target = (
                            self._temperature - self._preset[PRESET_TARGET_TEMPERATURE]
                        ) / delta_per_second
                    elif self._temperature < self._preset[PRESET_TARGET_TEMPERATURE]:
                        self._time_to_target = (
                            self._preset[PRESET_TARGET_TEMPERATURE] - self._temperature
                        ) / delta_per_second
                    else:
                        self._time_to_target = 0
                    if self._time_to_target < 0:
                        self._time_to_target = None
                    else:
                        # format to hh:mm:ss
                        td = str(timedelta(seconds=self._time_to_target))
                        x = td.split(":")
                        self._time_to_target = f"{x[0]}:{x[1]}:{x[2].split(".")[0]}"

            self.async_schedule_update_ha_state()

    def get_lower_bound(self):
        if self._lower_bound:
            return self._lower_bound
        return self._preset[PRESET_TARGET_TEMPERATURE]

    def get_upper_bound(self):
        if self._upper_bound:
            return self._upper_bound
        return self._preset[PRESET_TARGET_TEMPERATURE]

    @callback
    def async_update_sensor_entity(self, id=None):
        """Update each probe as Sensor entity."""
        if self._id == id and self.hass and self.hass.data:
            # get the new values from store and update sensor state
            probe = self.hass.data[DOMAIN][COORDINATOR].store.async_get_probe(id)
            self._name = probe[PROBE_NAME]
            self._lower_bound = probe[PROBE_LOWER_BOUND]
            self._upper_bound = probe[PROBE_UPPER_BOUND]
            self._state_update_setting = self._hass.data[DOMAIN][
                COORDINATOR
            ].store.async_get_state_update_setting(probe[PROBE_STATE_UPDATE_SETTING])
            self._source = probe[PROBE_SOURCE]
            self._preset = self._preset = self._hass.data[DOMAIN][
                COORDINATOR
            ].store.async_get_preset(probe[PROBE_PRESET])
            if self._preset is not None:
                if self._lower_bound is None:
                    self._lower_bound = self._preset[PRESET_TARGET_TEMPERATURE]
                if self._upper_bound is None:
                    self._upper_bound = self._preset[PRESET_TARGET_TEMPERATURE]

            self.async_watch_sensor_states()
            self.async_schedule_update_ha_state()

    @property
    def device_info(self) -> dict:
        """Return info for device registry."""
        return {
            "identifiers": {(DOMAIN, self.hass.data[DOMAIN][COORDINATOR].id)},
            "name": NAME,
            "model": NAME,
            "sw_version": VERSION,
            "manufacturer": MANUFACTURER,
        }

    @property
    def unique_id(self):
        """Return a unique ID to use for this entity."""

        return f"{self.entity_id}"

    @property
    def icon(self):
        """Return icon."""
        return SENSOR_ICON

    @property
    def name(self):
        """Return the friendly name to use for this entity."""
        return self._name

    @property
    def should_poll(self) -> bool:
        """Return the polling state."""
        return False

    @property
    def state(self):
        """Return the state of the device."""
        # temperature is stored in C, so localize it before displaying
        return get_localized_temperature(self._temperature, self._system_is_metric)

    @property
    def device_class(self):
        return SensorDeviceClass.DURATION

    @property
    def native_unit_of_measurement(self):
        return get_localized_temperature_unit(self._system_is_metric)

    @property
    def native_value(self):
        return self._temperature

    @property
    def suggested_display_precision(self):
        return 1

    @property
    def suggested_unit_of_measurement(self):
        return get_localized_temperature_unit(self._system_is_metric)

    @property
    def extra_state_attributes(self):
        """Return the data of the entity."""

        localized_temperature_unit = get_localized_temperature_unit(
            self._system_is_metric
        )
        if self._preset is not None:
            preset_attribute = f"{self._preset[PRESET_NAME]} ({get_localized_temperature(self._preset[PRESET_TARGET_TEMPERATURE], self._system_is_metric)} {localized_temperature_unit})"
        else:
            preset_attribute = None
        if self._state_update_setting is not None:
            sus_attribute = f"{self._state_update_setting[STATE_UPDATE_SETTING_NAME]}"
        else:
            sus_attribute = None
        return {
            "id": self._id,
            "source": self._source,
            "preset": preset_attribute,
            "status": self._status,
            "lower bound": f"{get_localized_temperature(self._lower_bound,self._system_is_metric)} {localized_temperature_unit}",
            "upper bound": f"{get_localized_temperature(self._upper_bound,self._system_is_metric)} {localized_temperature_unit}",
            "state update setting": f"{sus_attribute}",
            "time to target": self._time_to_target,
        }

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        _LOGGER.debug("{} is added to hass".format(self.entity_id))
        await super().async_added_to_hass()

        await self.async_get_last_state()

    async def async_will_remove_from_hass(self):
        await super().async_will_remove_from_hass()
        _LOGGER.debug("{} is removed from hass".format(self.entity_id))

    def __dell__(self):
        if self._state_listener:
            self._state_listener()
            self._state_listener = None
