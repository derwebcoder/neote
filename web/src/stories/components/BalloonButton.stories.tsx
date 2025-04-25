import type { Meta, StoryObj } from "@storybook/react";
import { BalloonButton } from "@/components/BalloonButton/BalloonButton";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/BalloonButton",
  component: BalloonButton,
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
  args: {
    onClick: () => {
      window.setTimeout(() => {
        window.localStorage.removeItem("balloon");
        window.dispatchEvent(
          new StorageEvent("local-storage", { key: "balloon" }),
        );
      }, 3000);
      fn();
    },
  },
} satisfies Meta<typeof BalloonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Muted: Story = {
  args: {
    mute: true,
  },
};
