"""Config flow for the Grill Buddy integration."""
import voluptuous as vol
from homeassistant.core import callback
from homeassistant.helpers.selector import selector
from homeassistant import config_entries, exceptions

from .const import NAME, CONF_INSTANCE_NAME, DOMAIN
from .options_flow import GrillBuddyOptionsFlowHandler


class GrilBuddyConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Grill Buddy."""

    CONNECTION_CLASS = config_entries.CONN_CLASS_LOCAL_POLL

    def __init__(self):
        self._errors = {}
        self._name = ""

    async def async_step_user(self, user_input=None):
        """Handle a flow initialized by the user."""

        self._errors = {}
        # Only a single instance of the integration
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            try:
                return self.async_create_entry(title=NAME, data=user_input)
            except NotUnique:
                self._errors["base"] = "name"
        return await self._show_step_user(user_input)

    async def _show_step_user(self, user_input):
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_INSTANCE_NAME, default=NAME): str,
                }
            ),
            errors=self._errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get options flow."""
        return GrillBuddyOptionsFlowHandler(config_entry)

    async def _check_unique(self, thename):
        """Test if the specified name is not already claimed."""
        await self.async_set_unique_id(thename)
        self._abort_if_unique_id_configured()


class NotUnique(exceptions.HomeAssistantError):
    """Error to indicate there is invalid auth."""
