import logging

from homeassistant.components.sensor.const import SensorDeviceClass

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import STATE_UNKNOWN, STATE_UNAVAILABLE
from homeassistant.core import HomeAssistant, callback
from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.entity import generate_entity_id
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_state_change
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.util import slugify
from homeassistant.components.sensor import DOMAIN as PLATFORM
from homeassistant.util.unit_system import METRIC_SYSTEM


from .const import (
    DOMAIN,
    PRESET_NAME,
    PRESET_TARGET_TEMPERATURE,
    PROBE_ID,
    PROBE_LOWER_BOUND,
    PROBE_NAME,
    PROBE_SOURCE,
    PROBE_PRESET,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_TEMPERATURE,
    PROBE_UPPER_BOUND,
    PROBES,
    NAME,
    STATE_UPDATE_SETTING_NAME,
    UNIT_DEGREES_C,
    UNIT_DEGREES_F,
    VERSION,
    MANUFACTURER,
    SENSOR_ICON,
    COORDINATOR,
    REACHED_TARGET_TEMPERATURE,
    BELOW_TARGET_TEMPERATURE,
)
from .localize import localize
from .helpers import (
    convert_temperatures,
    get_localized_temperature,
    get_localized_temperature_unit,
    is_number,
    parse_sensor_state,
)

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
        self._state_update_setting = self._hass.data[DOMAIN][
            COORDINATOR
        ].store.async_get_state_update_setting(state_update_setting)
        self._notification_sent = False
        self.async_watch_sensor_states()
        async_dispatcher_connect(
            hass, DOMAIN + "_config_updated", self.async_update_sensor_entity
        )

    def async_watch_sensor_states(self):
        if self._state_listener:
            self._state_listener()
        if self._source:
            self._state_listener = async_track_state_change(
                self._hass, self._source, self.async_sensor_state_changed
            )
        else:
            self._state_listener = None

    @callback
    def async_sensor_state_changed(self, entity, old_state, new_state):
        """Callback fired when a sensor state has changed."""

        old_state = parse_sensor_state(old_state)
        new_state = parse_sensor_state(new_state)
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
            # check if temperature is above target temperature (in the future we should check against the condition set)
            # if enabled, send notification
            if (
                is_number(self._temperature)
                and self._preset
                and is_number(self._preset[PRESET_TARGET_TEMPERATURE])
            ):
                # if _temperature >= target_temp, set status accordingly
                if float(self._temperature) >= float(
                    self._preset[PRESET_TARGET_TEMPERATURE]
                ):
                    # set the status attribute
                    self._status = REACHED_TARGET_TEMPERATURE
                    if not self._notification_sent:
                        # notify but only if this is the first time or if the notification has been dismissed?
                        notify_data = {
                            "message": "msg from code",
                            "title": "title from code",
                        }
                        # await self._hass.services.async_call(
                        #    "notify", "pushbullet", notify_data
                        # )
                        self._notification_sent = True
                else:
                    self._status = BELOW_TARGET_TEMPERATURE
            self.async_schedule_update_ha_state()

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
