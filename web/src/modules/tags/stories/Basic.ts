import { html } from "@/modules/render";
import { getCenteredWrapper, Story } from "./storyUtils";

export const storyBasic: Story = {
  title: "Basic",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const [tag] = html` <neote-tag name="neote"></neote-tag> `;

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
