import { NodeConfig } from "@tiptap/core";

export const addAttributes: NodeConfig["addAttributes"] = () => {
  return {
    name: {
      default: null,
      parseHTML: (element) => element.getAttribute("name"),
      renderHTML: (attributes) => {
        if (!attributes.name) {
          return {};
        }

        return {
          name: attributes.name,
        };
      },
    },
  };
};
