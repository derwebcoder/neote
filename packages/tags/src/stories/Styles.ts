import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";
import { TagStyles } from "../config/TagStyleConfig";

export const storyStyles: Story = {
  title: "Styles",
  order: 10,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "5px";

    for (const style of TagStyles) {
      const tag = createTagStyle(style);
      wrapper.appendChild(tag);
    }

    root.appendChild(wrapper);
  },
};

const createTagStyle = (style: string) => {
  const [wrapper] = html`
    <div data-tag-style="${style}">
      <neote-tag name="${style}"></neote-tag>
    </div>
  `;
  return wrapper;
};
