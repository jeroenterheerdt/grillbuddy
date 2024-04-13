from homeassistant.helpers.selector import selector
import voluptuous as vol
from homeassistant import config_entries
from .const import CONF_INSTANCE_NAME, NAME


class GrillBuddyOptionsFlowHandler(config_entries.OptionsFlow):
    """Grill Buddy config flow options handler."""

    def __init__(self, config_entry):
        """Initialize HACS options flow."""
        self.config_entry = config_entry
        self.options = dict(config_entry.options)
        self._errors = {}

    async def async_step_init(self, user_input=None):  # pylint: disable=unused-argument
        """Manage the options."""
        self._errors = {}
        # set default values based on config
        if user_input is not None:
            # validation
            return self.async_create_entry(title="", data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_INSTANCE_NAME, default=NAME): str,
                }
            ),
            errors=self._errors,
        )
