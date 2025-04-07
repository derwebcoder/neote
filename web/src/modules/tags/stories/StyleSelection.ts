import { html, render } from "lit-html";
import { getCenteredWrapper, Story } from "./storyUtils";
import { TagStyleSelectEvent } from "../components/NeoteTagStyleSelection";
import { TagStyleService } from "../services/TagStyleService";

export const storyStyleSelection: Story = {
  title: "Tag Style Selection",
  order: 40,
  render: (root: HTMLElement) => {
    const container = getCenteredWrapper();

    const tagStyleService = new TagStyleService();
    tagStyleService.init(container);

    const tempContainer = document.createElement("div");
    render(
      html`
        <neote-tag-style-selection
          value="${tagStyleService.getStyle()}"
          preview-style="font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.4;"
        ></neote-tag-style-selection>
      `,
      tempContainer,
    );
    const selection = tempContainer.querySelector("neote-tag-style-selection");
    if (!selection) throw new Error("Selection not found");

    selection.addEventListener("style-select", (e: TagStyleSelectEvent) => {
      const style = e.detail!.style;
      tagStyleService.updateStyle(style);
    });

    container.appendChild(selection);

    root.appendChild(container);
  },
};
