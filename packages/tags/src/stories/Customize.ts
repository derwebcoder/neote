import { DI } from "@neote/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { getCenteredWrapper, Story } from "./storyUtils";
import {
  HueSelectComponent,
  HueSelectEvent,
} from "../components/NeoteHueSelect";
import { html, rawHtml } from "@neote/render";

export const storyCustomize: Story = {
  title: "Customize",
  order: 30,
  render: (root: HTMLElement) => {
    // because otherwise tagService will return default in the beginning
    window.setTimeout(() => {
      const tagService = DI.resolve("TagService");
      const tag = tagService.get("universe");
      console.log({ tag });

      const container = getCenteredWrapper();
      container.className = "chip-light";

      const icons = Object.keys(TagIconMap);
      const styles = [
        "basic",
        "chip-light",
        "chip-dark",
        "chip-border",
        "chip-icon-light",
        "chip-icon-dark",
        "neon",
      ];

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
                      ${icon === tag.icon ? "selected" : ""}
                    >
                      ${icon}
                    </option>`,
                  ),
                )
                .join("")}
            </select>
            <select ref>
              ${styles
                .map((style) =>
                  rawHtml(
                    html` <option
                      value="${style}"
                      ${style === "chip-light" ? "selected" : ""}
                    >
                      ${style}
                    </option>`,
                  ),
                )
                .join("")}
            </select>
            <neote-hue-select
              ref
              hue="${tag.hue.toString()}"
              style="width: 75px;"
            ></neote-hue-select>
          </div>
          <neote-tag name="universe"></neote-tag>
        </div>
      `;
      container.appendChild(wrapper);

      iconSelect.addEventListener("change", () => {
        const value = iconSelect.value;
        tag.icon = value as keyof typeof TagIconMap;
        tagService.update(tag);
      });

      styleSelect.addEventListener("change", () => {
        const style = styleSelect.value;
        container.className = style;
      });

      hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
        const hue = e.detail?.hue ?? 0;
        tag.hue = hue;
        tagService.update(tag);
      });

      root.appendChild(container);
    }, 100);
  },
};
