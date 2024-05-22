from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN, UnitOfTemperature

from .const import (
    K_TO_C_FACTOR,
    PROBE_LOWER_BOUND,
    PROBE_TARGET_TEMPERATURE,
    PROBE_UPPER_BOUND,
)


def convert_temperatures(from_unit, to_unit, val):
    if to_unit == from_unit:
        return val
    if val is None:
        return None
    if to_unit == UnitOfTemperature.CELSIUS:
        if from_unit == UnitOfTemperature.FAHRENHEIT:
            return float((float(val) - 32.0) / 1.8)
        elif from_unit == UnitOfTemperature.KELVIN:
            return val - K_TO_C_FACTOR
    elif to_unit == UnitOfTemperature.FAHRENHEIT:
        if from_unit == UnitOfTemperature.CELSIUS:
            return float((val * 1.8) + 32.0)
        elif from_unit == UnitOfTemperature.KELVIN:
            return float(1.8 * (val - 273) + 32)
    elif to_unit == UnitOfTemperature.KELVIN:
        if from_unit == UnitOfTemperature.FAHRENHEIT:
            return (val + 459.67) * (5.0 / 9.0)
        elif from_unit == UnitOfTemperature.CELSIUS:
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
            UnitOfTemperature.FAHRENHEIT,
            UnitOfTemperature.CELSIUS,
            data[PROBE_UPPER_BOUND],
        )
    if PROBE_LOWER_BOUND in data:
        data[PROBE_LOWER_BOUND] = convert_temperatures(
            UnitOfTemperature.FAHRENHEIT,
            UnitOfTemperature.CELSIUS,
            data[PROBE_LOWER_BOUND],
        )
    if PROBE_TARGET_TEMPERATURE in data:
        data[PROBE_TARGET_TEMPERATURE] = convert_temperatures(
            UnitOfTemperature.FAHRENHEIT,
            UnitOfTemperature.CELSIUS,
            data[PROBE_TARGET_TEMPERATURE],
        )
    return data


def get_localized_temperature(val, system_is_metric):
    """Converts val in C to F if necessary."""
    if system_is_metric or not is_number(val):
        return val
    return round(
        convert_temperatures(
            UnitOfTemperature.CELSIUS, UnitOfTemperature.FAHRENHEIT, val
        ),
        1,
    )


def get_localized_temperature_unit(system_is_metric):
    if system_is_metric:
        return UnitOfTemperature.CELSIUS
    return UnitOfTemperature.FAHRENHEIT


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
