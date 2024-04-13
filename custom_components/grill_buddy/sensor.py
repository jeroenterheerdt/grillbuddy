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

from .const import (
    DOMAIN,
    PROBE_ID,
    PROBE_NAME,
    PROBES,
    NAME,
    VERSION,
    MANUFACTURER,
    SENSOR_ICON,
    COORDINATOR,
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
    ) -> None:
        """Initialize the sensor entity."""
        self._hass = hass
        self.entity_id = generate_entity_id(
            entity_id_format="sensor.{}", name=entity_id.split(".")[1], hass=hass
        )
        self._id = id
        self._name = name
        async_dispatcher_connect(
            hass, DOMAIN + "_config_updated", self.async_update_sensor_entity
        )

    @callback
    def async_update_sensor_entity(self, id=None):
        """Update each zone as Sensor entity."""
        if self._id == id and self.hass and self.hass.data:
            # get the new values from store and update sensor state
            zone = self.hass.data[DOMAIN]["coordinator"].store.async_get_zone(id)
            self._name = zone["name"]
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
        return self._temperature

    @property
    def device_class(self):
        return SensorDeviceClass.DURATION

    @property
    def native_unit_of_measurement(self):
        return "?"

    @property
    def native_value(self):
        return self._temperature

    @property
    def suggested_display_precision(self):
        return 0

    @property
    def suggested_unit_of_measurement(self):
        return "s"

    @property
    def extra_state_attributes(self):
        """Return the data of the entity."""

        return {
            "id": self._id,
        }

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        _LOGGER.debug("{} is added to hass".format(self.entity_id))
        await super().async_added_to_hass()

        await self.async_get_last_state()

    async def async_will_remove_from_hass(self):
        await super().async_will_remove_from_hass()
        _LOGGER.debug("{} is removed from hass".format(self.entity_id))
