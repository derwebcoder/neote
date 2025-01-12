import { NodeConfig } from "@tiptap/core";

export const addAttributes: NodeConfig["addAttributes"] = () => {
  return {
    name: {
      // Set the color attribute according to the value of the `data-color` attribute
      parseHTML: (element) => element.getAttribute("name"),
    },
  };
};
