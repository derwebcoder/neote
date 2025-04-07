import { html, render } from "lit-html";
import "./NeoteTagStyleSelection.css";
import { TagStyle, TagStyleNameMap, TagStyles } from "../config/TagStyleConfig";

type TagStyleSelectEventDetail = { style: TagStyle };
export type TagStyleSelectEvent = CustomEventInit<TagStyleSelectEventDetail>;

export class NeoteTagStyleSelection extends HTMLElement {
  static observedAttributes = ["value"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  adoptedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private updateStyle(style: TagStyle) {
    this.dispatchEvent(
      new CustomEvent<TagStyleSelectEventDetail>("style-select", {
        bubbles: true,
        detail: { style },
      }),
    );
  }

  private async render() {
    this.innerHTML = "";

    const value = this.getAttribute("value");
    const previewClass = this.getAttribute("preview-class") ?? "";
    const previewStyle = this.getAttribute("preview-style") ?? "";

    const container = document.createElement("div");
    render(
      html`
        <div class="wrapper">
          <select size="${TagStyles.length.toString()}" role="listbox">
            ${TagStyles.map(
              (style) =>
                html`<option
                  value=${style}
                  ${value === style ? "selected" : ""}
                >
                  ${TagStyleNameMap[style]}
                </option>`,
            )}
          </select>
          <div class="preview">
            <p class="${previewClass}" style="${previewStyle}">
              <neote-tag name="thought"></neote-tag>
              <neote-tag name="philosophy"></neote-tag> Is the
              <neote-tag name="universe"></neote-tag> really expanding or are
              our minds just shrinking?
            </p>
          </div>
        </div>
      `,
      container,
    );
    const wrapper = container.querySelector(".wrapper");
    const select = container.querySelector("select");
    if (!wrapper || !select) {
      console.error(
        "Failed to render NeoteTagStyleSelection: Required elements not found.",
      );
      return;
    }

    select.addEventListener("change", () => {
      const value = select.value as TagStyle;
      this.updateStyle(value);
    });

    this.appendChild(wrapper);
  }
}

customElements.define("neote-tag-style-selection", NeoteTagStyleSelection);
