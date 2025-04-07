import { html, render } from "lit-html";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyPlaceholder: Story = {
  title: "Placeholder",
  order: 10,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const container = document.createElement("div");
    render(
      html`<neote-editor placeholder="Add a note ..."></neote-editor>`,
      container,
    );
    const tag = container.querySelector("neote-editor");
    if (!tag) throw new Error("Tag not found");

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
