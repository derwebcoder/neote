import { DI } from "@neote/dependency-injection";
import { TagIconMap } from "../config/TagIconConfig";
import { getCenteredWrapper, Story } from "./storyUtils";
import { HueSelectEvent } from "../components/NeoteHueSelect";

export const storyCustomize: Story = {
  title: "Customize",
  order: 30,
  render: (root: HTMLElement) => {
    // because otherwise tagService will return default in the beginning
    window.setTimeout(() => {
      const tagService = DI.resolve("TagService");
      const tag = tagService.get("universe");
      console.log({ tag });

      const wrapper = getCenteredWrapper();
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.gap = "25px";
      wrapper.className = "chip-light";

      const settings = document.createElement("div");
      settings.style.display = "flex";
      settings.style.gap = "8px";

      const iconSelect = document.createElement("select");
      const icons = Object.keys(TagIconMap);
      for (const icon of icons) {
        const option = document.createElement("option");
        option.setAttribute("value", icon);
        option.innerText = icon;
        if (icon === tag.icon) {
          option.setAttribute("selected", "true");
        }
        iconSelect.appendChild(option);
      }
      iconSelect.addEventListener("change", () => {
        const value = iconSelect.value;
        tag.icon = value as keyof typeof TagIconMap;
        tagService.update(tag);
      });

      const styles = [
        "basic",
        "chip-light",
        "chip-dark",
        "chip-border",
        "chip-icon-light",
        "chip-icon-dark",
        "neon",
      ];
      const styleSelect = document.createElement("select");
      for (const style of styles) {
        const option = document.createElement("option");
        option.setAttribute("value", style);
        option.innerText = style;
        if (style === "chip-light") {
          option.setAttribute("selected", "true");
        }
        styleSelect.appendChild(option);
      }
      styleSelect.addEventListener("change", () => {
        const style = styleSelect.value;
        wrapper.className = style;
      });

      const hueSelect = document.createElement("neote-hue-select");
      hueSelect.style.width = "75px";
      hueSelect.setAttribute("hue", tag.hue.toString());
      hueSelect.addEventListener("hue-select", (e: HueSelectEvent) => {
        const hue = e.detail?.hue ?? 0;
        tag.hue = hue;
        tagService.update(tag);
      });

      settings.appendChild(iconSelect);
      settings.appendChild(styleSelect);
      settings.appendChild(hueSelect);

      wrapper.appendChild(settings);

      const tagElement = document.createElement("neote-tag");
      tagElement.setAttribute("name", tag.name);

      wrapper.appendChild(tagElement);

      root.appendChild(wrapper);
    }, 100);
  },
};
