import "./NeoteTagSuggestions.css";
import { Tag, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";
import { html, rawHtml } from "@/modules/render";

type TagSelectEventDetail = { tag: string };
export type TagSelectEvent = CustomEventInit<TagSelectEventDetail>;

/**
 * A custom element displaying a list of tags
 *
 * note: This component is not responsible for positioning!
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
    let nextIndex = (this.selectedIndex - 1) % (numberOfOptions + 1);
    if (nextIndex === 0) {
      nextIndex = numberOfOptions;
    }

    this.selectedIndex = nextIndex;
    this.scrollToView(nextIndex);
    this.render();
  }

  private downHandler() {
    const numberOfOptions =
      this.items.length + (this.isAddingNewTagOptionAvailable() ? 1 : 0);
    let nextIndex = (this.selectedIndex + 1) % (numberOfOptions + 1);
    if (nextIndex === 0) {
      nextIndex = 1;
    }

    this.selectedIndex = nextIndex;
    this.scrollToView(nextIndex);
    this.render();
  }

  /**
   * Tiptap requires a callback that receives the KeyboardEvent
   * The callback needs to return true if the event has been handled by this component
   * or false to forward the event to the next extension or tiptap
   *
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
      // We simulate a click on the currently selected item
      // this will then be handled by the click event listener
      // in `handleSelect()`
      const itemElement = this.querySelector(
        `button:nth-child(${this.selectedIndex})`,
      );
      itemElement?.dispatchEvent(new Event("click", { bubbles: true }));

      // to prevent creating a new line
      event.preventDefault();
      event.stopPropagation();

      return true;
    }

    return false;
  }

  /**
   * Adds an event listener to the list to listen for
   * click or keyboard events and triggers the custom
   * `tag-select` event with the tag name taken from the `data-tag` attribute
   */
  private handleSelect() {
    this.addEventListener("click", (e: KeyboardEvent | MouseEvent) => {
      const target = e.target as HTMLElement;

      // the user could have clicked on a child element of the button
      const tag =
        target.getAttribute("data-tag") ??
        target.parentElement?.getAttribute("data-tag") ??
        target.parentElement?.parentElement?.getAttribute("data-tag");
      if (!tag) {
        return;
      }

      // don't expose the click event outside of the component
      e.stopPropagation();

      this.dispatchEvent(
        new CustomEvent<TagSelectEventDetail>("tag-select", {
          bubbles: true,
          detail: { tag },
        }),
      );
    });
  }

  /**
   * Updates the component state by querying the tagService
   * and updating the selectedIndex
   */
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

  /**
   * Renders the list
   */
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
      "bg-white border border-stone-400 rounded-md shadow flex flex-col scroll-auto px-1 py-1 overflow-y-auto max-h-64";

    // We can render three different things based on the current state
    // - Empty state (only if selectOnly is true, otherwise it's (always) possible to create a new tag)
    // - Add new tag (only if selectOnly is false and isAddingNewTagOptionAvailable() returns true)
    // - The list of tags (can be nothing if no match)
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

  /**
   * Renders the empty state.
   * A part of the `render()` function
   */
  private async renderEmpty() {
    const [wrapper] = html`
      <div class="px-3 py-1 text-stone-500">No results</div>
    `;
    this.appendChild(wrapper);
  }

  /**
   * Renders the add new tag option.
   * A part of the `render()` function
   */
  private async renderAddNewTag(query: string) {
    if (query === "") {
      return;
    }
    const [wrapper] = html`
      <button
        type="button"
        class="${this.selectedIndex === 1
          ? "bg-stone-300 rounded"
          : ""} px-2 py-1 text-start hover:bg-stone-200"
        data-tag="${query}"
      >
        <span class="text-sm text-stone-500">New tag</span>
        <neote-tag name="${query}"></neote-tag>
      </button>
    `;
    this.appendChild(wrapper);
  }

  /**
   * The list of found tags
   * It needs the selectedIndex provided and can't use the component state
   * because it does not know whether the option to add a new is also being rendered
   */
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
                  ? "bg-stone-300 rounded"
                  : ""} px-2 py-1 text-start hover:bg-stone-200"
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
