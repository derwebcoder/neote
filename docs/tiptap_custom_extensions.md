[[All docs](./index.md)]

# Custom Tiptap Extensions

General documentation how to create custom extensions in the [Tiptap Docs](https://tiptap.dev/docs/editor/extensions/custom-extensions).

## The Tags Extension

This extension allows the search, selection or creation of a tag in the editor. When triggered by entering `#`, it shows a preview list of tags which match the current search. It inlines a `<neote-tag>`.

This is a extended version of the [Mention](https://tiptap.dev/docs/editor/extensions/nodes/mention) extension.

### Rendering / Parsing

The extension inlines a regular `<neote-tag>` element and adds/reads the `name=""` attribute.

Parsing is [based only on the tag name](../src/extensions/Tags/parse.ts).

Internally it stores the tag name in a `name` attribute. This is [parsed and rendered](../src/extensions/Tags/attributes.ts) based on the `name=""` attribute.

Based on the internal `name` attribute it [renders the full](../src/extensions/Tags/render.ts) `<neote-tag name="">` element.

### Suggestions

The [Mention](https://tiptap.dev/docs/editor/extensions/nodes/mention) extension allows configuring the logic of the suggestion popup.

#### Rendering

The visual part of the suggestions is [encapsulated in `<neote-tag-suggestions>`](../src/components/NeoteTagSuggestions.ts). This component receives a `query=""` attribute. Based on this it will search for matching tags in a `TagService`.

If `select-only=""` is not set, the `query` will also be used to show an option to add this tag.

The `<neote-tag-suggestions>` element is rendered in the `onStart` hook of the [`render` callback of the suggestion config](../src/extensions/Tags/suggestionsRender.ts). The positioning relative to the user input is based on [`computePosition` from `@floating-ui`](https://floating-ui.com/docs/computePosition)

#### User Interaction

The user can interact with the suggestions in the following ways:

- enter text to narrow down the suggestions (in the editor)
  - this triggers the `onUpdate` hook in [the render callback of the suggestion configuration](../src/extensions/Tags/suggestionsRender.ts), which updates the `query` attribute of the component and repositions the component
- use the mouse to select a tag
  - this will trigger the event handle in [`handleSelect` of the component](../src/components/NeoteTagSuggestions.ts)
- use the keyboard to navigate between the options in the suggestion dropdown
  - this will trigger the `onKeyDown` hook in [the render callback of the suggestion configuration](../src/extensions/Tags/suggestionsRender.ts), which will call the [`onExternalKeyDown` handler of the component](../src/components/NeoteTagSuggestions.ts) to update the state
- use the keyboard 'Enter' key to select an option
  - this will trigger the `onKeyDown` hook in [the render callback of the suggestion configuration](../src/extensions/Tags/suggestionsRender.ts), which will call the [`onExternalKeyDown` handler of the component](../src/components/NeoteTagSuggestions.ts) to trigger a selection event, which will be handled by the event listener in [the `onStart` hook of the render callback of the suggestion configuration](../src/extensions/Tags/suggestionsRender.ts), which will call the original Mentions `command` callback with the selected name.

## Learnings

- The Mentions `command` function receives the attribute values defined in the `addAttributes` config. Originally it uses the `id` attribute. But in our case we only use `name`.
- The Mention extension has a `items()` attribute which would theoretically do the querying based on the query and return the matching items. But in our case with a web component we cannot provide a list of objects as attributes. While we could also call a callback on the component (like `onExternalKeyDown`), we opted to directly provide the `query` to the component and let it handle the querying.
- Using the `#` char together with the official `Headings` extension is a bit tricky. We must make sure that the Tags extension does not handle a `Space` keyboard event to select a tag. And we need to [update the input rules of the `Headings` extension](../src//extensions//Base.ts) to only allow a `Space` and not a line-break (which apparently will be temporary added by the Mention extension when selecting a tag)