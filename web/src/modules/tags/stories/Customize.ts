import { DI } from "@/modules/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { getCenteredWrapper, Story } from "./storyUtils";
import { HueSelectEvent } from "../components/NeoteHueSelect";
import { html, render } from "lit-html";
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

    const wrapperContainer = document.createElement("div");
    render(
      html`
        <div
          style="display: flex; flex-direction: column; gap: 25px; justify-content: center; align-items: center;"
        >
          <div style="display: flex; gap: 8px;">
            <select>
              ${icons.map(
                (icon) =>
                  html`<option
                    value="${icon}"
                    ${icon === tag.getIcon() ? "selected" : ""}
                  >
                    ${icon}
                  </option>`,
              )}
            </select>
            <select>
              ${TagStyles.map(
                (style) =>
                  html`<option
                    value="${style}"
                    ${style === "chip-light" ? "selected" : ""}
                  >
                    ${style}
                  </option>`,
              )}
            </select>
            <neote-hue-select
              hue="${tag.getHue().toString()}"
              style="width: 75px;"
            ></neote-hue-select>
          </div>
          <neote-tag name="universe"></neote-tag>
        </div>
      `,
      wrapperContainer,
    );

    const wrapper = wrapperContainer.querySelector("div");
    const iconSelect = wrapperContainer.querySelector(
      "select:first-of-type",
    ) as HTMLSelectElement;
    const styleSelect = wrapperContainer.querySelector(
      "select:last-of-type",
    ) as HTMLSelectElement;
    const hueSelect = wrapperContainer.querySelector("neote-hue-select");
    if (!wrapper || !iconSelect || !styleSelect || !hueSelect)
      throw new Error("Required elements not found");

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
