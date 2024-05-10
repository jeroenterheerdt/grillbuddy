import { HomeAssistant } from "custom-card-helpers";
import { Config, Probe, Preset } from "../types";
import { DOMAIN } from "../const";

export const fetchConfig = (hass: HomeAssistant): Promise<Config> =>
  hass.callWS({
    type: DOMAIN + "/config",
  });

export const saveConfig = (
  hass: HomeAssistant,
  config: Partial<Config>,
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/config", config);
};

export const fetchProbes = (hass: HomeAssistant): Promise<Probe[]> =>
  hass.callWS({
    type: DOMAIN + "/probes",
  });

export const saveProbe = (
  hass: HomeAssistant,
  config: Partial<Probe>,
): Promise<boolean> => {
  console.log(config);
  return hass.callApi("POST", DOMAIN + "/probes", config);
};

export const deleteProbe = (
  hass: HomeAssistant,
  probe_id: string,
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/probes", {
    id: probe_id,
    remove: true,
  });
};

export const fetchPresets = (hass: HomeAssistant): Promise<Preset[]> =>
  hass.callWS({
    type: DOMAIN + "/presets",
  });

export const fetchStateUpdateSettings = (
  hass: HomeAssistant,
): Promise<Preset[]> =>
  hass.callWS({
    type: DOMAIN + "/stateupdatesettings",
  });

/*export const fetchModules = (
  hass: HomeAssistant
): Promise<SmartIrrigationModule[]> =>
  hass.callWS({
    type: DOMAIN + "/modules",
  });

export const fetchAllModules = (
  hass: HomeAssistant
): Promise<SmartIrrigationModule[]> =>
  hass.callWS({
    type: DOMAIN + "/allmodules",
  });

export const saveModule = (
  hass: HomeAssistant,
  config: Partial<SmartIrrigationModule>
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/modules", config);
};

export const deleteModule = (
  hass: HomeAssistant,
  module_id: string
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/modules", {
    id: module_id,
    remove: true,
  });
};

export const fetchMappings = (
  hass: HomeAssistant
): Promise<SmartIrrigationMapping[]> =>
  hass.callWS({
    type: DOMAIN + "/mappings",
  });
export const saveMapping = (
  hass: HomeAssistant,
  config: Partial<SmartIrrigationMapping>
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/mappings", config);
};

export const deleteMapping = (
  hass: HomeAssistant,
  module_id: string
): Promise<boolean> => {
  return hass.callApi("POST", DOMAIN + "/mappings", {
    id: module_id,
    remove: true,
  });
};
*/
