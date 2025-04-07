import { html } from "@/modules/render";
import "./NeoteHueSelect.css";

type HueSelectEventDetail = { hue: number };
export type HueSelectEvent = CustomEventInit<HueSelectEventDetail>;

export class HueSelectComponent extends HTMLElement {
  static observedAttributes = ["hue"];

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

  private updateHue(hue: number) {
    this.setAttribute("hue", hue.toFixed(0));
    this.dispatchEvent(
      new CustomEvent<HueSelectEventDetail>("hue-select", {
        bubbles: true,
        detail: { hue },
      }),
    );
  }

  private async render() {
    this.innerHTML = "";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, colorWheelWrapper, colorWheel, hueInput]: [
      HTMLDivElement,
      HTMLDivElement,
      HTMLDivElement,
      HTMLInputElement,
    ] = html`
      <div>
        <div ref class="color-wheel-wrapper">
          <div ref class="color-wheel"></div>
        </div>
        <input ref type="number" value="${this.getAttribute("hue") ?? "0"}" />
      </div>
    `;

    hueInput.addEventListener("change", (e) => {
      e.stopPropagation();
      const hue = Number.parseInt(hueInput.value, 10);
      this.updateHue(hue);
    });

    colorWheel.addEventListener("click", (event) => {
      const rect = colorWheel.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      const hue = (angle + 360) % 360;

      this.updateHue(Math.round(hue));
    });

    this.appendChild(colorWheelWrapper);
    this.appendChild(hueInput);
  }
}

customElements.define("neote-hue-select", HueSelectComponent);
