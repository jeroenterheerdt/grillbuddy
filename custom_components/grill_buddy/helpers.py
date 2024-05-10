from config.custom_components.grill_buddy.const import (
    PROBE_LOWER_BOUND,
    PROBE_UPPER_BOUND,
)
from homeassistant.const import (
    STATE_UNKNOWN,
    STATE_UNAVAILABLE,
)


def switch_probe_temperatures_to_C(data, system_is_metric):
    if PROBE_UPPER_BOUND in data:
        data[PROBE_UPPER_BOUND] = get_localized_temperature(
            data[PROBE_UPPER_BOUND], system_is_metric
        )
    if PROBE_LOWER_BOUND in data:
        data[PROBE_LOWER_BOUND] = get_localized_temperature(
            data[PROBE_LOWER_BOUND], system_is_metric
        )
    return data


def get_localized_temperature(val, system_is_metric):
    """Converts val in C to F if necessary."""
    if system_is_metric or not is_number(val):
        return val
    else:
        return round(float((val * 1.8) + 32.0), 0)


def get_localized_temperature_unit(system_is_metric):
    if system_is_metric:
        return "°C"
    else:
        return "°F"


def is_number(s):
    if s:
        try:
            float(s)
            return True
        except ValueError:
            return False
    else:
        return False


def parse_sensor_state(state):
    if not state:
        return STATE_UNKNOWN
    elif is_number(state.state):
        return state.state
    else:
        if not state or not state.state:
            return STATE_UNAVAILABLE
        elif state.state == STATE_UNAVAILABLE:
            return STATE_UNAVAILABLE
        else:
            return STATE_UNKNOWN
