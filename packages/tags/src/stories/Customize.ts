import { DI } from "@neote/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { getCenteredWrapper, Story } from "./storyUtils";
import {
  HueSelectComponent,
  HueSelectEvent,
} from "../components/NeoteHueSelect";
import { html, rawHtml } from "@neote/render";
import { TagStyles } from "../config/TagStyleConfig";

export const storyCustomize: Story = {
  title: "Customize",
  order: 30,
  render: (root: HTMLElement) => {
    const tagService = DI.resolve("TagService");
    const tag = tagService.get("universe");

    const container = getCenteredWrapper();
    container.setAttribute("data-tag-style", "chip-light");

    const icons = Object.keys(TagIconMap);

    const [wrapper, iconSelect, styleSelect, hueSelect]: [
      HTMLDivElement,
      HTMLSelectElement,
      HTMLSelectElement,
      HueSelectComponent,
    ] = html`
      <div
        style="display: flex; flex-direction: column; gap: 25px; justify-content: center; align-items: center;"
      >
        <div style="display: flex; gap: 8px;">
          <select ref>
            ${icons
              .map((icon) =>
                rawHtml(
                  html` <option
                    value="${icon}"
                    ${icon === tag.getIcon() ? "selected" : ""}
                  >
                    ${icon}
                  </option>`,
                ),
              )
              .join("")}
          </select>
          <select ref>
            ${TagStyles.map((style) =>
              rawHtml(
                html` <option
                  value="${style}"
                  ${style === "chip-light" ? "selected" : ""}
                >
                  ${style}
                </option>`,
              ),
            ).join("")}
          </select>
          <neote-hue-select
            ref
            hue="${tag.getHue().toString()}"
            style="width: 75px;"
          ></neote-hue-select>
        </div>
        <neote-tag name="universe"></neote-tag>
      </div>
    `;
    container.appendChild(wrapper);

    iconSelect.addEventListener("change", () => {
      const value = iconSelect.value;
      tag.setIcon(value as keyof typeof TagIconMap);
      tagService.update(tag);
    });

    styleSelect.addEventListener("change", () => {
      const style = styleSelect.value;
      container.setAttribute("data-tag-style", style);
    });

    hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
      const hue = e.detail?.hue ?? 0;
      tag.setHue(hue);
      tagService.update(tag);
    });

    root.appendChild(container);
  },
};
