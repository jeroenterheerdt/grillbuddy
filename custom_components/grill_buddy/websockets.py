import datetime
import logging

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.http.data_validator import RequestDataValidator
from homeassistant.components.websocket_api import async_register_command, decorators
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv, entity as Entity
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)

from .const import (
    ATTR_REMOVE,
    DOMAIN,
    INPUT_NUMBER_DOMAIN,
    PRESETS,
    PROBE_ID,
    PROBE_LOWER_BOUND,
    PROBE_NAME,
    PROBE_PRESET,
    PROBE_SOURCE,
    PROBE_SOURCE_TYPE,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_TARGET_TEMPERATURE,
    PROBE_TEMPERATURE,
    PROBE_UPPER_BOUND,
    PROBES,
    SENSOR_DOMAIN,
    STATE_UPDATE_SETTINGS,
)
from .helpers import get_localized_temperature

_LOGGER = logging.getLogger(__name__)


@callback
@decorators.websocket_command(
    {
        vol.Required("type"): DOMAIN + "_config_updated",
    }
)
@decorators.async_response
async def handle_subscribe_updates(hass, connection, msg):
    """Handle subscribe updates."""

    @callback
    def async_handle_event():
        """Forward events to websocket."""
        connection.send_message(
            {
                "id": msg["id"],
                "type": "event",
            }
        )

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, DOMAIN + "_update_frontend", async_handle_event
    )
    connection.send_result(msg["id"])


class GrillBuddyConfigView(HomeAssistantView):
    url = "/api/" + DOMAIN + "/config"
    name = "api:" + DOMAIN + ":config"

    @RequestDataValidator(vol.Schema({}))
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]["coordinator"]
        await coordinator.async_update_config(data)
        async_dispatcher_send(hass, DOMAIN + "_update_frontend")
        return self.json({"success": True})


class GrillBuddyProbeView(HomeAssistantView):
    url = "/api/" + DOMAIN + "/" + PROBES
    name = "api:" + DOMAIN + ":" + PROBES

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional(PROBE_ID): vol.Coerce(int),
                vol.Optional(PROBE_NAME): cv.string,
                vol.Optional(PROBE_SOURCE): cv.string,
                vol.Optional(PROBE_PRESET): vol.Or(int, None),
                vol.Optional(PROBE_TEMPERATURE): vol.Or(int, float, None),
                vol.Optional(PROBE_LOWER_BOUND): vol.Or(int, float, None),
                vol.Optional(PROBE_UPPER_BOUND): vol.Or(int, float, None),
                vol.Optional(PROBE_STATE_UPDATE_SETTING): vol.Or(int, None),
                vol.Optional(PROBE_SOURCE_TYPE): vol.Or(cv.string, None),
                vol.Optional(PROBE_TARGET_TEMPERATURE): vol.Or(int, float, None),
                vol.Optional(ATTR_REMOVE): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]["coordinator"]
        if PROBE_ID in data:
            probe = int(data[PROBE_ID])
        else:
            probe = None
        # drop probe_temperature if present
        if PROBE_TEMPERATURE in data:
            del data[PROBE_TEMPERATURE]
        await coordinator.async_update_probe_config(probe, data)
        async_dispatcher_send(hass, DOMAIN + "_update_frontend")
        return self.json({"success": True})


@callback
def websocket_get_config(hass, connection, msg):
    """Publish config data."""
    coordinator = hass.data[DOMAIN]["coordinator"]
    config = coordinator.store.async_get_config()
    connection.send_result(msg["id"], config)


@callback
def websocket_get_probes(hass, connection, msg):
    """Publish probe data."""
    coordinator = hass.data[DOMAIN]["coordinator"]
    probes = coordinator.store.async_get_probes()
    # since this should only be called by the UI
    # make sure to switch to F for temperatures as needed
    # as they are stored in C in the system itself
    if not coordinator._ha_is_metric:
        for p in probes:
            probes[p[PROBE_ID]][PROBE_LOWER_BOUND] = get_localized_temperature(
                p[PROBE_LOWER_BOUND], False
            )
            probes[p[PROBE_ID]][PROBE_UPPER_BOUND] = get_localized_temperature(
                p[PROBE_UPPER_BOUND], False
            )
            probes[p[PROBE_ID]][PROBE_TARGET_TEMPERATURE] = get_localized_temperature(
                p[PROBE_TARGET_TEMPERATURE], False
            )
    connection.send_result(msg["id"], probes)


@callback
def websocket_get_presets(hass, connection, msg):
    """Publish preset data."""
    coordinator = hass.data[DOMAIN]["coordinator"]
    presets = coordinator.store.async_get_presets()
    connection.send_result(msg["id"], presets)


@callback
def websocket_get_state_update_settings(hass, connection, msg):
    """Publish state update settings data."""
    coordinator = hass.data[DOMAIN]["coordinator"]
    sus = coordinator.store.async_get_state_update_settings()
    connection.send_result(msg["id"], sus)


@callback
def websocket_get_sensors_and_input_numbers(hass: HomeAssistant, connection, msg):
    """Publish list of sensors from Home Assistant."""
    entities = []
    for e in hass.data["entity_registry"].entities:
        e = str(e)
        if e.startswith((SENSOR_DOMAIN, INPUT_NUMBER_DOMAIN)):
            entities.append({"name": e})
    entities = sorted(entities, key=lambda d: d["name"])
    connection.send_result(msg["id"], entities)


async def async_register_websockets(hass):
    hass.http.register_view(GrillBuddyConfigView)
    hass.http.register_view(GrillBuddyProbeView)

    async_register_command(hass, handle_subscribe_updates)

    async_register_command(
        hass,
        DOMAIN + "/config",
        websocket_get_config,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): DOMAIN + "/config"}
        ),
    )
    async_register_command(
        hass,
        DOMAIN + "/" + PROBES,
        websocket_get_probes,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): DOMAIN + "/" + PROBES}
        ),
    )
    async_register_command(
        hass,
        DOMAIN + "/" + PRESETS,
        websocket_get_presets,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): DOMAIN + "/" + PRESETS}
        ),
    )
    async_register_command(
        hass,
        DOMAIN + "/" + STATE_UPDATE_SETTINGS,
        websocket_get_state_update_settings,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): DOMAIN + "/" + STATE_UPDATE_SETTINGS}
        ),
    )
    async_register_command(
        hass,
        DOMAIN + "/" + SENSOR_DOMAIN,
        websocket_get_sensors_and_input_numbers,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): DOMAIN + "/" + SENSOR_DOMAIN}
        ),
    )
