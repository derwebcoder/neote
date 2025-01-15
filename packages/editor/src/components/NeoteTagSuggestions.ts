import "./NeoteTagSuggestions.css";
import { Tag, TagService } from "@neote/tags";
import { DI } from "@neote/dependency-injection";
import { html, rawHtml } from "@neote/render";

type TagSelectEventDetail = { tag: string };
export type TagSelectEvent = CustomEventInit<TagSelectEventDetail>;

/**
 * A custom element displaying a rich text editor using TipTap internally.
 *
 * @element neote-tag-suggestions
 * @attr {string} query The query to search for tags
 * @attr {string} select-only Whether to disable the feature to add a new tag should a query not yield an (exact) match.
 */
export class NeoteTagSuggestions extends HTMLElement {
  static observedAttributes = ["query"];
  private tagService?: TagService;
  // note, this index starts at 1, because we use it with :nth-child()
  private selectedIndex = 1;
  private items: Tag[] = [];

  constructor() {
    super();

    (async () => {
      this.tagService = await DI.resolveAsync("TagService");
      await this.update();
      await this.render();
    })();
  }

  connectedCallback() {
    this.handleSelect();
    this.update().then(() => this.render());
  }

  disconnectedCallback() {}

  adoptedCallback() {
    this.update().then(() => this.render());
  }

  attributeChangedCallback() {
    this.update().then(() => this.render());
  }

  private scrollToView(index: number) {
    const itemElement = this.querySelector(`button:nth-child(${index + 1})`);
    itemElement?.scrollIntoView({
      block: "nearest",
    });
  }

  private upHandler() {
    const numberOfOptions =
      this.items.length + (this.isAddingNewTagOptionAvailable() ? 1 : 0);
    const nextIndex = (this.selectedIndex - 1) % numberOfOptions;
    this.selectedIndex = nextIndex;
    this.scrollToView(nextIndex);
    this.render();
  }

  private downHandler() {
    const numberOfOptions =
      this.items.length + (this.isAddingNewTagOptionAvailable() ? 1 : 0);
    const nextIndex = (this.selectedIndex + 1) % numberOfOptions;
    this.selectedIndex = nextIndex;
    this.scrollToView(nextIndex);
    this.render();
  }

  /**
   * @returns true if the event has been handled here, otherwise false to be handled externally
   */
  public onExternalKeyDown({ event }: { event: KeyboardEvent }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      const itemElement = this.querySelector(
        `button:nth-child(${this.selectedIndex})`,
      );
      itemElement?.dispatchEvent(new Event("click", { bubbles: true }));
      event.preventDefault();
      event.stopPropagation();
      return true;
    }

    return false;
  }

  private handleSelect() {
    this.addEventListener("click", (e: KeyboardEvent | MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag =
        target.getAttribute("data-tag") ??
        target.parentElement?.getAttribute("data-tag") ??
        target.parentElement?.parentElement?.getAttribute("data-tag");
      if (!tag) {
        return;
      }
      e.stopPropagation();
      this.dispatchEvent(
        new CustomEvent<TagSelectEventDetail>("tag-select", {
          bubbles: true,
          detail: { tag },
        }),
      );
    });
  }

  private async update() {
    const tagService = this.tagService;
    if (!tagService) {
      return;
    }
    const query = this.getAttribute("query")?.toLowerCase().trim() ?? "";

    this.items = await tagService.find(query, 15);

    if (this.items.length > 0) {
      if (this.isAddingNewTagOptionAvailable()) {
        this.selectedIndex = 2;
      } else {
        this.selectedIndex = 1;
      }
    }
  }

  /**
   * the option to add a new term is only available if:
   * - the option selectOnly is not active
   * - the user has entered some text (the query)
   * - the first item is not an exact match
   */
  private isAddingNewTagOptionAvailable() {
    const query = this.getAttribute("query")?.trim() ?? "";
    const selectOnly = this.hasAttribute("select-only");
    const isExactMatch = this.items[0]?.getName() === query;
    return !selectOnly && query.length > 0 && !isExactMatch;
  }

  private async render() {
    const tagService = this.tagService;

    if (!tagService) {
      this.innerHTML = "";
      return;
    }

    const query = this.getAttribute("query")?.toLowerCase().trim() ?? "";
    const selectOnly = this.hasAttribute("select-only");

    this.innerHTML = "";
    this.className =
      "bg-white border border-stone-400 rounded-md shadow flex flex-col gap-1 scroll-auto px-3 py-2 overflow-y-auto max-h-64";

    let selectedIndex = this.selectedIndex;
    if (selectOnly) {
      if (this.items.length <= 0) {
        return this.renderEmpty();
      }
    } else {
      if (this.isAddingNewTagOptionAvailable()) {
        this.renderAddNewTag(query);
        // if we render the option to add a new tag,
        // we need to decrement the index so that it matches when we
        // render the items
        selectedIndex = selectedIndex - 1;
      }
    }

    this.renderTags(this.items, selectedIndex);
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
      <button
        type="button"
        class="${this.selectedIndex === 1 ? "selected" : ""} text-start"
        data-tag="${query}"
      >
        <span class="text-sm text-stone-500">New tag</span>
        <neote-tag name="${query}"></neote-tag>
      </button>
    `;
    this.appendChild(wrapper);
  }

  private async renderTags(tags: Tag[], selectedIndex: number) {
    const [wrapper] = html`
      <div>
        ${tags
          .map((tag, index) =>
            rawHtml(html`
              <button
                type="button"
                data-tag="${tag.getName()}"
                class="${index + 1 === selectedIndex
                  ? "selected"
                  : ""} text-start"
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
