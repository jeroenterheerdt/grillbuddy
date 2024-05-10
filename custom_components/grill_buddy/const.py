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

# Config
CONF_IMPERIAL = "imperial"
CONF_METRIC = "metric"
CONF_UNITS = "units"

# Constants
PROBES = "probes"
COORDINATOR = "coordinator"
PROBE_ID = "probe_id"
PROBE_NAME = "probe_name"
PROBE_SOURCE = "probe_source"
PROBE_PRESET = "probe_preset"
PROBE_TEMPERATURE = "probe_temperature"
PROBE_UPPER_BOUND = "probe_upper_bound"
PROBE_LOWER_BOUND = "probe_lower_bound"
PROBE_STATE_UPDATE_SETTING = "probe_state_update_setting"
SENSOR_ICON = "mdi:grill"
PRESETS = "presets"
PRESET_ID = "preset_id"
PRESET_NAME = "preset_name"
PRESET_PROTEIN = "preset_protein"
PRESET_DONENESS = "preset_doneness"
PRESET_TARGET_TEMPERATURE = "preset_target_temperature"

# Defaults
PROBE_UPPER_BOUND_DEFAULT = 0.0
PROBE_LOWER_BOUND_DEFAULT = 0.0
PROBE_STATE_UPDATE_SETTING_DEFAULT = 0

# Probe States
REACHED_TARGET_TEMPERATURE = "reached_target_temperature"
BELOW_TARGET_TEMPERATURE = "below_target_temperature"

# State update settings
STATE_UPDATE_SETTINGS = "stateupdatesettings"
STATE_UPDATE_SETTING_ID = "stateupdatesetting_id"
STATE_UPDATE_SETTING_NAME = "stateupdatesetting_name"


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
