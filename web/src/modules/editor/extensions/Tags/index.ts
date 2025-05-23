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

/*

  see also the documentation in
  /docs/tiptap_custom_extensions.md

*/
export const getTagExtension = (options?: {
  selectOnly: boolean;
}): AnyExtension => {
  const { selectOnly } = options ?? { selectOnly: false };
  return Mention.extend({
    name: "tags",
    parseHTML,
    addAttributes,
  }).configure({
    renderHTML,
    suggestion: {
      char: "#",
      // see https://github.com/ueberdosis/tiptap/issues/2219
      pluginKey: new PluginKey("tags"),
      render: getSuggestionRender(selectOnly),
    },
  } satisfies Partial<MentionOptions<unknown, MentionNodeAttrs>>);
};
