import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagDB, TagService } from "@/modules/tags";
import { TagIconSelect } from "@/modules/tags/components/TagIconSelect/TagIconSelect";
import { DI } from "@/modules/dependency-injection";

const tagDB = new TagDB({}, '-story-TagIconSelect');
const tagService = await TagService.construct(tagDB);
DI.inject("TagService", tagService);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Tags/TagIconSelect",
  component: TagIconSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof TagIconSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    tag: new Tag("my-tag", "My Tag", "bookmark", 0),
  },
};