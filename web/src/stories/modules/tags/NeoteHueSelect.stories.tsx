import { HueSelectAttributes } from "@/modules/tags/components/NeoteHueSelect";
import "@/modules/tags/components/NeoteHueSelect";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const Wrapper = ({ hue, "onhue-select": onHueSelect }: HueSelectAttributes) => {
  return (
    <neote-hue-select
      hue={hue}
      style={{ width: "75px" }}
      onhue-select={onHueSelect}
    ></neote-hue-select>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Tags/NeoteHueSelect",
  component: Wrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [""],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: { hue: { control: { type: "range", min: 0, max: 360 } } },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { "onhue-select": fn() },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};
