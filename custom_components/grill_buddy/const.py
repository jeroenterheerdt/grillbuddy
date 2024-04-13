"""Store constants."""

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
SENSOR_ICON = "mdi:grill"

# Configuration
CONF_INSTANCE_NAME = "name"
# Defaults

# Attributes

# Services
