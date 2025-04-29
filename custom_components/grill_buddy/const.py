"""Store constants."""

from enum import Enum

VERSION = "v2024.4.2"
NAME = "Grill Buddy"
MANUFACTURER = "@jeroenterheerdt"

DOMAIN = "grill_buddy"

CUSTOM_COMPONENTS = "custom_components"

LANGUAGE_FILES_DIR = "frontend/localize/languages"
SUPPORTED_LANGUAGES = ["en", "nl", "de"]

# Platforms
SENSOR = "sensor"
PLATFORMS = [SENSOR]

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
SENSOR_DOMAIN = "sensor"
INPUT_NUMBER_DOMAIN = "input_number"

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
PROBE_SOURCE_TYPE = "probe_source_type"
SENSOR_ICON = "mdi:grill"
PRESETS = "presets"
PRESET_ID = "preset_id"
PRESET_NAME = "preset_name"
PRESET_PROTEIN = "preset_protein"
PRESET_DONENESS = "preset_doneness"
PRESET_TARGET_TEMPERATURE = "preset_target_temperature"
PRESET_ICON = "preset_icon"
PROBE_SOURCE_TYPE_PRESET = "source_type_preset"
PROBE_SOURCE_TYPE_VALUE = "source_type_value"
PROBE_TARGET_TEMPERATURE = "probe_target_temperature"

# Defaults
PROBE_UPPER_BOUND_DEFAULT = None
PROBE_LOWER_BOUND_DEFAULT = None
PROBE_STATE_UPDATE_SETTING_DEFAULT = 0

# Probe States
AT_TARGET_TEMPERATURE = "at_target_temperature"
BELOW_TARGET_TEMPERATURE = "below_target_temperature"
ABOVE_TARGET_TEMPERATURE = "above_target_temperature"
WITHIN_BOUNDS = "within_range"
OUTSIDE_BOUNDS = "outside_range"
BELOW_LOWER_BOUND = "below_lower_threshold"
ABOVE_LOWER_BOUND = "above_lower_threshold"
ABOVE_UPPER_BOUND = "above_upper_threshold"
BELOW_UPPER_BOUND = "below_upper_threshold"
GOAL_NOT_REACHED = "goal_not_reached"
GOAL_REACHED = "goal_reached"

# State update settings
STATE_UPDATE_SETTINGS = "stateupdatesettings"
STATE_UPDATE_SETTING_ID = "stateupdatesetting_id"
STATE_UPDATE_SETTING_NAME = "stateupdatesetting_name"

# Sensor attributes
SENSOR_ATTR_ID = "ID"
SENSOR_ATTR_SOURCE = "Source"
SENSOR_ATTR_PRESET = "Preset"
SENSOR_ATTR_TARGET_TEMPERATURE = "Target temperature"
SENSOR_ATTR_STATUS = "Status"
SENSOR_ATTR_GOAL_SPECIFIC_STATUS = "Goal specific status"
SENSOR_ATTR_STATE_UPDATE_SETTING = "Goal"
SENSOR_ATTR_UPPER_BOUND = "Upper threshold"
SENSOR_ATTR_LOWER_BOUND = "Lower threshold"
SENSOR_ATTR_SOURCE_TYPE = "Get target temperature from"
SENSOR_ATTR_TIME_TO_TARGET = "Time to target (s)"

# Conversion factors
K_TO_C_FACTOR = 273.15  # K-factor = C, C+factor=K


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
