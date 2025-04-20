import { DI } from "@/modules/dependency-injection";
import { TagDB, TagService } from "@/modules/tags";
import { NeoteTagStyleSelectAttributes } from "@/modules/tags/components/NeoteTagStyleSelection";
import "@/modules/tags/components/NeoteTagStyleSelection";
import { TagStyles } from "@/modules/tags/config/TagStyleConfig";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect } from "react";

const Wrapper = ({
  value,
  "preview-class": previewClass,
  "preview-style": previewStyle,
  "wrapper-class": wrapperClass,
  "wrapper-style": wrapperStyle,
  "style-select": onStyleSelect,
}: NeoteTagStyleSelectAttributes) => {
  // just for this story, don't do this in a react component!
  useEffect(() => {
    (async () => {
      const db = new TagDB();
      const tagService = await TagService.construct(db);
      DI.inject("TagService", tagService);
    })();
  }, []);

  return (
    <div>
      <neote-tag-style-select
        value={value}
        onstyle-select={onStyleSelect}
        preview-class={previewClass}
        preview-style={previewStyle}
        wrapper-class={wrapperClass}
        wrapper-style={wrapperStyle}
      ></neote-tag-style-select>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Tags/NeoteTagStyleSelect",
  component: Wrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [""],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: { control: "select", options: TagStyles },
    "preview-class": { control: "text" },
    "preview-style": { control: "text" },
    "wrapper-class": { control: "text" },
    "wrapper-style": { control: "text" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { "style-select": fn() },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: "chip-border",
    "preview-class": "p-4 m-4 bg-gray-100 user-content",
    "preview-style": "max-width: 500px; border-radius: 8px;",
    "wrapper-class": "",
    "wrapper-style": "",
  },
};
