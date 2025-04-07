import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";
import { DI } from "@neote/dependency-injection";
import { TagDB, TagService } from "@neote/tags";

export const storyEditorWithTags: Story = {
  title: "EditorWithTags",
  order: 40,
  render: async (root: HTMLElement) => {
    const db = new TagDB();
    const tagService = await TagService.construct(db);
    tagService.update(await tagService.get("apples"));
    tagService.update(await tagService.get("bananas"));
    tagService.update(await tagService.get("vegetables"));
    DI.inject("TagService", tagService);

    const wrapper = getCenteredWrapper();

    const [tag] = html`
      <neote-editor
        extension-tag="enabled"
        data-tag-style="chip-light"
        content='<neote-tag name="vegetables"></neote-tag> I like <neote-tag name="bananas"></neote-tag> and <neote-tag name="apples"></neote-tag>'
      ></neote-editor>
    `;

    wrapper.appendChild(tag);
    root.appendChild(wrapper);
  },
};
