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
    const nextIndex =
      (this.selectedIndex + this.items.length - 1) % this.items.length;
    this.selectedIndex = nextIndex;
    this.scrollToView(nextIndex);
    this.render();
  }

  private downHandler() {
    const nextIndex = (this.selectedIndex + 1) % this.items.length;
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
      itemElement?.dispatchEvent(new Event("click"));
      event.preventDefault();
      event.stopPropagation();
      return true;
    }

    return false;
  }

  private dispatchSelect(e: KeyboardEvent | MouseEvent) {
    const tag = (e.currentTarget as HTMLElement).getAttribute("data-tag");
    if (!tag) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<TagSelectEventDetail>("tag-select", {
        bubbles: true,
        detail: { tag },
      }),
    );
  }

  private async update() {
    const tagService = this.tagService;
    if (!tagService) {
      return;
    }
    const query = this.getAttribute("query")?.toLowerCase().trim() ?? "";
    this.items = await tagService.find(query, 15);
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

    if (selectOnly) {
      if (this.items.length <= 0) {
        return this.renderEmpty();
      }
    } else {
      const isExactMatch = this.items[0]?.getName() === query;
      if (!selectOnly && !isExactMatch) {
        this.renderAddNewTag(query);
      }
    }

    this.renderTags(this.items);
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
          .map((tag, index) =>
            rawHtml(html`
              <button
                type="button"
                data-tag="${tag.getName()}"
                class="${index + 1 === this.selectedIndex
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
    wrapper.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", this.dispatchSelect);
    });
    this.append(...wrapper.children);
  }
}

customElements.define("neote-tag-suggestions", NeoteTagSuggestions);
