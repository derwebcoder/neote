import "./NeoteEditor.css";
import { Tag, TagService } from "@neote/tags";
import { DI } from "@neote/dependency-injection";
import { html, rawHtml } from "@neote/render";

/**
 * A custom element displaying a rich text editor using TipTap internally.
 *
 * @element neote-tag-suggestions
 * @attr {string} query The query to search for tags
 * @attr {string} select-only Whether the first
 * @attr {'enabled' | 'disabled' | 'selectonly'} extension-tag The mode for the tag extension}
 * @method setContent Update the content of the editor
 */
export class NeoteTagSuggestions extends HTMLElement {
  static observedAttributes = ["query"];
  private tagService?: TagService;

  constructor() {
    super();

    (async () => {
      this.tagService = await DI.resolveAsync("TagService");
      this.render();
    })();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  adoptedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private async render() {
    const tagService = this.tagService;

    if (!tagService) {
      this.innerHTML = "";
      return;
    }

    const query = this.getAttribute("query")?.toLowerCase().trim() ?? "";
    const selectOnly = this.hasAttribute("select-only");

    const tags = await tagService.find(query, 15);

    this.innerHTML = "";
    this.className =
      "bg-white border border-stone-400 rounded-md shadow flex flex-col gap-1 scroll-auto px-3 py-2 relative overflow-y-auto max-h-64";

    if (selectOnly) {
      if (tags.length <= 0) {
        return this.renderEmpty();
      }
    } else {
      const isExactMatch = tags.length === 1 && tags[0].getName() === query;
      if (!selectOnly && !isExactMatch) {
        this.renderAddNewTag(query);
      }
    }

    this.renderTags(tags);
  }

  private async renderEmpty() {
    const [wrapper] = html` <div class="text-stone-500">No results</div> `;
    this.appendChild(wrapper);
  }

  private async renderAddNewTag(query: string) {
    if (query === "") {
      return;
    }
    const [wrapper] = html`
      <button type="button" class="text-start">
        New tag <neote-tag name="${query}"></neote-tag>
      </button>
    `;
    this.appendChild(wrapper);
  }

  private async renderTags(tags: Tag[]) {
    const [wrapper] = html`
      <div>
        ${tags
          .map((tag) =>
            rawHtml(html`
              <button
                type="button"
                data-tag="${tag.getName()}"
                class="text-start"
              >
                <neote-tag name="${tag.getName()}"></neote-tag>
              </button>
            `),
          )
          .join("")}
      </div>
    `;
    this.append(...wrapper.children);
  }
}

customElements.define("neote-tag-suggestions", NeoteTagSuggestions);
