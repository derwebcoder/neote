import { html, render } from "lit-html";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyBasic: Story = {
  title: "Basic",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const container = document.createElement("div");
    render(html`<neote-tag name="neote"></neote-tag>`, container);
    const tag = container.querySelector("neote-tag");
    if (!tag) throw new Error("Tag not found");

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
