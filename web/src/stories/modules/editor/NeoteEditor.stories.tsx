import type { Meta, StoryObj } from "@storybook/react";
import { TagDB, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";
import { useEffect } from "react";
import "@/modules/editor";
import "@/modules/tags/components/NeoteTag";
import { TagStyle } from "@/modules/tags/config/TagStyleConfig";
import { NeoteEditorAttributes } from "@/modules/editor/components/NeoteEditor";

const Wrapper = ({
  style = "chip-border",
  content,
  placeholder,
  "extension-tag": extensionTag,
}: {
  style?: TagStyle;
} & NeoteEditorAttributes) => {
  // just for this story, don't do this in a react component!
  useEffect(() => {
    (async () => {
      const db = new TagDB();
      const tagService = await TagService.construct(db);
      DI.inject("TagService", tagService);
    })();
  }, []);

  return (
    <div data-tag-style={style} className="user-content">
      <neote-editor
        content={content}
        placeholder={placeholder}
        extension-tag={extensionTag}
      ></neote-editor>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Editor/NeoteEditor",
  component: Wrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    content: { control: "text" },
    placeholder: { control: "text" },
    "extension-tag": {
      control: "select",
      options: ["enabled", "disabled", "selectonly"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    content:
      "<h1>This is a basic example</h1><p>Happy to see <strong>you</strong>!</p><h2>This is a second level heading</h2><p>And this is a paragraph</p><ul><li>List item 1</li><li>List item 2</li></ul>",
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Enter some text ...",
  },
};

export const WithTags: Story = {
  args: {
    content:
      "<neote-tag name='vegetables'></neote-tag> I like <neote-tag name='bananas'></neote-tag> and <neote-tag name='apples'></neote-tag>",
    "extension-tag": "enabled",
    style: "chip-border",
  },
};
