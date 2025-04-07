import { html, render } from "lit-html";
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
  const container = document.createElement("div");
  render(
    html`
      <div data-tag-style="${style}">
        <neote-tag name="${style}"></neote-tag>
      </div>
    `,
    container,
  );
  const wrapper = container.querySelector("div[data-tag-style]");
  if (!wrapper) throw new Error("Wrapper not found");
  return wrapper;
};
