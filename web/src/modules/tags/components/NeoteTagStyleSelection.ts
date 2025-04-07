import { html, rawHtml } from "@/modules/render";
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

    const [wrapper, select]: [HTMLDivElement, HTMLSelectElement] = html`
      <div class="wrapper">
        <select ref size="${TagStyles.length.toString()}">
          ${TagStyles.map((style) =>
            rawHtml(html`
              <option value=${style} ${value === style ? "selected " : ""}>
                ${TagStyleNameMap[style]}
              </option>
            `[0]),
          ).join("")}
        </select>
        <div class="preview">
          <p class="${previewClass}" style="${previewStyle}">
            <neote-tag name="thought"></neote-tag>
            <neote-tag name="philosophy"></neote-tag> Is the
            <neote-tag name="universe"></neote-tag> really expanding or are our
            minds just shrinking?
          </p>
        </div>
      </div>
    `;
    select.addEventListener("change", () => {
      const value = select.value as TagStyle;
      this.updateStyle(value);
    });

    this.appendChild(wrapper);
  }
}

customElements.define("neote-tag-style-selection", NeoteTagStyleSelection);
