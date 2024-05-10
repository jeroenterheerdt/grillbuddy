import datetime
import voluptuous as vol
import logging

from config.custom_components.grill_buddy.helpers import get_localized_temperature
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
    PROBE_LOWER_BOUND,
    PROBE_SOURCE,
    PROBE_STATE_UPDATE_SETTING,
    PROBE_UPPER_BOUND,
    PROBES,
    PROBE_ID,
    PROBE_NAME,
    PROBE_PRESET,
    PROBE_TEMPERATURE,
    PRESETS,
    STATE_UPDATE_SETTINGS,
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
                vol.Optional(PROBE_LOWER_BOUND): vol.Or(int, float, None),
                vol.Optional(PROBE_UPPER_BOUND): vol.Or(int, float, None),
                vol.Optional(PROBE_STATE_UPDATE_SETTING): vol.Or(int, None),
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
