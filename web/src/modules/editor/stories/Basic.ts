import { html, render } from "lit-html";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyBasic: Story = {
  title: "Basic",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const container = document.createElement("div");
    render(
      html`
        <neote-editor
          content="<h1>This is a basic example</h1><p>Happy to see <strong>you</strong>!</p>"
        ></neote-editor>
      `,
      container,
    );
    const tag = container.querySelector("neote-editor");
    if (!tag) throw new Error("Tag not found");

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
