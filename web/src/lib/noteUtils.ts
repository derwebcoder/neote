import { HTMLString } from "@/modules/notes/models/HTML";

export const noteUtils = {
  markContextTags: (html: HTMLString) => {
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = html;
    let nextTag = tmpContainer.querySelector("neote-tag");

    while (nextTag) {
      const previousSibling = nextTag.previousSibling;

      // if it has no previous sibling, it is a context tag
      if (!previousSibling) {
        nextTag.setAttribute("data-context-tag", "true");
        nextTag = tmpContainer.querySelector(
          "neote-tag:not([data-context-tag])",
        );
        continue;
      }

      // if it is a TEXT_NODE (3) and _not_ empty, it is also context tag
      if (
        previousSibling.nodeType === 3 &&
        previousSibling.textContent?.trim() === ""
      ) {
        nextTag.setAttribute("data-context-tag", "true");
        nextTag = tmpContainer.querySelector(
          "neote-tag:not([data-context-tag])",
        );
        continue;
      }

      // if it prev node is an element and it has `data-type="tag"` we return true
      if (previousSibling.nodeType === 1) {
        const previousElement = previousSibling as HTMLElement;
        if (previousElement.hasAttribute("data-context-tag")) {
          nextTag.setAttribute("data-context-tag", "true");
          nextTag = tmpContainer.querySelector(
            "neote-tag:not([data-context-tag])",
          );
          continue;
        }
      }

      break;
    }

    return tmpContainer.innerHTML;
  },

  getTagsFromHtml: (html: HTMLString) => {
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = html;
    const tags = Array.from(tmpContainer.querySelectorAll("neote-tag"));
    return tags
      .map((tag) => tag.getAttribute("name") || false)
      .filter((tag) => typeof tag !== "boolean");
  },

  getContextTagsFromHtml: (html: HTMLString) => {
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = html;
    const tags = Array.from(
      tmpContainer.querySelectorAll("neote-tag[data-context-tag]"),
    );
    return tags
      .map((tag) => tag.getAttribute("name") || false)
      .filter((tag) => typeof tag !== "boolean");
  },

  cleanTagStyles: (html: HTMLString) => {
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = html;
    const tags = Array.from(tmpContainer.querySelectorAll("neote-tag"));
    tags.forEach((tag) => tag.removeAttribute("style"));
    return tmpContainer.innerHTML;
  },

  getPlainText: (html: HTMLString) => {
    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = html;
    return tmpContainer.textContent || "";
  },
};
