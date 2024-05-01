def get_localized_temperature(val, system_is_metric):
    """Converts val in C to F if necessary."""
    if not system_is_metric:
        return val
    else:
        round(float((val * 1.8) + 32.0), 0)


def get_localized_temperature_unit(system_is_metric):
    if system_is_metric:
        return "°C"
    else:
        return "°F"
