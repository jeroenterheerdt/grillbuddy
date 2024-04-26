import { TemplateResult, LitElement, html, CSSResultGroup, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
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
} from "../../data/websockets";
import { SubscribeMixin } from "../../subscribe-mixin";

import { Config, Probe } from "../../types";
import { commonStyle } from "../../styles";
import { localize } from "../../../localize/localize";
import { DOMAIN, PROBE_NAME, PROBE_SOURCE } from "../../const";

@customElement("grill-buddy-view-probes")
class GrillBuddyViewProbes extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() config?: Config;

  @property({ type: Array })
  private probes: Probe[] = [];

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

    //add dummy module and mapping
    /*const mods: SmartIrrigationModule[] = [];
    const dummyModule: SmartIrrigationModule = {
      id: undefined,
      name: "--SELECT--",
      description: "",
      config: Object,
      schema: Object,
    };
    mods.push(dummyModule);
    mods.concat(await fetchModules(this.hass));
    this.modules = mods;*/
  }

  private handleAddProbe(): void {
    const newProbe: Probe = {
      probe_id: this.probes.length, //new probe will have ID that is equal to current probe length.
      probe_name: this.nameInput.value,
      probe_source: this.sourceInput.value,
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
              value="${value["id"]}"
              ?selected="${selected === value["id"]}"
            >
              ${value["id"]}: ${value["name"]}
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
            <label for="name${index}"
              >${localize(
                "panels.probes.labels.name",
                this.hass.language,
              )}:</label
            >
            <input
              id="name${index}"
              type="text"
              .value="${probe.probe_name}"
              @input="${(e: Event) =>
                this.handleEditProbe(index, {
                  ...probe,
                  [PROBE_NAME]: (e.target as HTMLInputElement).value,
                })}"
            />
            <div class="probeline">
              <label for="source${index}"
                >${localize("panels.probes.labels.source", this.hass.language)}:</label
              >
              <input class="shortinput" id="source${index}" type="text""
              .value="${probe.probe_source}"
              @input="${(e: Event) =>
                this.handleEditProbe(index, {
                  ...probe,
                  [PROBE_SOURCE]: (e.target as HTMLInputElement).value,
                })}"
              />
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
        <ha-card header="${localize("panels.probes.title", this.hass.language)}">
          <div class="card-content">
            ${localize("panels.probes.description", this.hass.language)}
          </div>
        </ha-card>
          <ha-card header="${localize(
            "panels.probes.cards.add-probe.header",
            this.hass.language,
          )}">
            <div class="card-content">
              <div class="probeline"><label for="nameInput">${localize(
                "panels.probes.labels.name",
                this.hass.language,
              )}:</label>
              <input id="nameInput" type="text"/>
              </div>
              <div class="probeline">
              <label for="sourceInput">${localize(
                "panels.probes.labels.source",
                this.hass.language,
              )}:</label>
              <input class="shortinput" id="sourceInput" type="text"/>
              </div>
          ${Object.entries(this.probes).map(([key, value]) =>
            this.renderProbe(value, parseInt(key)),
          )}
        </ha-card>
      `;
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
