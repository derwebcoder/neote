import { html } from "@/modules/render";
import {
  HueSelectComponent,
  HueSelectEvent,
} from "../components/NeoteHueSelect";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyHueSelect: Story = {
  title: "HueSelect",
  order: 20,
  render: (root: HTMLElement) => {
    const container = getCenteredWrapper();

    const [wrapper, hueSelect, eventLog]: [
      HTMLDivElement,
      HueSelectComponent,
      HTMLDivElement,
    ] = html`
      <div
        style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 10px"
      >
        <neote-hue-select ref style="width: 75px;"></neote-hue-select>
        <div
          ref
          style="font-family: system-ui, sans-serif; font-size: 14px; height: 150px; overflow-y: scroll; padding: 15px;"
        >
          <span style="display: block; font-weight: bold; padding-bottom: 8px;"
            >Event Log</span
          >
        </div>
      </div>
    `;

    hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
      const hue = e.detail?.hue ?? 0;
      const [log] = html`<p>Event 'hue-select' hue: ${hue.toString()}</p>`;
      eventLog.appendChild(log);
    });

    container.appendChild(wrapper);

    root.appendChild(container);
  },
};
