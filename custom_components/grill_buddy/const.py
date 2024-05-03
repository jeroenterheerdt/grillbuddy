"""Store constants."""
from enum import Enum

VERSION = "v2024.4.0"
NAME = "Grill Buddy"
MANUFACTURER = "@jeroenterheerdt"

DOMAIN = "grill_buddy"
CUSTOM_COMPONENTS = "custom_components"

LANGUAGE_FILES_DIR = "translations"
SUPPORTED_LANGUAGES = ["en", "nl"]

INTEGRATION_FOLDER = DOMAIN
PANEL_FOLDER = "frontend"
PANEL_NAME = "grill-buddy"
PANEL_FILENAME = "dist/" + PANEL_NAME + ".js"

PANEL_URL = "/api/panel_custom/" + PANEL_NAME
PANEL_TITLE = NAME
PANEL_ICON = "mdi:grill"

# Constants
PROBES = "probes"
COORDINATOR = "coordinator"
PROBE_ID = "probe_id"
PROBE_NAME = "probe_name"
PROBE_SOURCE = "probe_source"
PROBE_PRESET = "probe_preset"
PROBE_TEMPERATURE = "probe_temperature"
SENSOR_ICON = "mdi:grill"
PRESETS = "presets"
PRESET_ID = "preset_id"
PRESET_NAME = "preset_name"
PRESET_PROTEIN = "preset_protein"
PRESET_DONENESS = "preset_doneness"
PRESET_TARGET_TEMPERATURE = "preset_target_temperature"

# Probe States
REACHED_TARGET_TEMPERATURE = "reached_target_temperature"
BELOW_TARGET_TEMPERATURE = "below_target_temperature"


class PRESET_PROTEIN_ENUM(Enum):
    BEEF = "beef"
    FISH = "fish"
    GROUNDBEEF = "groundbeef"
    GROUNDPOULTRY = "groundpoultry"
    LAMB = "lamb"
    PORK = "pork"
    POULTRY = "poultry"
    TURKEY = "turkey"
    VEAL = "veal"


class PRESET_DONENESS_ENUM(Enum):
    RARE = "rare"
    MEDIUMRARE = "mediumrare"
    MEDIUM = "medium"
    MEDIUMWELL = "mediumwell"
    WELLDONE = "welldone"


# Configuration
CONF_INSTANCE_NAME = "name"
# Defaults

# Attributes
ATTR_REMOVE = "remove"
# Services
