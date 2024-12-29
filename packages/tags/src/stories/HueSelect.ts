import { HueSelectEvent } from "../components/NeoteHueSelect";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyHueSelect: Story = {
  title: "HueSelect",
  order: 20,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "10px";

    const eventLog = document.createElement("div");
    eventLog.style.fontFamily = "system, sans-serif";
    eventLog.style.fontSize = "14px";
    eventLog.style.height = "150px";
    eventLog.style.overflowY = "scroll";
    eventLog.style.padding = "15px";
    const title = document.createElement("p");
    title.innerText = "Event Log";
    title.style.fontWeight = "bold";
    title.style.paddingBottom = "8px";
    eventLog.appendChild(title);

    const hueSelect = document.createElement("neote-hue-select");
    hueSelect.style.width = "75px";

    hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
      const hue = e.detail?.hue ?? 0;
      const log = document.createElement("p");
      log.innerText = `Event 'hue-select' hue: ${hue}`;
      eventLog.appendChild(log);
    });

    wrapper.appendChild(hueSelect);
    wrapper.appendChild(eventLog);

    root.appendChild(wrapper);
  },
};
