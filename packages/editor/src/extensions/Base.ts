import { AnyExtension, InputRule, textblockTypeInputRule } from "@tiptap/core";
import ListKeymap from "@tiptap/extension-list-keymap";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";

export const getBaseExtensions = (placeholder: string): AnyExtension[] => {
  return [
    StarterKit.configure({
      // we need to extend the Heading extension to update the input rules for it to work
      // together with the Tags extension, which also uses '#' as a char.
      // like here: https://github.com/ueberdosis/tiptap/issues/632#issuecomment-600536493
      // you can find the extended heading below.
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
    Heading.extend({
      addInputRules() {
        const rules: InputRule[] = [];
        for (let level = 1; level < 7; level++) {
          rules.push(
            textblockTypeInputRule({
              // different to the original Header regex, we want to allow only a space character and not any space character \s.
              // with this change this logic works with the Tags extension, which originally also triggered the heading
              // rules when pressing enter to select a tag.
              find: new RegExp(`^(#{${level}}) $`),
              type: this.type,
              getAttributes: {
                level: 1,
              },
            }),
          );
        }
        return rules;
      },
    }),
  ];
};
