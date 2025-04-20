# Some troubleshooting advice

## I don't see a custom component being rendered

The custom element probably wasn't properly rendered. Make sure to import the whole file of the custom element like `import "@/modules/tags/components/NeoteHueSelect";`. If you only import a type from the file, the build process might be trying to be smart and remove the import completely.

## There is only a black dot in place of a tag (or other custom element)

The `neote-tag` custom element has not been initialized correctly. It has an indirect dependency on the TagService being available in the dependency injection tool. Make sure to initialize it first and add it to the DI. See for example the Storybook story of the tags.