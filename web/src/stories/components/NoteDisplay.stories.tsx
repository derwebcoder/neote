import type { Meta, StoryObj } from "@storybook/react";
import { NoteDisplay } from "@/components/NoteDisplay/NoteDisplay";
import { Note } from "@/modules/notes/models/Note";
import { NoteDB } from "@/modules/notes/db/NoteDB";
import { NoteService } from "@/modules/notes/services/NoteService";
import { DI } from "@/modules/dependency-injection";
import { TagDB, TagService } from "@/modules/tags";
import { defineNeoteTag } from "@/modules/tags";

defineNeoteTag()

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/NoteDisplay",
  component: NoteDisplay,
  decorators: [
    (Story) => (
      <div className="h-60 w-full">
        <Story />
      </div>
    ),
  ],
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
} satisfies Meta<typeof NoteDisplay>;

const noteDB = new NoteDB();
const noteService = new NoteService(noteDB);
DI.inject("NoteService", noteService);
const tagDB = new TagDB();
const tagService = await TagService.construct(tagDB);
DI.inject("TagService", tagService);

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    note: new Note(
      "1",
      "<neote-tag name='nature' data-context-tag=''></neote-tag> <neote-tag name='tree' data-context-tag=''></neote-tag> The tree in front of our <neote-tag name='house'></neote-tag> is beautiful.",
      "Test",
      new Date(),
      ["nature", "tree", "house"],
      ["nature", "tree"],
    ),
  },
};
