import { LitElement, html, CSSResultGroup, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import { HomeAssistant, navigate } from "custom-card-helpers";
import { loadHaForm } from "./load-ha-elements";

import "./views/general/view-general.ts";
import "./views/probes/view-probes.ts";

import { commonStyle } from "./styles";
import { VERSION, PLATFORM } from "./const";
import { localize } from "../localize/localize";
import { exportPath, getPath, Path } from "./common/navigation";

@customElement("grill-buddy")
export class GrillBuddyPanel extends LitElement {
  @property() public hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow!: boolean;

  async firstUpdated() {
    window.addEventListener("location-changed", () => {
      if (!window.location.pathname.includes(PLATFORM)) return;
      this.requestUpdate();
    });

    await loadHaForm();
    this.requestUpdate();
  }

  render() {
    if (!customElements.get("ha-panel-config")) return html` loading... `;

    const path = getPath();
    return html`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button
            .hass=${this.hass}
            .narrow=${this.narrow}
          ></ha-menu-button>
          <div class="main-title">${localize("title", this.hass.language)}</div>
          <div class="version">${VERSION}</div>
        </div>

        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${path.page}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="probes">
            ${localize("panels.probes.title", this.hass.language)}
          </paper-tab>
          <paper-tab page-name="help"
            >${localize("panels.help.title", this.hass.language)}</paper-tab
          >
        </ha-tabs>
      </div>
      <div class="view">${this.getView(path)}</div>
    `;
  }

  /*
  <paper-tab page-name="general">
            ${localize("panels.general.title", this.hass.language)}
          </paper-tab>

          */

  getView(path: Path) {
    const page = path.page;
    switch (page) {
      /*case "general":
        return html`
          <grill-buddy-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${path}
          ></grill-buddy-view-general>
        `;*/
      case "probes":
        return html`
          <grill-buddy-view-probes
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${path}
          ></grill-buddy-view-probes>
        `;
      case "help":
        return html`<ha-card
          header="${localize(
            "panels.help.cards.how-to-get-help.title",
            this.hass.language,
          )}"
        >
          <div class="card-content">
            ${localize(
              "panels.help.cards.how-to-get-help.first-read-the",
              this.hass.language,
            )}
            <a href="https://github.com/jeroenterheerdt/grillbuddy/"
              >${localize(
                "panels.help.cards.how-to-get-help.readme",
                this.hass.language,
              )}</a
            >.
            ${localize(
              "panels.help.cards.how-to-get-help.if-you-still-need-help",
              this.hass.language,
            )}
            <a
              href="https://community.home-assistant.io/t/grill-buddy-your-grilling-companion"
              >${localize(
                "panels.help.cards.how-to-get-help.community-forum",
                this.hass.language,
              )}</a
            >
            ${localize(
              "panels.help.cards.how-to-get-help.or-open-a",
              this.hass.language,
            )}
            <a href="https://github.com/jeroenterheerdt/grillbuddy/issues"
              >${localize(
                "panels.help.cards.how-to-get-help.github-issue",
                this.hass.language,
              )}</a
            >
            (${localize(
              "panels.help.cards.how-to-get-help.english-only",
              this.hass.language,
            )}).
          </div></ha-card
        >`;
      default:
        return html`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a
              page from the menu above to continue.
            </div>
          </ha-card>
        `;
    }
  }

  handlePageSelected(ev) {
    const newPage = ev.detail.item.getAttribute("page-name");
    //this was newPage !== getPath() but I am pretty sure that is a bug.
    if (newPage !== getPath().page) {
      navigate(this, exportPath(newPage));
      this.requestUpdate();
    } else {
      scrollTo(0, 0);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(
          --app-header-selection-bar-color,
          var(--app-header-text-color, #fff)
        );
        text-transform: uppercase;
      }

      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }

      .view > * {
        width: 600px;
        max-width: 600px;
      }

      .view > *:last-child {
        margin-bottom: 20px;
      }

      .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
      }
    `;
  }
}
