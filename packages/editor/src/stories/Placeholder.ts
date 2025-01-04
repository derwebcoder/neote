import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyPlaceholder: Story = {
  title: "Placeholder",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const [tag] = html`
      <neote-editor placeholder="Add a note ..."></neote-editor>
    `;

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
