import logging

from homeassistant.components.sensor.const import SensorDeviceClass

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.entity import generate_entity_id
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType
from homeassistant.helpers.entity_platform import AddEntitiesCallback
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
    PROBE_NAME,
    PROBE_SOURCE,
    PROBE_PRESET,
    PROBE_TEMPERATURE,
    PROBES,
    NAME,
    VERSION,
    MANUFACTURER,
    SENSOR_ICON,
    COORDINATOR,
)
from .localize import localize
from .helpers import (
    get_localized_temperature,
    get_localized_temperature_unit,
    is_number,
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
    ) -> None:
        """Initialize the sensor entity."""
        self._hass = hass
        self.entity_id = generate_entity_id(
            entity_id_format="sensor.{}", name=entity_id.split(".")[1], hass=hass
        )
        self._id = id
        self._name = name
        self._source = source
        self._preset = self._hass.data[DOMAIN][COORDINATOR].store.async_get_preset(
            preset
        )
        self._temperature = temperature
        self._system_is_metric = hass.config.units is METRIC_SYSTEM

        async_dispatcher_connect(
            hass, DOMAIN + "_config_updated", self.async_update_sensor_entity
        )

    @callback
    def async_update_sensor_entity(self, id=None):
        """Update each probe as Sensor entity."""
        if self._id == id and self.hass and self.hass.data:
            # get the new values from store and update sensor state
            probe = self.hass.data[DOMAIN]["coordinator"].store.async_get_probe(id)
            self._name = probe["name"]
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
        return True

    @property
    def state(self):
        """Return the state of the device."""
        self._temperature = self.hass.states.get(self._source).state
        # check if temperature is above target temperature (in the future we should check against the condition set)
        # if so, send notification
        if (
            is_number(self._temperature)
            and is_number(self._preset[PRESET_TARGET_TEMPERATURE])
            and float(self._temperature)
            >= float(self._preset[PRESET_TARGET_TEMPERATURE])
        ):
            # notify but only if this is the first time or if the notification has been dismissed?
            k = 0

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

        return {
            "id": self._id,
            "source": self._source,
            "preset": f"{self._preset[PRESET_NAME]} ({get_localized_temperature(self._preset[PRESET_TARGET_TEMPERATURE], self._system_is_metric)} {get_localized_temperature_unit(self._system_is_metric)})",
        }

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        _LOGGER.debug("{} is added to hass".format(self.entity_id))
        await super().async_added_to_hass()

        await self.async_get_last_state()

    async def async_will_remove_from_hass(self):
        await super().async_will_remove_from_hass()
        _LOGGER.debug("{} is removed from hass".format(self.entity_id))
