import { getCenteredWrapper, Story } from "./storyUtils";

export const storyBasic: Story = {
  title: "Basic",
  order: 0,
  render: (root: HTMLElement) => {
    const wrapper = getCenteredWrapper();

    const tag = document.createElement("neote-tag");
    tag.setAttribute("name", "neote");

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
