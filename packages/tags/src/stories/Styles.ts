import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyStyles: Story = {
  title: "Styles",
  order: 10,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "5px";

    const styles = [
      "basic",
      "chip-light",
      "chip-dark",
      "chip-border",
      "chip-icon-light",
      "chip-icon-dark",
      "neon",
    ];

    for (const style of styles) {
      const tag = createTagStyle(style);
      wrapper.appendChild(tag);
    }
    root.appendChild(wrapper);
  },
};

const createTagStyle = (style: string) => {
  const [wrapper] = html`
    <div class="${style}">
      <neote-tag name="${style}"></neote-tag>
    </div>
  `;
  return wrapper;
};
