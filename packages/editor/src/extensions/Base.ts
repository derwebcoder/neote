import { Extension } from "@tiptap/core";
import ListKeymap from "@tiptap/extension-list-keymap";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export const getBaseExtensions = (placeholder: string): Extension[] => {
  return [
    StarterKit.configure({
      // for now disabling this as it's interfering with the "#" logic of the Mention
      // plugin when a user types "#" at the beginning of a line and presses enter.
      // There might be a solution of extending the Heading plugin and overriding the addInputRules
      // like here: https://github.com/ueberdosis/tiptap/issues/632#issuecomment-600536493
      // but I did not figure out why the Mention plugin adds a space after the # in the first place ...
      heading: false,
      bulletList: {
        HTMLAttributes: {
          class: "list-disc list-inside text-gray-800 dark:text-white",
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal list-inside text-gray-800 dark:text-white",
        },
      },
      blockquote: {
        HTMLAttributes: {
          class: "text-gray-800 sm:text-xl dark:text-white",
        },
      },
    }),
    ListKeymap,
    Placeholder.configure({
      placeholder,
      emptyNodeClass: "text-gray-400 dark:text-neutral-200",
    }),
  ];
};
