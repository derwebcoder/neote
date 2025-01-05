import Mention from "@tiptap/extension-mention";
import { renderHTML } from "./render";
import { TagService } from "@neote/tags";
import { PluginKey } from "@tiptap/pm/state";

export const getTagExtension = (
  tagService: TagService,
  { selectOnly }: { selectOnly: boolean },
) => {
  return Mention.extend({
    name: "tags",
  }).configure({
    renderHTML,
    suggestion: {
      char: "#",
      // see https://github.com/ueberdosis/tiptap/issues/2219
      pluginKey: new PluginKey("tags"),
      items: async ({ query }) => {
        return await tagService.find(query.toLowerCase(), 15);
      },
    },
  });
};
