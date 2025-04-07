import { html, render } from "lit-html";
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

    const tempContainer = document.createElement("div");
    render(
      html`
        <div
          style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 10px"
        >
          <neote-hue-select style="width: 75px;"></neote-hue-select>
          <div
            style="font-family: system-ui, sans-serif; font-size: 14px; height: 150px; overflow-y: scroll; padding: 15px;"
          >
            <span
              style="display: block; font-weight: bold; padding-bottom: 8px;"
              >Event Log</span
            >
          </div>
        </div>
      `,
      tempContainer,
    );

    const wrapper = tempContainer.querySelector("div");
    const hueSelect = tempContainer.querySelector(
      "neote-hue-select",
    ) as HueSelectComponent;
    const eventLog = tempContainer.querySelector(
      "div:last-child",
    ) as HTMLDivElement;
    if (!wrapper || !hueSelect || !eventLog)
      throw new Error("Required elements not found");

    hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
      const hue = e.detail?.hue ?? 0;
      const log = document.createElement("p");
      log.textContent = `Event 'hue-select' hue: ${hue.toString()}`;
      eventLog.appendChild(log);
    });

    container.appendChild(wrapper);

    root.appendChild(container);
  },
};
