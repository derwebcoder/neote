import "./NeoteEditor.css";
import { AnyExtension, Editor, Extension } from "@tiptap/core";
import { getBaseExtensions } from "../extensions/Base";
import { getTagExtension } from "../extensions/Tags";
import { CustomElement } from "@/modules/types";

export interface NeoteEditorAttributes {
  content?: string;
  placeholder?: string;
  "extension-tag"?: "enabled" | "disabled" | "selectonly";
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

  connectedCallback() {
    this.init();
  }

  disconnectedCallback() {
    this.editor?.destroy();
  }

  adoptedCallback() {
    this.init();
  }

  // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  //   // if (name === "content" && oldValue !== newValue) {
  //   //   this.init(newValue);
  //   // }
  // }

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
      },
    });
    console.log("schema", this.editor.schema);
  }
}

customElements.define("neote-editor", NeoteEditor);

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "neote-editor": CustomElement<NeoteEditor, NeoteEditorAttributes>;
    }
  }
}
