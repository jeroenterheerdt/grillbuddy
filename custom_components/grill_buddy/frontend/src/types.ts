export interface Dictionary<TValue> {
  [id: string]: TValue;
}

export class Config {
  units: string;
  constructor(u: string) {
    this.units = u;
  }
}

export enum PresetProtein {
  Beef = "beef",
  Fish = "fish",
  GroundBeef = "groundbeef",
  GroundPoultry = "groundpoultry",
  Lamb = "lamb",
  Pork = "pork",
  Poultry = "poultry",
  Turkey = "turkey",
  Veal = "veal",
}
export enum PresetDoneness {
  Rare = "rare",
  MediumRare = "mediumrare",
  Medium = "medium",
  MediumWell = "mediumwell",
  WellDone = "welldone",
}

export class StateUpdateSettings {
  id: number;
  name: string;

  constructor(i: number, n: string) {
    this.id = i;
    this.name = n;
  }
}
export class Preset {
  id: number;
  name: string;
  protein: PresetProtein;
  doneness: PresetDoneness;
  target_temp: number;

  constructor(
    i: number,
    n: string,
    p: PresetProtein,
    d: PresetDoneness,
    t: number,
  ) {
    this.id = i;
    this.name = n;
    this.protein = p;
    this.doneness = d;
    this.target_temp = t;
  }
}

export class Probe {
  probe_id: number;
  probe_name: string;
  probe_source: string;
  probe_preset?: number;
  probe_lower_bound?: number;
  probe_upper_bound?: number;
  probe_state_update_setting?: number;

  constructor(
    i: number,
    n: string,
    s: string,
    p?: number,
    l?: number,
    u?: number,
    sus?: number,
  ) {
    this.probe_id = i;
    this.probe_name = n;
    this.probe_source = s;
    this.probe_preset = p;
    this.probe_lower_bound = l;
    this.probe_upper_bound = u;
    this.probe_state_update_setting = sus;
  }
}

/*export class SmartIrrigationModule {
  id: number;
  name: string;
  description: string;
  //duration: number;
  config: object;
  schema: object;
  constructor(i: number, n: string, d: string, c: object, s: object) {
    this.id = i;
    this.name = n;
    this.description = d;
    this.config = c;
    this.schema = s;
    //this.duration = dr;
    //this.module = m;
  }
}*/

/*export class SmartIrrigationMapping {
  id: number;
  name: string;
  mappings: object;
  data_last_updated?: Date;

  constructor(i: number, n: string, m: object) {
    this.id = i;
    this.name = n;
    this.mappings = m;
    this.data_last_updated = undefined;
  }
}
*/
