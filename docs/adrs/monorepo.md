[[All Docs](../index.md)]

# Monorepo

When setting up this repository, I opted early on to use a monorepo structure utilizing npm workspaces for better separation of concerns.
After a few weeks and after adding the different packages and apps, I came to the conclusion that this wasn't a good idea. More below.

Glossary:
- "repository" - The git repository
- "package" - a folder containing it's own setup, at least a package.json file in it's root

## The different options

### One repository, minimal separation

This means I have one git repository and best case only one package.json at the root level but no sub folder with their own packages. This requires all code to share the same setup.

#### Pros

- One overall setup to run the full app or parts of it.
- Only one configuration file to maintain.
-

#### Cons

- Incompabilities between packages can be tricky. For example upgrading one third party dependency that requires a newer version of React would not work if I have dependencies that still require an older version.
- It's way too easy to mess up the code structure, creating ambiguous files / functions
- The package can become huge, less overview
- It might not be always possible to have just one package, because different third party dependencies require different configs / TS setups

#### Discussion

This is probably the standard approach and has worked well enough in the past. If absolutely necessary it would still be possible to create separate packages later on, but this should be kept to a minimum (only if the build setup requires it).
For separation of concern a solution could be to recreate a "package" folder structure inside this one package and have a convention to also only every import from the index file from these folders. This could be further improved by making use of import aliase and possibly writing custom eslint rules.

### One repository, full separation

In this setup I have one git repository, but multiple folders containing their own package.
Full separation meaning I use the npm workspace feature and create separate packages for each feature that I think justifies it's own standalone existence.

#### Pros

- It's really clean. I know exactly where I have to look for specific code / files.
- It's easier to name things, because they are only valid in their packages scope.
- I'm forced to clearly think about the API of the packages / features because I need to expose them explicitly. I would argue that this indirectly supports a cleaner API architecture.

#### Cons

- It's extra work to verify that a change down the dependency stream is not breaking something in the apps. I have to run both the package and the app processes to make sure everything is fine.
- Incompabilities between projects can be a pain. This was especially painful with the electron forge setup and using the web app. The electron forge template is using an older TS setup, that caused some headaches. Figuring out a module and moduleResolution config that works for both apps was just pain.
- It's extra work (though relatively minimal) to set up the package config, including which files to export in package.json and importing / re-exporting everything in the index file(s)
- Some package exports are more complicated than others. For example exporting the CSS of the config/theme package. It's working but intellisense is not. Or the `export * from '...'` in the packages/types package index.ts file are not working and I have yet to figure out why...
- HMR is not working or has a worse experience, because per default vite only scans the current package (where it's vite config file is located) for changes. But if it has a dependency on another package, it's not automatically reloading when the dependency changes. There are hacks to fix this, like with `server: { watch: { ignored: ["!**/node_modules/@neote/**"] } }`, but this is then watching too many files and for some reason takes longer.
- I've sometimes encountered intellisense issues when trying to use something from another package
- All configs (especially TS and Vite, but also vitest, eslint, etc.) should be consistent across all packages. I should set up a global config for each of these that I import in every package, but didn't yet come to that. Sometimes workspace support for these tools is still limited or in an early development phase, which results in errors in VS code or warnings.
- The overhead of keeping all external dependencies on the same version is just causing work. Yarn or pnpm would offer some tooling to make this less painfull, but then some external dependencies don't support them with a workspace setup (don't remember which right now)
- Just figuring out the first time how a tool should be set up in a workspace is a lot of work as there is usually not much documentation
- Some required configurations are not workspace compatible. For example shadcn [requires an import alias `@`](https://ui.shadcn.com/docs/installation/vite). But this only works in it's own package. If I apply the same alias in another package that is using the shadcn components, they would point to this packages `/src` folder, and not the one from the `packages/ui` folder, unless I hardcode the long path of this exact package folder in the config of another package ... which is theoretically against the idea of having separation between the packages.

#### Discussion

Some of the cons could be solved if we would actually build each package and use it's build source as imports in other packages. But this would require to run a build process for every change, which would make the workspace setup just more complex. And I'm jumping a lot between the different projects, so this really does not feel like a feasible solution.

All in all I have the feeling this setup does not scale well, is just unnecessarily complex and required me spending more time on it then just implementing cool stuff.

### Separate repositories / Separate packages

This could mean:

- A new git repository for each package
- Git submodules for each package
- One git repository and several folders with their own package but without the npm workspaces feature

#### Pros

Same as for "One repository, full separation"

#### Cons

Same as for "One repository, full separation" but with addition of:

- The setup is even more complex, because I would need to actually publish (at least locally) each package
- In a "One repository, full separation" setup I could theoretically make a really quick change just to verify a hypothesis, but in this setup it would require more work, because I would need to make these changes explicit and run the full pipeline

#### Discussion

I don't see any benefit at all compared to "One repository, full separation". I think this is a valid use case when a package is really a standalone thing and should really be distributed / published. But this won't be the case for this project.