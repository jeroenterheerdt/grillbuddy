import logging
import attr
from collections import OrderedDict
from typing import MutableMapping, cast
from homeassistant.loader import bind_hass
from homeassistant.core import callback, HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util.unit_system import METRIC_SYSTEM

from .const import (
    DOMAIN,
    PROBES,
    PROBE_ID,
    PROBE_NAME,
)
from .localize import localize

_LOGGER = logging.getLogger(__name__)

DATA_REGISTRY = f"{DOMAIN}_storage"
STORAGE_KEY = f"{DOMAIN}.storage"
STORAGE_VERSION = 1
SAVE_DELAY = 0


@attr.s(slots=True, frozen=True)
class ProbeEntry:
    """Probe storage Entry."""

    id = attr.ib(type=int, default=None)
    name = attr.ib(type=str, default=None)


class Config:
    """(General) Config storage Entry."""


class MigratableStore(Store):
    async def _async_migrate_func(self, old_version, data: dict):
        return data


class GrillBuddyStorage:
    """Class to hold Grill Buddy configuration data."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the storage."""
        self.hass = hass
        self.config: Config = Config()
        self.probes: MutableMapping[ProbeEntry] = {}
        self._store = MigratableStore(hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_load(self) -> None:
        """Load the registry."""
        data = await self._store.async_load()
        config: Config = Config()
        probes: "OrderedDict[str, ProbeEntry]" = OrderedDict()

        if data is not None:
            config = Config()

            if PROBES in data:
                for probe in data[PROBES]:
                    probes[probe[PROBE_ID]] = ProbeEntry(
                        id=probe[PROBE_ID],
                        name=probe[PROBE_NAME],
                    )

        self.config = config
        self.probes = probes

    async def set_up_factory_defaults(self):
        if not self.probes:
            await self.async_factory_default_probes()

    async def async_factory_default_probes(self):
        return

    @callback
    def async_schedule_save(self) -> None:
        """Schedule saving the registry of Grill Buddy."""
        self._store.async_delay_save(self._data_to_save, SAVE_DELAY)

    async def async_save(self) -> None:
        """Save the registry of Grill Buddy."""
        await self._store.async_save(self._data_to_save())

    @callback
    def _data_to_save(self) -> dict:
        """Return data for the registry for Grill Buddy to store in a file."""
        store_data = {
            "config": attr.asdict(self.config),
        }

        store_data[PROBES] = [attr.asdict(entry) for entry in self.probes.values()]
        return store_data

    async def async_delete(self):
        """Delete config."""
        _LOGGER.warning("Removing Grill Buddy configuration data!")
        await self._store.async_remove()

    @callback
    def async_get_config(self):
        return attr.asdict(self.config)

    @callback
    def async_update_config(self, changes: dict):
        """Update existing config."""

        old = self.config
        changes.pop("id", None)
        new = self.config = attr.evolve(old, **changes)
        self.async_schedule_save()
        return attr.asdict(new)

    @callback
    def async_get_probe(self, probe_id: int) -> ProbeEntry:
        """Get an existing ProbeEntry by id."""
        res = self.probes.get(int(probe_id))
        return attr.asdict(res) if res else None

    @callback
    def async_get_probes(self):
        """Get all ProbeEntries"""

        res = []
        for key, val in self.probes.items():
            res.append(attr.asdict(val))
        return res

    @callback
    def async_create_probe(self, data: dict) -> ProbeEntry:
        """Create a new ProbeEntry."""
        new_probe = ProbeEntry(**data)
        self.probes[int(new_probe.id)] = new_probe
        self.async_schedule_save()
        return attr.asdict(new_probe)

    @callback
    def async_delete_probe(self, probe_id: int) -> None:
        """Delete ProbeEntry."""
        probe_id = int(probe_id)
        if probe_id in self.probes:
            del self.probes[probe_id]
            self.async_schedule_save()
            return True
        return False

    @callback
    def async_update_probe(self, probe_id: int, changes: dict) -> ProbeEntry:
        """Update existing zone."""
        probe_id = int(probe_id)
        old = self.probes[probe_id]
        if changes:
            changes.pop("id", None)
            new = self.probes[probe_id] = attr.evolve(old, **changes)
        else:
            new = old
        self.async_schedule_save()
        return attr.asdict(new)


@bind_hass
async def async_get_registry(hass: HomeAssistant) -> GrillBuddyStorage:
    """Return Grill Buddy storage instance."""
    task = hass.data.get(DATA_REGISTRY)

    if task is None:

        async def _load_reg() -> GrillBuddyStorage:
            registry = GrillBuddyStorage(hass)
            await registry.async_load()
            return registry

        task = hass.data[DATA_REGISTRY] = hass.async_create_task(_load_reg())

    return cast(GrillBuddyStorage, await task)
