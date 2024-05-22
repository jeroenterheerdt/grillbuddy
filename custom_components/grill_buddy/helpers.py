from config.custom_components.grill_buddy.const import (
    K_TO_C_FACTOR,
    PROBE_LOWER_BOUND,
    PROBE_TARGET_TEMPERATURE,
    PROBE_UPPER_BOUND,
    UNIT_DEGREES_C,
    UNIT_DEGREES_F,
    UNIT_DEGREES_K,
)
from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN


def convert_temperatures(from_unit, to_unit, val):
    if to_unit == from_unit:
        return val
    if val is None:
        return None
    if to_unit == UNIT_DEGREES_C:
        if from_unit == UNIT_DEGREES_F:
            return float((float(val) - 32.0) / 1.8)
        elif from_unit == UNIT_DEGREES_K:
            return val - K_TO_C_FACTOR
    elif to_unit == UNIT_DEGREES_F:
        if from_unit == UNIT_DEGREES_C:
            return float((val * 1.8) + 32.0)
        elif from_unit == UNIT_DEGREES_K:
            return float(1.8 * (val - 273) + 32)
    elif to_unit == UNIT_DEGREES_K:
        if from_unit == UNIT_DEGREES_F:
            return (val + 459.67) * (5.0 / 9.0)
        elif from_unit == UNIT_DEGREES_C:
            return val + K_TO_C_FACTOR
    # unable to do conversion because of unexpected to or from unit
    return None


def switch_probe_temperatures_to_C(data, system_is_metric):
    if system_is_metric:
        # values should already be in C
        return data
    # convert to F to C
    if PROBE_UPPER_BOUND in data:
        data[PROBE_UPPER_BOUND] = convert_temperatures(
            UNIT_DEGREES_F, UNIT_DEGREES_C, data[PROBE_UPPER_BOUND]
        )
    if PROBE_LOWER_BOUND in data:
        data[PROBE_LOWER_BOUND] = convert_temperatures(
            UNIT_DEGREES_F, UNIT_DEGREES_C, data[PROBE_LOWER_BOUND]
        )
    if PROBE_TARGET_TEMPERATURE in data:
        data[PROBE_TARGET_TEMPERATURE] = convert_temperatures(
            UNIT_DEGREES_F, UNIT_DEGREES_C, data[PROBE_TARGET_TEMPERATURE]
        )
    return data


def get_localized_temperature(val, system_is_metric):
    """Converts val in C to F if necessary."""
    if system_is_metric or not is_number(val):
        return val
    return round(convert_temperatures(UNIT_DEGREES_C, UNIT_DEGREES_F, val), 1)


def get_localized_temperature_unit(system_is_metric):
    if system_is_metric:
        return "°C"
    return "°F"


def is_number(s):
    if s:
        try:
            float(s)
            return True
        except ValueError:
            return False
    return False


def parse_sensor_state(state):
    if not state:
        return STATE_UNKNOWN
    if is_number(state.state):
        return state.state
    if not state or not state.state or state.state == STATE_UNAVAILABLE:
        return STATE_UNAVAILABLE
    return STATE_UNKNOWN
