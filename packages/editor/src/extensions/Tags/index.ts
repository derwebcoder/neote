import Mention, {
  MentionNodeAttrs,
  MentionOptions,
} from "@tiptap/extension-mention";
import { renderHTML } from "./render";
import { PluginKey } from "@tiptap/pm/state";
import { AnyExtension } from "@tiptap/core";
import { parseHTML } from "./parse";
import { addAttributes } from "./attributes";
import { getSuggestionRender } from "./suggestionsRender";

export const getTagExtension = (options?: {
  selectOnly: boolean;
}): AnyExtension => {
  const { selectOnly } = options ?? { selectOnly: false };
  return Mention.extend({
    name: "tags",
    parseHTML,
    addAttributes,
    priority: 9999,
  }).configure({
    renderHTML,
    suggestion: {
      char: "#",
      // see https://github.com/ueberdosis/tiptap/issues/2219
      pluginKey: new PluginKey("tags"),
      render: getSuggestionRender(selectOnly),
      command: ({ editor, range, props }) => {
        // increase range.to by one when the next node is of type "text"
        // and starts with a space character
        const nodeAfter = editor.view.state.selection.$to.nodeAfter;
        const overrideSpace = nodeAfter?.text?.startsWith(" ");
        console.log("override space", nodeAfter);

        if (overrideSpace) {
          range.to += 1;
        }

        editor
          .chain()
          .focus()
          .insertContentAt(range, [
            {
              type: "tags",
              attrs: props,
            },
            {
              type: "text",
              text: "after",
            },
          ])
          .run();

        // get reference to `window` object from editor element, to support cross-frame JS usage
        editor.view.dom.ownerDocument.defaultView
          ?.getSelection()
          ?.collapseToEnd();
      },
    },
  } satisfies Partial<MentionOptions<unknown, MentionNodeAttrs>>);
};
