import "./NeoteEditor.css";
import { Editor } from "@tiptap/core";
import { getBaseExtensions } from "../extensions/Base";

/**
 * A custom element displaying a rich text editor using TipTap internally.
 *
 * @element neote-editor
 * @attr {string} content The initial content
 * @attr {string} placeholder The placeholder text if not content exists
 * @attr {'enabled' | 'disabled' | 'selectonly'} extension-tag The mode for the tag extension}
 * @method setContent Update the content of the editor
 */
export class NeoteEditor extends HTMLElement {
  static observedAttributes = ["content"];
  private editor?: Editor;

  constructor() {
    super();
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
    this.editor = new Editor({
      element: this,
      extensions: [
        ...getBaseExtensions(this.getAttribute("placeholder") || ""),
      ],
      content: this.getAttribute("content"),
    });
  }
}

customElements.define("neote-editor", NeoteEditor);
