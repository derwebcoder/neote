import { EditorMain } from "@/components/EditorMain/EditorMain";
import type { Meta, StoryObj } from "@storybook/react";
import "@/modules/editor";
import "@/modules/tags";
import { TagDB, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/EditorMain",
  component: EditorMain,
  decorators: [
    (Story) => (
      <div className="h-60 w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof EditorMain>;

export default meta;
type Story = StoryObj<typeof meta>;

const db = new TagDB();
const tagService = await TagService.construct(db);
DI.inject("TagService", tagService);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
