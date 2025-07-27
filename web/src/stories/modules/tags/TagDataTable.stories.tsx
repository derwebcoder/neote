import type { Meta, StoryObj } from "@storybook/react";
import { TagDataTable } from "@/modules/tags/components/TagDataTable";
import { Tag, TagDB, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";

const tagDB = new TagDB({}, '-story-TagDataTable');
const tagService = await TagService.construct(tagDB);
DI.inject("TagService", tagService);

tagService.update(new Tag("books", "Books are my life", "bookmark", 0));
tagService.update(new Tag("ships", "Ships are my life", "hash", 150));
tagService.update(new Tag("movies", "Movies are my life", "star", 250));
tagService.update(new Tag("games", "Games are my life", "zap", 50));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Tags/TagDataTable",
  component: TagDataTable,
  decorators: [
    (Story) => (
      <div data-tag-style="token-gradient-light">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof TagDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {},
};