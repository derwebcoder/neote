import { mergeAttributes } from "@tiptap/core";
import { MentionOptions } from "@tiptap/extension-mention";

export const renderHTML: MentionOptions["renderHTML"] = ({ options, node }) => {
  const name = node.attrs.id ?? node.attrs.label ?? options.HTMLAttributes.name;
  return [
    "neote-tag",
    mergeAttributes(options.HTMLAttributes, {
      name,
    }),
    "",
  ];
};
