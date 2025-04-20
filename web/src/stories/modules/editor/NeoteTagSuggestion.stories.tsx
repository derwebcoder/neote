import type { Meta, StoryObj } from "@storybook/react";
import { TagDB, TagService } from "@/modules/tags";
import { DI } from "@/modules/dependency-injection";
import { useEffect, useState } from "react";
import "@/modules/editor";
import "@/modules/tags/components/NeoteTag";
import { NeoteTagSuggestionsAttributes } from "@/modules/editor/components/NeoteTagSuggestions";
import { fn } from "@storybook/test";

const Wrapper = ({
  query: queryParam,
  "select-only": selectOnly,
  "ontag-select": onTagSelect,
}: NeoteTagSuggestionsAttributes) => {
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // just for this story, don't do this in a react component!
  useEffect(() => {
    (async () => {
      const db = new TagDB();
      const tagService = await TagService.construct(db);
      tagService.update(await tagService.get("books"));
      tagService.update(await tagService.get("movies"));
      tagService.update(await tagService.get("beers"));
      tagService.update(await tagService.get("bananas"));
      DI.inject("TagService", tagService);
    })();
  }, []);

  return (
    <div data-tag-style="token-gradient-light" className="flex flex-col gap-6">
      <span className="text-sm text-gray-600">
        note: keyboard control not available in this story, works only in
        combination with the editor
      </span>
      <input
        value={query}
        type="text"
        className="border"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <neote-tag-suggestions
        query={query}
        select-only={selectOnly}
        ontag-select={onTagSelect}
      ></neote-tag-suggestions>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Modules/Editor/NeoteTagSuggestions",
  component: Wrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    query: { control: "text" },
    "select-only": { control: "boolean" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    "ontag-select": fn(),
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {},
};

export const SelectOnly: Story = {
  args: {
    "select-only": true,
  },
};
