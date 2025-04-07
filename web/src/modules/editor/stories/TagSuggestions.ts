import { html, render } from "lit-html";
import { getCenteredWrapper, Story } from "./storyUtils";
import { DI } from "@/modules/dependency-injection";
import { TagDB, TagService } from "@/modules/tags";
import { TagSelectEvent } from "../components/NeoteTagSuggestions";

export const storyTagSuggestions: Story = {
  title: "TagSuggestions",
  order: 30,
  render: async (root: HTMLElement) => {
    const db = new TagDB();
    const tagService = await TagService.construct(db);
    tagService.update(await tagService.get("books"));
    tagService.update(await tagService.get("movies"));
    tagService.update(await tagService.get("beers"));
    tagService.update(await tagService.get("bananas"));
    DI.inject("TagService", tagService);

    const container = getCenteredWrapper();

    const tempContainer = document.createElement("div");
    render(
      html`
      <div data-tag-style="token-gradient-light" class="flex flex-col gap-6">
        <input type="text" class="border"></input>
        <neote-tag-suggestions query=""></neote-tag-suggestions>
        <div></div>
      </div>
    `,
      tempContainer,
    );
    const wrapper = tempContainer.querySelector("div[data-tag-style]");
    const input = tempContainer.querySelector("input");
    const suggestions = tempContainer.querySelector("neote-tag-suggestions");
    const log = tempContainer.querySelector("div:last-child");
    if (!wrapper || !input || !suggestions || !log)
      throw new Error("Required elements not found");

    input.addEventListener("keyup", () => {
      const query = input.value;
      suggestions.setAttribute("query", query);
    });

    suggestions.addEventListener("tag-select", (e: TagSelectEvent) => {
      const logElement = document.createElement("p");
      logElement.innerText = e.detail?.tag ?? "(unknown tag)";
      log.appendChild(logElement);
    });

    container.appendChild(wrapper);
    root.appendChild(container);
  },
};
