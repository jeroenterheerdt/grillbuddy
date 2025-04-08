from datetime import timedelta
import logging

from homeassistant.components.sensor import DOMAIN as PLATFORM, SensorEntity
from homeassistant.components.sensor.const import SensorDeviceClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN, UnitOfTemperature
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
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
    GOAL_NOT_REACHED,
    GOAL_REACHED,
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
    PROBE_SOURCE_TYPE,
    PROBE_SOURCE_TYPE_PRESET,
    PROBE_SOURCE_TYPE_VALUE,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_TARGET_TEMPERATURE,
    PROBE_TEMPERATURE,
    PROBE_UPPER_BOUND,
    PROBES,
    SENSOR_ATTR_ID,
    SENSOR_ATTR_SOURCE,
    SENSOR_ATTR_STATE_UPDATE_SETTING,
    SENSOR_ATTR_LOWER_BOUND,
    SENSOR_ATTR_TIME_TO_TARGET,
    SENSOR_ATTR_TARGET_TEMPERATURE,
    SENSOR_ATTR_GOAL_SPECIFIC_STATUS,
    SENSOR_ATTR_PRESET,
    SENSOR_ATTR_STATUS,
    SENSOR_ATTR_UPPER_BOUND,
    SENSOR_ICON,
    STATE_UPDATE_SETTING_ID,
    STATE_UPDATE_SETTING_NAME,
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
            source_type=config[PROBE_SOURCE_TYPE],
            preset=config[PROBE_PRESET],
            target_temperature=config[PROBE_TARGET_TEMPERATURE],
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
        source_type: int,
        preset: float,
        target_temperature: float,
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
        self._target_temperature = target_temperature
        self._temperature = temperature
        self._system_is_metric = hass.config.units is METRIC_SYSTEM
        self._goal_specific_status = None
        self._status = None
        self._lower_bound = lower_bound
        self._upper_bound = upper_bound
        self._source_type = source_type
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
                    UnitOfTemperature.FAHRENHEIT,
                    UnitOfTemperature.CELSIUS,
                    self._temperature,
                )
            target_temperature = None
            if self._source_type == PROBE_SOURCE_TYPE_VALUE:
                target_temperature = self._target_temperature
            elif (
                self._source_type == PROBE_SOURCE_TYPE_PRESET
                and self._preset is not None
            ):
                target_temperature = self._preset[PRESET_TARGET_TEMPERATURE]
            self._status = GOAL_NOT_REACHED
            if is_number(self._temperature) and is_number(target_temperature):
                # handle state update settings here
                if (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 0
                ):  # at target temperature
                    if self._temperature < target_temperature:
                        self._goal_specific_status = BELOW_TARGET_TEMPERATURE
                    elif self._temperature > target_temperature:
                        self._goal_specific_status = ABOVE_TARGET_TEMPERATURE
                    else:
                        self._goal_specific_status = AT_TARGET_TEMPERATURE
                        self._status = GOAL_REACHED
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 1
                ):  # within bounds
                    if (
                        self._temperature >= self.get_lower_bound()
                        and self._temperature <= self.get_upper_bound()
                    ):
                        self._goal_specific_status = WITHIN_BOUNDS
                        self._status = GOAL_REACHED
                    else:
                        self._goal_specific_status = OUTSIDE_BOUNDS
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 2
                ):  # below_lower_bound
                    if self._temperature < self.get_lower_bound():
                        self._goal_specific_status = BELOW_LOWER_BOUND
                        self._status = GOAL_REACHED
                    else:
                        self._goal_specific_status = ABOVE_LOWER_BOUND
                elif (
                    self._state_update_setting[STATE_UPDATE_SETTING_ID] == 3
                ):  # above_upper_bound
                    if self._temperature > self.get_upper_bound():
                        self._goal_specific_status = ABOVE_UPPER_BOUND
                        self._status = GOAL_REACHED
                    else:
                        self._goal_specific_status = BELOW_UPPER_BOUND

            # add prediction

            if (
                not is_number(old_state)
                or not is_number(self._temperature)
                or not is_number(target_temperature)
            ):
                delta = 0
            else:
                if not self._system_is_metric:
                    old_state = convert_temperatures(
                        UnitOfTemperature.FAHRENHEIT,
                        UnitOfTemperature.CELSIUS,
                        old_state,
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

                    if self._temperature > target_temperature:
                        self._time_to_target = (
                            self._temperature - target_temperature
                        ) / delta_per_second
                    elif self._temperature < target_temperature:
                        self._time_to_target = (
                            target_temperature - self._temperature
                        ) / delta_per_second
                    else:
                        self._time_to_target = 0
                    if self._time_to_target < 0:
                        self._time_to_target = None
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
            self._source_type = probe[PROBE_SOURCE_TYPE]
            self._preset = self._preset = self._hass.data[DOMAIN][
                COORDINATOR
            ].store.async_get_preset(probe[PROBE_PRESET])
            if self._preset is not None:
                if self._lower_bound is None:
                    self._lower_bound = self._preset[PRESET_TARGET_TEMPERATURE]
                if self._upper_bound is None:
                    self._upper_bound = self._preset[PRESET_TARGET_TEMPERATURE]
            self._target_temperature = probe[PROBE_TARGET_TEMPERATURE]
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
        return SensorDeviceClass.TEMPERATURE

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
        if (
            self._source_type == PROBE_SOURCE_TYPE_VALUE
            and self._target_temperature is not None
        ):
            target_temperature_attribute = f"{get_localized_temperature(self._target_temperature, self._system_is_metric)} {localized_temperature_unit}"
        else:
            target_temperature_attribute = None
        if self._source_type == PROBE_SOURCE_TYPE_PRESET and self._preset is not None:
            target_temperature_attribute = f"{get_localized_temperature(self._preset[PRESET_TARGET_TEMPERATURE], self._system_is_metric)} {localized_temperature_unit}"
            preset_attribute = (
                f"{self._preset[PRESET_NAME]} ({target_temperature_attribute})"
            )
        else:
            preset_attribute = None
        if self._state_update_setting is not None:
            sus_attribute = f"{self._state_update_setting[STATE_UPDATE_SETTING_NAME]}"
        else:
            sus_attribute = None
        return {
            SENSOR_ATTR_ID: self._id,
            SENSOR_ATTR_SOURCE: self._source,
            SENSOR_ATTR_PRESET: preset_attribute,
            SENSOR_ATTR_TARGET_TEMPERATURE: target_temperature_attribute,
            SENSOR_ATTR_STATUS: self._status,
            SENSOR_ATTR_GOAL_SPECIFIC_STATUS: self._goal_specific_status,
            SENSOR_ATTR_LOWER_BOUND: f"{get_localized_temperature(self._lower_bound,self._system_is_metric)} {localized_temperature_unit}",
            SENSOR_ATTR_UPPER_BOUND: f"{get_localized_temperature(self._upper_bound,self._system_is_metric)} {localized_temperature_unit}",
            SENSOR_ATTR_STATE_UPDATE_SETTING: f"{sus_attribute}",
            SENSOR_ATTR_TIME_TO_TARGET: self._time_to_target,
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
