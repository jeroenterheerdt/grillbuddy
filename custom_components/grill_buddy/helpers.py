def get_localized_temperature(val, system_is_metric):
    """Converts val in C to F if necessary."""
    if system_is_metric or not is_number(val):
        return val
    else:
        round(float((val * 1.8) + 32.0), 0)


def get_localized_temperature_unit(system_is_metric):
    if system_is_metric:
        return "°C"
    else:
        return "°F"


def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False
