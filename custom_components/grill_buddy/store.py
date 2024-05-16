import logging
import attr
from collections import OrderedDict
from typing import MutableMapping, cast
from homeassistant.loader import bind_hass
from homeassistant.core import callback, HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util.unit_system import METRIC_SYSTEM

from .const import (
    CONF_IMPERIAL,
    CONF_METRIC,
    CONF_UNITS,
    DOMAIN,
    PRESET_DONENESS,
    PRESET_DONENESS_ENUM,
    PRESET_ID,
    PRESET_NAME,
    PRESET_PROTEIN,
    PRESET_PROTEIN_ENUM,
    PRESET_TARGET_TEMPERATURE,
    PROBE_LOWER_BOUND,
    PROBE_LOWER_BOUND_DEFAULT,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_STATE_UPDATE_SETTING_DEFAULT,
    PROBE_TEMPERATURE,
    PRESETS,
    PROBE_UPPER_BOUND,
    PROBE_UPPER_BOUND_DEFAULT,
    PROBES,
    PROBE_ID,
    PROBE_NAME,
    PROBE_SOURCE,
    PROBE_PRESET,
    STATE_UPDATE_SETTING_ID,
    STATE_UPDATE_SETTING_NAME,
    STATE_UPDATE_SETTINGS,
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

    probe_id = attr.ib(type=int, default=None)
    probe_name = attr.ib(type=str, default=None)
    probe_source = attr.ib(type=str, default=None)
    probe_preset = attr.ib(type=int, default=None)
    probe_temperature = attr.ib(type=float, default=None)
    probe_upper_bound = attr.ib(type=float, default=PROBE_UPPER_BOUND_DEFAULT)
    probe_lower_bound = attr.ib(type=float, default=PROBE_LOWER_BOUND_DEFAULT)
    probe_state_update_setting = attr.ib(
        type=int, default=PROBE_STATE_UPDATE_SETTING_DEFAULT
    )


@attr.s(slots=True, frozen=True)
class PresetEntry:
    """Preset storage Entry."""

    preset_id = attr.ib(type=int, default=None)
    preset_name = attr.ib(type=str, default=None)
    preset_protein = attr.ib(type=str, default=None)
    preset_doneness = attr.ib(type=str, default=None)
    preset_target_temperature = attr.ib(type=float, default=None)


@attr.s(slots=True, frozen=True)
class StateUpdateSettingEntry:
    """StateUpdateSettingEntry storage Entry."""

    stateupdatesetting_id = attr.ib(type=int, default=None)
    stateupdatesetting_name = attr.ib(type=str, default=None)


@attr.s(slots=True, frozen=True)
class Config:
    """(General) Config storage Entry."""

    units = attr.ib(type=str, default=None)


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
        self.presets: MutableMapping[PresetEntry] = {}
        self.stateupdatesettings: MutableMapping[StateUpdateSettingEntry] = {}
        self._store = MigratableStore(hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_load(self) -> None:
        """Load the registry."""
        data = await self._store.async_load()
        config: Config = Config(
            units=CONF_METRIC
            if self.hass.config.units is METRIC_SYSTEM
            else CONF_IMPERIAL
        )
        probes: "OrderedDict[str, ProbeEntry]" = OrderedDict()
        presets: "OrderedDict[str, PresetEntry]" = OrderedDict()
        stateupdatesettings: "OrderedDict[str, StateUpdateSettingEntry]" = OrderedDict()
        if data is not None:
            config = Config(
                units=data["config"].get(
                    CONF_UNITS,
                    CONF_METRIC
                    if self.hass.config.units is METRIC_SYSTEM
                    else CONF_IMPERIAL,
                )
            )
            if PROBES in data:
                for probe in data[PROBES]:
                    probes[probe[PROBE_ID]] = ProbeEntry(
                        probe_id=probe[PROBE_ID],
                        probe_name=probe[PROBE_NAME],
                        probe_source=probe[PROBE_SOURCE],
                        probe_preset=probe[PROBE_PRESET],
                        probe_temperature=probe[PROBE_TEMPERATURE],
                        probe_upper_bound=probe.get(
                            PROBE_UPPER_BOUND, PROBE_UPPER_BOUND_DEFAULT
                        ),
                        probe_lower_bound=probe.get(
                            PROBE_LOWER_BOUND, PROBE_LOWER_BOUND_DEFAULT
                        ),
                        probe_state_update_setting=probe.get(
                            PROBE_STATE_UPDATE_SETTING,
                            PROBE_STATE_UPDATE_SETTING_DEFAULT,
                        ),
                    )
            if PRESETS in data:
                for preset in data[PRESETS]:
                    presets[preset[PRESET_ID]] = PresetEntry(
                        preset_id=preset[PRESET_ID],
                        preset_name=preset[PRESET_NAME],
                        preset_protein=preset[PRESET_PROTEIN],
                        preset_doneness=preset[PRESET_DONENESS],
                        preset_target_temperature=preset[PRESET_TARGET_TEMPERATURE],
                    )
            if STATE_UPDATE_SETTINGS in data:
                for sus in data[STATE_UPDATE_SETTINGS]:
                    stateupdatesettings[
                        sus[STATE_UPDATE_SETTING_ID]
                    ] = StateUpdateSettingEntry(
                        stateupdatesetting_id=sus[STATE_UPDATE_SETTING_ID],
                        stateupdatesetting_name=sus[STATE_UPDATE_SETTING_NAME],
                    )

        self.config = config
        self.probes = probes
        self.presets = presets
        self.stateupdatesettings = stateupdatesettings

        # not needed? should trigger from init?
        # await self.set_up_factory_defaults()

    async def set_up_factory_defaults(self):
        if not self.probes:
            await self.async_factory_default_probes()
        if not self.presets:
            await self.async_factory_default_presets()
        if not self.stateupdatesettings:
            await self.async_factory_default_stateupdatesettings()
        self.async_schedule_save()

    async def async_factory_default_probes(self):
        return

    """ Default presets:
    Beef
    rare  125F
    medium rare 140F
    medium  150F
    medium well 160F
    well done 170F
    Fish  145 F
    Ground Beef 160F
    Ground Poultry  165F
    Lamb
    rare 140F
    medium rare 145F
    medium 160F
    medium well 165F
    well done 170F
    Pork
    medium  160F
    medium well 165F
    well done 170F
    Poultry 165F
    Turkey 165F
    Veal
    rare  125F
    medium rare 140F
    medium  150F
    medium well 160F
    well done 165F
    """

    async def async_factory_default_stateupdatesettings(self):
        self.stateupdatesettings[0] = StateUpdateSettingEntry(
            **{
                STATE_UPDATE_SETTING_ID: 0,
                STATE_UPDATE_SETTING_NAME: localize(
                    "state_update_settings.target_temperature_reached",
                    self.hass.config.language,
                ),
            }
        )
        self.stateupdatesettings[1] = StateUpdateSettingEntry(
            **{
                STATE_UPDATE_SETTING_ID: 1,
                STATE_UPDATE_SETTING_NAME: localize(
                    "state_update_settings.within_bounds",
                    self.hass.config.language,
                ),
            }
        )
        self.stateupdatesettings[2] = StateUpdateSettingEntry(
            **{
                STATE_UPDATE_SETTING_ID: 2,
                STATE_UPDATE_SETTING_NAME: localize(
                    "state_update_settings.outside_bounds",
                    self.hass.config.language,
                ),
            }
        )
        self.stateupdatesettings[3] = StateUpdateSettingEntry(
            **{
                STATE_UPDATE_SETTING_ID: 3,
                STATE_UPDATE_SETTING_NAME: localize(
                    "state_update_settings.below_lower_bound",
                    self.hass.config.language,
                ),
            }
        )
        self.stateupdatesettings[4] = StateUpdateSettingEntry(
            **{
                STATE_UPDATE_SETTING_ID: 4,
                STATE_UPDATE_SETTING_NAME: localize(
                    "state_update_settings.above_upper_bound",
                    self.hass.config.language,
                ),
            }
        )

    async def async_factory_default_presets(self):
        # Beef
        self.presets[0] = PresetEntry(
            **{
                PRESET_ID: 0,
                PRESET_NAME: localize(
                    "defaults.presets.beef_rare", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.BEEF,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.RARE,
                PRESET_TARGET_TEMPERATURE: 52,
            }
        )
        self.presets[1] = PresetEntry(
            **{
                PRESET_ID: 1,
                PRESET_NAME: localize(
                    "defaults.presets.beef_medium_rare",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.BEEF,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMRARE,
                PRESET_TARGET_TEMPERATURE: 60,
            }
        )
        self.presets[2] = PresetEntry(
            **{
                PRESET_ID: 2,
                PRESET_NAME: localize(
                    "defaults.presets.beef_medium", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.BEEF,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUM,
                PRESET_TARGET_TEMPERATURE: 66,
            }
        )
        self.presets[3] = PresetEntry(
            **{
                PRESET_ID: 3,
                PRESET_NAME: localize(
                    "defaults.presets.beef_medium_well",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.BEEF,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMWELL,
                PRESET_TARGET_TEMPERATURE: 71,
            }
        )
        self.presets[4] = PresetEntry(
            **{
                PRESET_ID: 4,
                PRESET_NAME: localize(
                    "defaults.presets.beef_well_done", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.BEEF,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.WELLDONE,
                PRESET_TARGET_TEMPERATURE: 77,
            }
        )
        self.presets[5] = PresetEntry(
            **{
                PRESET_ID: 5,
                PRESET_NAME: localize(
                    "defaults.presets.fish", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.FISH,
                PRESET_TARGET_TEMPERATURE: 63,
            }
        )
        self.presets[6] = PresetEntry(
            **{
                PRESET_ID: 6,
                PRESET_NAME: localize(
                    "defaults.presets.ground_beef", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.GROUNDBEEF,
                PRESET_TARGET_TEMPERATURE: 71,
            }
        )
        self.presets[7] = PresetEntry(
            **{
                PRESET_ID: 7,
                PRESET_NAME: localize(
                    "defaults.presets.ground_poultry", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.GROUNDPOULTRY,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )
        self.presets[8] = PresetEntry(
            **{
                PRESET_ID: 8,
                PRESET_NAME: localize(
                    "defaults.presets.lamb_rare", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.LAMB,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.RARE,
                PRESET_TARGET_TEMPERATURE: 60,
            }
        )
        self.presets[9] = PresetEntry(
            **{
                PRESET_ID: 9,
                PRESET_NAME: localize(
                    "defaults.presets.lamb_medium_rare",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.LAMB,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMRARE,
                PRESET_TARGET_TEMPERATURE: 63,
            }
        )
        self.presets[10] = PresetEntry(
            **{
                PRESET_ID: 10,
                PRESET_NAME: localize(
                    "defaults.presets.lamb_medium", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.LAMB,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUM,
                PRESET_TARGET_TEMPERATURE: 71,
            }
        )
        self.presets[11] = PresetEntry(
            **{
                PRESET_ID: 11,
                PRESET_NAME: localize(
                    "defaults.presets.lamb_medium_well",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.LAMB,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMWELL,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )
        self.presets[12] = PresetEntry(
            **{
                PRESET_ID: 12,
                PRESET_NAME: localize(
                    "defaults.presets.lamb_well_done", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.LAMB,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.WELLDONE,
                PRESET_TARGET_TEMPERATURE: 77,
            }
        )
        self.presets[13] = PresetEntry(
            **{
                PRESET_ID: 13,
                PRESET_NAME: localize(
                    "defaults.presets.pork_medium", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.PORK,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUM,
                PRESET_TARGET_TEMPERATURE: 71,
            }
        )
        self.presets[14] = PresetEntry(
            **{
                PRESET_ID: 14,
                PRESET_NAME: localize(
                    "defaults.presets.pork_medium_well",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.PORK,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMWELL,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )
        self.presets[15] = PresetEntry(
            **{
                PRESET_ID: 15,
                PRESET_NAME: localize(
                    "defaults.presets.pork_well_done", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.PORK,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.WELLDONE,
                PRESET_TARGET_TEMPERATURE: 77,
            }
        )
        self.presets[16] = PresetEntry(
            **{
                PRESET_ID: 16,
                PRESET_NAME: localize(
                    "defaults.presets.poultry", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.POULTRY,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )
        self.presets[17] = PresetEntry(
            **{
                PRESET_ID: 17,
                PRESET_NAME: localize(
                    "defaults.presets.turkey", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.TURKEY,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )
        self.presets[18] = PresetEntry(
            **{
                PRESET_ID: 18,
                PRESET_NAME: localize(
                    "defaults.presets.veal_rare", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.VEAL,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.RARE,
                PRESET_TARGET_TEMPERATURE: 52,
            }
        )
        self.presets[19] = PresetEntry(
            **{
                PRESET_ID: 19,
                PRESET_NAME: localize(
                    "defaults.presets.veal_medium_rare",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.VEAL,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMRARE,
                PRESET_TARGET_TEMPERATURE: 60,
            }
        )
        self.presets[20] = PresetEntry(
            **{
                PRESET_ID: 20,
                PRESET_NAME: localize(
                    "defaults.presets.veal_medium", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.VEAL,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUM,
                PRESET_TARGET_TEMPERATURE: 66,
            }
        )
        self.presets[21] = PresetEntry(
            **{
                PRESET_ID: 21,
                PRESET_NAME: localize(
                    "defaults.presets.veal_medium_well",
                    self.hass.config.language,
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.VEAL,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.MEDIUMWELL,
                PRESET_TARGET_TEMPERATURE: 71,
            }
        )
        self.presets[22] = PresetEntry(
            **{
                PRESET_ID: 22,
                PRESET_NAME: localize(
                    "defaults.presets.veal_well_done", self.hass.config.language
                ),
                PRESET_PROTEIN: PRESET_PROTEIN_ENUM.VEAL,
                PRESET_DONENESS: PRESET_DONENESS_ENUM.WELLDONE,
                PRESET_TARGET_TEMPERATURE: 74,
            }
        )

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
        store_data[PRESETS] = [attr.asdict(entry) for entry in self.presets.values()]

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
        self.probes[int(new_probe.probe_id)] = new_probe
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
        """Update existing probe."""
        probe_id = int(probe_id)
        old = self.probes[probe_id]
        if changes:
            changes.pop("probe_id", None)
            new = self.probes[probe_id] = attr.evolve(old, **changes)
        else:
            new = old
        self.async_schedule_save()
        return attr.asdict(new)

    @callback
    def async_get_preset(self, preset_id: int) -> PresetEntry:
        """Get an existing PresetEntry by id."""
        if preset_id is not None:
            res = self.presets.get(int(preset_id))
            return attr.asdict(res) if res else None
        else:
            return None

    @callback
    def async_get_presets(self):
        """Get all PresetEntries"""

        res = []
        for key, val in self.presets.items():
            res.append(attr.asdict(val))
        return res

    @callback
    def async_get_state_update_settings(self):
        """Get all StateUpdateSettingsEntries"""

        res = []
        for key, val in self.stateupdatesettings.items():
            res.append(attr.asdict(val))
        return res

    @callback
    def async_get_state_update_setting(self, sus_id: int) -> StateUpdateSettingEntry:
        """Get an existing StateUpdateSetting by id."""
        if sus_id is not None:
            res = self.stateupdatesettings.get(int(sus_id))
            return attr.asdict(res) if res else None
        else:
            return None

    @callback
    def async_create_preset(self, data: dict) -> PresetEntry:
        """Create a new PresetEntry."""
        new_preset = PresetEntry(**data)
        self.probes[int(new_preset.id)] = new_preset
        self.async_schedule_save()
        return attr.asdict(new_preset)

    @callback
    def async_delete_preset(self, preset_id: int) -> None:
        """Delete PresetEntry."""
        preset_id = int(preset_id)
        if preset_id in self.presets:
            del self.presets[preset_id]
            self.async_schedule_save()
            return True
        return False

    @callback
    def async_update_preset(self, preset_id: int, changes: dict) -> PresetEntry:
        """Update existing zone."""
        preset_id = int(preset_id)
        old = self.presets[preset_id]
        if changes:
            changes.pop("id", None)
            new = self.presets[preset_id] = attr.evolve(old, **changes)
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
