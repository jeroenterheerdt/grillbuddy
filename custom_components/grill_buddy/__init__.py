"""The Smart Irrigation Integration."""
import logging
from homeassistant.components.sensor import DOMAIN as PLATFORM
from homeassistant.core import (
    callback,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, asyncio
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.util.unit_system import METRIC_SYSTEM

from .const import ATTR_REMOVE, COORDINATOR, PROBES, DOMAIN, NAME, VERSION, MANUFACTURER
from .localize import localize
from .store import async_get_registry
from .panel import (
    async_register_panel,
    async_unregister_panel,
)
from .websockets import async_register_websockets

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Track states and offer events for sensors."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up Grill Buddy from a config entry."""
    session = async_get_clientsession(hass)

    store = await async_get_registry(hass)

    coordinator = GrillBuddyCoordinator(hass, session, entry, store)

    device_registry = dr.async_get(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, coordinator.id)},
        name=NAME,
        model=NAME,
        sw_version=VERSION,
        manufacturer=MANUFACTURER,
    )

    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {}
    hass.data[DOMAIN][COORDINATOR] = coordinator
    hass.data[DOMAIN][PROBES] = {}

    if entry.unique_id is None:
        hass.config_entries.async_update_entry(entry, unique_id=coordinator.id, data={})

    hass.async_create_task(
        hass.config_entries.async_forward_entry_setup(entry, PLATFORM)
    )

    # update listener for options flow
    entry.async_on_unload(entry.add_update_listener(options_update_listener))

    # Register the panel (frontend)
    await async_register_panel(hass)

    # Websocket support
    await async_register_websockets(hass)

    # Register custom services
    register_services(hass)

    # Finish up by setting factory defaults
    await store.set_up_factory_defaults()

    return True


async def options_update_listener(hass, config_entry):
    """Handle options update."""
    await hass.config_entries.async_reload(config_entry.entry_id)


async def async_unload_entry(hass, entry):
    """Unload Grill Buddy config entry."""
    unload_ok = all(
        await asyncio.gather(
            *[hass.config_entries.async_forward_entry_unload(entry, PLATFORM)]
        )
    )
    if not unload_ok:
        return False

    async_unregister_panel(hass)
    coordinator = hass.data[DOMAIN][COORDINATOR]
    await coordinator.async_unload()
    return True


async def async_remove_entry(hass, entry):
    """Remove Grill Budy config entry."""
    async_unregister_panel(hass)
    if DOMAIN in hass.data:
        coordinator = hass.data[DOMAIN][COORDINATOR]
        await coordinator.async_delete_config()
        del hass.data[DOMAIN]


class GrillBuddyCoordinator(DataUpdateCoordinator):
    """Define an object to hold Grill Buddy device."""

    def __init__(self, hass, session, entry, store):
        """Initialize."""
        self.id = entry.unique_id
        self.hass = hass
        self.entry = entry
        self.store = store
        self._subscriptions = []
        # store system of measurement
        self._ha_is_metric = self.hass.config.units is METRIC_SYSTEM

        self._subscriptions.append(
            async_dispatcher_connect(
                hass,
                DOMAIN + "_platform_loaded",
                self.setup_GrillBuddy_entities,
            )
        )

        super().__init__(hass, _LOGGER, name=DOMAIN)

    @callback
    def setup_GrillBuddy_entities(self):
        probes = self.store.async_get_probes()

        for probe in probes:
            async_dispatcher_send(self.hass, DOMAIN + "_register_entity", probe)

    async def async_update_config(self, data):
        self.store.async_update_config(data)
        async_dispatcher_send(self.hass, DOMAIN + "_config_updated")

    async def async_update_probe_config(self, probe_id: int = None, data: dict = {}):
        if not probe_id is None:
            probe_id = int(probe_id)
        if ATTR_REMOVE in data:
            # delete a probe
            res = self.store.async_get_probe(probe_id)
            if not res:
                return
            self.store.async_delete_probe(probe_id)
            await self.async_remove_entity(probe_id)
        else:
            # create a probe
            entry = self.store.async_create_probe(data)
            async_dispatcher_send(self.hass, DOMAIN + "_register_entity", entry)
            self.store.async_get_config()

    async def async_remove_entity(self, probe_id: str):
        entity_registry = self.hass.helpers.entity_registry.async_get(self.hass)
        probe_id = int(probe_id)
        entity = self.hass.data[DOMAIN][PROBES][probe_id]
        entity_registry.async_remove(entity.entity_id)
        self.hass.data[DOMAIN][PROBES].pop(probe_id, None)

    async def async_unload(self):
        """remove all Grill Buddy objects"""

        # remove probe entities
        probes = list(self.hass.data[DOMAIN][PROBES].keys())
        for probe in probes:
            await self.async_remove_entity(probe)

        # remove subscriptions for coordinator
        while len(self._subscriptions):
            self._subscriptions.pop()()

    async def async_delete_config(self):
        """wipe Grill Buddy storage"""
        await self.store.async_delete()


@callback
def register_services(hass):
    """Register services used by Grill Buddy integration."""

    coordinator = hass.data[DOMAIN][COORDINATOR]
