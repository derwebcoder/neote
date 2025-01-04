import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";
import {
  NeoteTagStyleSelection,
  TagStyleSelectEvent,
} from "../components/NeoteTagStyleSelection";
import { TagStyleService } from "../services/TagStyleService";

export const storyStyleSelection: Story = {
  title: "Tag Style Selection",
  order: 40,
  render: (root: HTMLElement) => {
    const container = getCenteredWrapper();

    const tagStyleService = new TagStyleService();
    tagStyleService.init(container);

    const [selection]: [NeoteTagStyleSelection] = html`
      <neote-tag-style-selection
        value="${tagStyleService.getStyle()}"
        preview-style="font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.4;"
      >
      </neote-tag-style-selection>
    `;
    selection.addEventListener("style-select", (e: TagStyleSelectEvent) => {
      const style = e.detail!.style;
      tagStyleService.updateStyle(style);
    });

    container.appendChild(selection);

    root.appendChild(container);
  },
};
