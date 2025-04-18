import type { Meta, StoryObj } from "@storybook/react";
import { TagDB, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";
import { useEffect } from "react";
import { TagStyle } from "@/modules/tags/config/TagStyleConfig";

const Wrapper = ({
  style = "basic",
  name,
}: {
  style?: TagStyle;
  name: string;
}) => {
  useEffect(() => {
    (async () => {
      const db = new TagDB();
      const tagService = await TagService.construct(db);
      DI.inject("TagService", tagService);
    })();
  }, []);

  return (
    <div data-tag-style={style}>
      <neote-tag name={name}></neote-tag>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Tags/Tag",
  component: Wrapper,
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
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    name: "my-tag",
  },
};

export const ChipLight: Story = {
  args: {
    name: "my-tag",
    style: "chip-light",
  },
};

export const ChipDark: Story = {
  args: {
    name: "my-tag",
    style: "chip-dark",
  },
};

export const ChipBorder: Story = {
  args: {
    name: "my-tag",
    style: "chip-border",
  },
};

export const ChipIconLight: Story = {
  args: {
    name: "my-tag",
    style: "chip-icon-light",
  },
};

export const ChipIconDark: Story = {
  args: {
    name: "my-tag",
    style: "chip-icon-dark",
  },
};

export const Neon: Story = {
  args: {
    name: "my-tag",
    style: "neon",
  },
};

export const TokenGradientLight: Story = {
  args: {
    name: "my-tag",
    style: "token-gradient-light",
  },
};

export const TokenGradientDark: Story = {
  args: {
    name: "my-tag",
    style: "token-gradient-dark",
  },
};
