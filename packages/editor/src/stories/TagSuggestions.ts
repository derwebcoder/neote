import { html } from "@neote/render";
import { getCenteredWrapper, Story } from "./storyUtils";
import { DI } from "@neote/dependency-injection";
import { TagDB, TagService } from "@neote/tags";
import { NeoteTagSuggestions } from "../components/NeoteTagSuggestions";

export const storyTagSuggestions: Story = {
  title: "TagSuggestions",
  order: 0,
  render: async (root: HTMLElement) => {
    const db = new TagDB();
    const tagService = await TagService.construct(db);
    tagService.update(await tagService.get("books"));
    tagService.update(await tagService.get("movies"));
    tagService.update(await tagService.get("beers"));
    tagService.update(await tagService.get("bananas"));
    DI.inject("TagService", tagService);

    const container = getCenteredWrapper();

    const [wrapper, input, suggestions]: [
      HTMLDivElement,
      HTMLInputElement,
      NeoteTagSuggestions,
    ] = html`
      <div data-tag-style="token-gradient-light" class="flex flex-col gap-6">
        <input ref type="text" class="border"></input>
        <neote-tag-suggestions ref query=""></neote-tag-suggestions>
      </div>
    `;

    input.addEventListener("keyup", () => {
      const query = input.value;
      suggestions.setAttribute("query", query);
    });

    container.appendChild(wrapper);
    root.appendChild(container);
  },
};
