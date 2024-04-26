import datetime
import voluptuous as vol
import logging

from homeassistant.components import websocket_api
from homeassistant.core import callback
from homeassistant.components.http.data_validator import RequestDataValidator
from homeassistant.helpers import config_validation as cv
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.websocket_api import decorators, async_register_command

from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)

from .const import (
    DOMAIN,
    PROBE_SOURCE,
    PROBES,
    PROBE_ID,
    PROBE_NAME,
    PROBE_PRESET,
    PROBE_TEMPERATURE,
    PRESETS,
)

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
    connection.send_result(msg["id"], probes)


@callback
def websocket_get_presets(hass, connection, msg):
    """Publish preset data."""
    coordinator = hass.data[DOMAIN]["coordinator"]
    presets = coordinator.store.async_get_presets()
    connection.send_result(msg["id"], presets)


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
