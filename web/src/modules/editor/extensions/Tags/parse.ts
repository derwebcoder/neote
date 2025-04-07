import { NodeConfig } from "@tiptap/core";

export const parseHTML: NodeConfig["parseHTML"] = () => {
  return [
    {
      tag: "neote-tag",
    },
  ];
};
