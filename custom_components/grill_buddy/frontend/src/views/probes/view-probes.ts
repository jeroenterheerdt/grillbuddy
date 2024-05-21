import { TemplateResult, LitElement, html, CSSResultGroup, css } from "lit";
import { query } from "lit/decorators.js";
import { property, customElement } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { loadHaForm } from "../../load-ha-elements";
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import {
  deleteProbe,
  fetchConfig,
  fetchProbes,
  saveProbe,
  fetchPresets,
  fetchStateUpdateSettings,
  fetchSensors,
} from "../../data/websockets";
import { SubscribeMixin } from "../../subscribe-mixin";

import { Config, Preset, Probe, StateUpdateSettings } from "../../types";
import { commonStyle } from "../../styles";
import { localize } from "../../../localize/localize";
import {
  DOMAIN,
  PROBE_LOWER_BOUND,
  PROBE_NAME,
  PROBE_PRESET,
  PROBE_SOURCE,
  PROBE_STATE_UPDATE_SETTING,
  PROBE_UPPER_BOUND,
} from "../../const";
import { localizeTemperatureUnit, localizeTemperature } from "../../helpers";

@customElement("grill-buddy-view-probes")
class GrillBuddyViewProbes extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() config?: Config;

  @property({ type: Array })
  private probes: Probe[] = [];

  @property({ type: Array })
  private presets: Preset[] = [];

  @property({ type: Array })
  private state_update_settings: StateUpdateSettings[] = [];

  @property({ type: Array })
  private sensors: string[] = [];

  @query("#nameInput")
  private nameInput!: HTMLInputElement;

  @query("#sourceInput")
  private sourceInput!: HTMLInputElement;

  /*constructor() {
    super();
    this._fetchData();
  }*/
  firstUpdated() {
    (async () => await loadHaForm())();
    //this._fetchData();
  }

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeMessage(() => this._fetchData(), {
        type: DOMAIN + "_config_updated",
      }),
    ];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.config = await fetchConfig(this.hass);
    this.probes = await fetchProbes(this.hass);
    this.presets = await fetchPresets(this.hass);
    this.state_update_settings = await fetchStateUpdateSettings(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  private handleAddProbe(): void {
    const newProbe: Probe = {
      probe_id: this.probes.length, //new probe will have ID that is equal to current probe length.
      probe_name: this.nameInput.value,
      probe_source: this.sourceInput.value,
      probe_preset: undefined,
    };

    this.probes = [...this.probes, newProbe];

    this.saveToHA(newProbe);
  }

  private handleEditProbe(index: number, updatedProbe: Probe): void {
    if (!this.hass) {
      return;
    }
    this.probes = Object.values(this.probes).map((probe, i) =>
      i === index ? updatedProbe : probe,
    );
    this.saveToHA(updatedProbe);
  }

  private handleRemoveProbe(ev: Event, index: number): void {
    if (!this.hass) {
      return;
    }
    const probe = Object.values(this.probes).at(index);
    if (!probe) {
      return;
    }
    this.probes = this.probes.filter((_, i) => i !== index);
    if (!this.hass) {
      return;
    }
    deleteProbe(this.hass, probe.probe_id.toString());
  }

  private saveToHA(probe: Probe): void {
    if (!this.hass) {
      return;
    }
    saveProbe(this.hass, probe);
  }

  private renderTheOptions(thelist: object, selected?: number): TemplateResult {
    if (!this.hass) {
      return html``;
    } else {
      let r = html`<option value="" ?selected=${
        selected === undefined
      }">---${localize(
        "common.labels.select",
        this.hass.language,
      )}---</option>`;
      Object.entries(thelist).map(
        ([key, value]) =>
          (r = html`${r}
            <option
              value="${value["preset_id"]}"
              ?selected="${selected === value["preset_id"]}"
            >
              ${value["preset_name"]}
              (${localizeTemperature(
                this.config,
                value["preset_target_temperature"],
              )}
              ${localizeTemperatureUnit(this.config)})
            </option>`),
      );
      return r;
    }
  }

  private renderTheUpdateStatusWhenOptions(
    thelist: object,
    selected?: number,
  ): TemplateResult {
    if (!this.hass) {
      return html``;
    } else {
      let r = html`<option value="" ?selected=${
        selected === undefined
      }">---${localize(
        "common.labels.select",
        this.hass.language,
      )}---</option>`;
      Object.entries(thelist).map(
        ([key, value]) =>
          (r = html`${r}
            <option
              value="${value["stateupdatesetting_id"]}"
              ?selected="${selected === value["stateupdatesetting_id"]}"
            >
              ${value["stateupdatesetting_name"]}
            </option>`),
      );
      return r;
    }
  }

  private renderProbe(probe: Probe, index: number): TemplateResult {
    if (!this.hass) {
      return html``;
    } else {
      return html`
        <ha-card header="${probe.probe_name}">
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
          </div>
          <div class="card-content">
            <label for="probe_name${index}"
              >${localize(
                "panels.probes.labels.name",
                this.hass.language,
              )}:</label
            >
            <input
              id="probe_name${index}"
              type="text"
              .value="${probe.probe_name}"
              @input="${(e: Event) =>
                this.handleEditProbe(index, {
                  ...probe,
                  [PROBE_NAME]: (e.target as HTMLInputElement).value,
                })}"
            />
            <div class="probeline">
              <label for="probe_source${index}"
                >${localize("panels.probes.labels.source", this.hass.language)}:</label
              >
              <select id="probe_source${index}"
              .value="${probe.probe_source}"
              @change="${(e: Event) =>
                this.handleEditProbe(index, {
                  ...probe,
                  [PROBE_SOURCE]: (e.target as HTMLInputElement).value,
                })}"
              >
              ${this.renderTheSourceOptions(this.sensors, probe.probe_source)}
              </select>
            </div>
            <div class="probeline">
            <label for="probe_preset${index}">${localize(
              "panels.probes.labels.preset",
              this.hass.language,
            )}:</label>
            <select
            id="probe_preset${index}"
            @change="${(e: Event) =>
              this.handleEditProbe(index, {
                ...probe,
                [PROBE_PRESET]: parseInt((e.target as HTMLSelectElement).value),
              })}"
          >
            ${this.renderTheOptions(this.presets, probe.probe_preset)}
          </select>
            </div>
            <div class="probeline">
            <label for="probe_lower_bound${index}">${localize(
              "panels.probes.labels.lower_bound",
              this.hass.language,
            )}:</label>
      <input id="probe_lower_bound${index}" class="shortinput" type="text"
      .value="${probe.probe_lower_bound}"
      @input="${(e: Event) =>
        this.handleEditProbe(index, {
          ...probe,
          [PROBE_LOWER_BOUND]: parseFloat((e.target as HTMLInputElement).value),
        })}"
      /> ${localizeTemperatureUnit(this.config)}
      </div>
      <div class="probeline">
      <label for="probe_upper_bound${index}">${localize(
        "panels.probes.labels.upper_bound",
        this.hass.language,
      )}:</label>
<input id="probe_upper_bound${index}" class="shortinput" type="text"
.value="${probe.probe_upper_bound}"
@input="${(e: Event) =>
        this.handleEditProbe(index, {
          ...probe,
          [PROBE_UPPER_BOUND]: parseFloat((e.target as HTMLInputElement).value),
        })}"
/> ${localizeTemperatureUnit(this.config)}
</div>
<div class="probeline">
            <label for="probe_state_update_setting${index}">${localize(
              "panels.probes.labels.state_update_setting",
              this.hass.language,
            )}:</label>
            <select
            id="probe_state_update_setting${index}"
            @change="${(e: Event) =>
              this.handleEditProbe(index, {
                ...probe,
                [PROBE_STATE_UPDATE_SETTING]: parseInt(
                  (e.target as HTMLSelectElement).value,
                ),
              })}"
          >
            ${this.renderTheUpdateStatusWhenOptions(this.state_update_settings, probe.probe_state_update_setting)}
          </select>
            </div>
        </ha-card>
      `;
    }
  }

  render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    } else {
      return html`
        <ha-card
          header="${localize("panels.probes.title", this.hass.language)}"
        >
          <div class="card-content">
            ${localize("panels.probes.description", this.hass.language)}
          </div>
        </ha-card>
        <ha-card
          header="${localize(
            "panels.probes.cards.add-probe.header",
            this.hass.language,
          )}"
        >
          <div class="card-content">
            <div class="probeline">
              <label for="nameInput"
                >${localize(
                  "panels.probes.labels.name",
                  this.hass.language,
                )}:</label
              >
              <input id="nameInput" type="text" />
            </div>
            <div class="probeline">
              <label for="sourceInput"
                >${localize(
                  "panels.probes.labels.source",
                  this.hass.language,
                )}:</label
              >
              <select id="sourceInput">
              ${this.renderTheSourceOptions(this.sensors)}
              </select>
            </div>

            <div class="probeline">
              <button @click="${this.handleAddProbe}">
                ${localize(
                  "panels.probes.cards.add-probe.actions.add",
                  this.hass.language,
                )}
              </button>
            </div>
          </div>
        </ha-card>
        ${Object.entries(this.probes).map(([key, value]) =>
          this.renderProbe(value, parseInt(key)),
        )}
      `;
    }
  }

  private renderTheSourceOptions(
    thelist: object,
    selected?: string,
  ): TemplateResult {
    if (!this.hass) {
      return html``;
    } else {
      let r = html`<option value="" ?selected=${
        selected === undefined
      }">---${localize(
        "common.labels.select",
        this.hass.language,
        )}---</option>`;
      Object.entries(thelist).map(
        ([key, value]) =>
          (r = html`${r}
            <option
              value="${value["name"]}"
              ?selected="${selected === value["name"]}"
            >
              ${value["name"]}
            </option>`),
      );
      return r;
    }
  }


  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      .probe {
        margin-top: 25px;
        margin-bottom: 25px;
      }
      .hidden {
        display: none;
      }
      .shortinput {
        width: 50px;
      }
      .probeline {
        margin-left: 20px;
        margin-top: 5px;
      }
    `;
  }
}
