import "./NeoteEditor.css";
import { AnyExtension, Editor, Extension } from "@tiptap/core";
import { getBaseExtensions } from "../extensions/Base";
import { getTagExtension } from "../extensions/Tags";
import { CustomElement } from "@/modules/types";
import { HTMLString } from "@/modules/notes/models/HTML";

type EditorSubmitEventDetail = { content: HTMLString };
export type EditorSubmitEvent = CustomEventInit<EditorSubmitEventDetail>;

type EditorEscapeEventDetail = object;
export type EditorEscapeEvent = CustomEventInit<EditorEscapeEventDetail>;

export interface NeoteEditorAttributes {
  content?: string;
  placeholder?: string;
  "extension-tag"?: "enabled" | "disabled" | "selectonly";
  "oneditor-submit"?: (event: EditorSubmitEvent) => void;
  "oneditor-escape"?: (event: EditorEscapeEvent) => void;
}

/**
 * A custom element displaying a rich text editor using TipTap internally.
 *
 * @element neote-editor
 * @attr {string} content The initial content
 * @attr {string} placeholder The placeholder text if not content exists
 * @attr {'enabled' | 'disabled' | 'selectonly'} extension-tag The mode for the tag extension}
 * @method setContent Update the content of the editor
 */
export class NeoteEditor extends HTMLElement implements NeoteEditorAttributes {
  static observedAttributes = ["content"];
  private editor?: Editor;
  private _content: string = "";
  private _placeholder: string = "";
  private _extensionTag: "enabled" | "disabled" | "selectonly" = "disabled";

  constructor() {
    super();
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
    this.setAttribute("content", this._content);
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value;
    this.setAttribute("placeholder", this._placeholder);
  }

  get extensionTag() {
    return this._extensionTag;
  }

  set extensionTag(value) {
    this._extensionTag = value;
    this.setAttribute("extension-tag", this._extensionTag);
  }

  focusEditor() {
    this.editor?.commands.focus();
  }

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.editor?.destroy();
  }

  adoptedCallback() {
    this.init();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "content" && oldValue !== newValue) {
      this.setContent(newValue);
    }
  }

  public async setContent(content: string) {
    this.editor?.commands.setContent(content, true, {
      preserveWhitespace: true,
    });
  }

  private init() {
    this.innerHTML = "";
    const extensionTagMode = this.getAttribute("extension-tag") ?? "disabled";
    let extensionTag: AnyExtension | null = null;

    if (extensionTagMode !== "disabled") {
      try {
        extensionTag = getTagExtension({
          selectOnly: extensionTagMode === "selectonly",
        });
      } catch (e) {
        console.error("Initiated Editor but TagService was not available.", e);
      }
    }

    this.editor = new Editor({
      element: this,
      extensions: [
        ...getBaseExtensions(this.getAttribute("placeholder") || ""),
        extensionTag,
      ].filter(Boolean) as Extension[],
      content: this.getAttribute("content"),
      editorProps: {
        attributes: {
          role: "textbox",
          class: `user-content`,
        },
        handleKeyDown: (_view, event) => {
          // if (isUserSelectingTag || isUserSelectingExtension) {
          //   // user currently has the selection open and might have pressed enter to select an item
          //   return false;
          // }
          if (event.key === "Escape") {
            this.dispatchEvent(
              new CustomEvent<EditorEscapeEventDetail>("editor-escape", {
                bubbles: true,
                detail: {},
              }),
            );
            return;
          }

          // Only submit on Enter + CMD (macOS) or Enter + Ctrl (Windows/Linux)
          if (!(event.key === "Enter" && (event.metaKey || event.ctrlKey))) {
            return false;
          }

          const html = this.editor?.getHTML().trim() ?? "";
          if (html === "") {
            return false;
          }
          this.dispatchEvent(
            new CustomEvent<EditorSubmitEventDetail>("editor-submit", {
              bubbles: true,
              detail: { content: html },
            }),
          );
          return true;
        },
      },
    });
  }
}

customElements.define("neote-editor", NeoteEditor);

export const defineNeoteEditor = (customWindow: Window = window) => {
  if (customWindow.customElements.get("neote-editor")) {
    return;
  }
  console.log('register')
  customWindow.customElements.define("neote-editor", NeoteEditor);
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "neote-editor": CustomElement<NeoteEditor, NeoteEditorAttributes>;
    }
  }
}
