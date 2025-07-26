import { html, rawHtml } from "@/modules/render";
import "./NeoteTagStyleSelection.css";
import { TagStyle, TagStyleNameMap, TagStyles } from "$/config/TagStyleConfig";
import { CustomElement } from "@/modules/types";

type TagStyleSelectEventDetail = { style: TagStyle };
export type NeoteTagStyleSelectEvent = CustomEventInit<TagStyleSelectEventDetail>;

export type NeoteTagStyleSelectAttributes = {
  value?: TagStyle;
  "preview-class"?: string;
  "preview-style"?: string;
  "wrapper-class"?: string;
  "wrapper-style"?: string;
  "style-select"?: (event: NeoteTagStyleSelectEvent) => void;
};

export class NeoteTagStyleSelect
  extends HTMLElement
  implements NeoteTagStyleSelectAttributes {
  static observedAttributes = ["value"];
  private _value: TagStyle = "basic";

  constructor() {
    super();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.setAttribute("value", this._value);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() { }

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
    this.value = style;
  }

  private async render() {
    this.innerHTML = "";

    const value = this.getAttribute("value");
    const previewClass = this.getAttribute("preview-class") ?? "";
    const previewStyle = this.getAttribute("preview-style") ?? "";
    const wrapperClass = this.getAttribute("wrapper-class") ?? "";
    const wrapperStyle = this.getAttribute("wrapper-style") ?? "";

    const [wrapper, select]: [HTMLDivElement, HTMLSelectElement] = html`
      <div class="wrapper ${wrapperClass}" style="${wrapperStyle}">
        <select ref size="${TagStyles.length.toString()}">
          ${TagStyles.map((style) =>
      rawHtml(html`
              <option value=${style} ${value === style ? "selected " : ""}>
                ${TagStyleNameMap[style]}
              </option>
            `[0]),
    ).join("")}
        </select>
        <div class="preview" data-tag-style="${value ?? "basic"}">
          <p class="${previewClass}" style="${previewStyle}">
            <neote-tag name="inspiration">inspiration</neote-tag> <neote-tag name="quote">quote</neote-tag> Don't be pushed around by
            the <neote-tag name="fear"></neote-tag> in your mind. Be led by the
            <neote-tag name="dream"></neote-tag> in your heart.
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

export const defineNeoteTagStyleSelect = (customWindow: Window = window) => {
  if (customWindow.customElements.get("neote-tag-style-select")) {
    return;
  }
  customWindow.customElements.define("neote-tag-style-select", NeoteTagStyleSelect);
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "neote-tag-style-select": CustomElement<
        NeoteTagStyleSelect,
        NeoteTagStyleSelectAttributes
      >;
    }
  }
}
