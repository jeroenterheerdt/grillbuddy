import { CSSResultGroup, LitElement, css, html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { UnsubscribeFunc } from "home-assistant-js-websocket";

import { fetchConfig, saveConfig } from "../../data/websockets";
import { SubscribeMixin } from "../../subscribe-mixin";
import { localize } from "../../../localize/localize";
import { pick, handleError, parseBoolean } from "../../helpers";
import { loadHaForm } from "../../load-ha-elements";
import { Config } from "../../types";
import { commonStyle } from "../../styles";
import { Path } from "../../common/navigation";
import {
  DOMAIN,
} from "../../const";
import { mdiInformationOutline } from "@mdi/js";

@customElement("grill-buddy-view-general")
export class GrillBuddyViewGeneral extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: Path;

  @property() data?: Partial<Config>;

  @property() config?: Config;

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
    /*this.data = pick(this.config, [
      CONF_CALC_TIME,
      CONF_AUTO_CALC_ENABLED,
      CONF_AUTO_UPDATE_ENABLED,
      CONF_AUTO_UPDATE_SCHEDULE,
      CONF_AUTO_UPDATE_TIME,
      CONF_AUTO_UPDATE_INTERVAL,
      CONF_AUTO_CLEAR_ENABLED,
      CONF_CLEAR_TIME,
    ]);*/
    this.data = []

    /*Object.entries(this.data).forEach(([key, value]) => console.log(key, value));*/
  }

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.config || !this.data) return html``;
    else {

      return html`<h1>Barf</h1>`;
    }
  }

  private saveData(changes: Partial<Config>) {
    if (!this.hass || !this.data) return;

    this.data = {
      ...this.data,
      ...changes,
    };
    saveConfig(this.hass, this.data)
      .catch((e) =>
        handleError(e, this.shadowRoot!.querySelector("ha-card") as HTMLElement)
      )
      .then();
  }

  toggleInformation(item: string) {
    const el = this.shadowRoot?.querySelector("#" + item);

    //const bt = this.shadowRoot?.querySelector("#showcalcresults" + index);
    //if (!el || !bt) {
    if (!el) {
      return;
    } else {
      if (el.className != "hidden") {
        el.className = "hidden";
        //bt.textContent = "Show calculation explanation";
      } else {
        el.className = "information";
        //bt.textContent = "Hide explanation";
      }
    }
  }
  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      .hidden {
        display: none;
      }
      .shortinput {
        width: 50px;
      }
      .information {
        margin-left: 20px;
        margin-top: 5px;
      }
    `;
  }
}
