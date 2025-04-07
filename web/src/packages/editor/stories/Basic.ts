import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyBasic: Story = {
  title: "Basic",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const [tag] = html`
      <neote-editor
        content="<h1>This is a basic example</h1><p>Happy to see <strong>you</strong>!</p>"
      ></neote-editor>
    `;

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
