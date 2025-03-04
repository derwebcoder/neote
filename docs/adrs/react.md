[[All Docs](../index.md)]

# React

## Why React and not any of the other frontend libraries / frameworks?

- It's the framework I have the most experience with
- It has the biggest community and there are many third party libraries to choose from (for example the [routing libraries](./routing_library.md))
- I like shadcn (which is only available for React), which is easy to use and customisable + it offers many useful components to get started

## Why not use Astro and be able to combine different libraries?

I've used Astro for the predecessor "Sparktag" but in the end the possibilities to combine different frontend libraries is / was limited. Because Astro only supports different frontend libraries in their .astro files. That means you cannot use a solid component inside of a react component suddenly. To really be able to use different frontend libs, you would have to make much more use of the .astro files. But these are in my experience not really made for app development and would just complicate things. Plus you have to figure out a good solution to share information / state between the different components. I've built microfrontends in the past professionally and at least back then there was not easy alround solution to this problem.

## Are you not biased because of your previous experience?

Yes, most likely. There are probably also very good (maybe even better) UI libraries, routing tools, etc. for other frontend libraries / frameworks. But it would require a lot of effort for me to get started with these and I prefer to focus on creating the actual user experience.

For fun and to learn, I've used other libs / frameworks in the past. For example I tried out Svelte but personally did not like the developer experience because of it's "magic". The compilation made it feel more like a completely new language which I had to learn. But I see how Svelte can be a big and easy to get off the grounds solution for some people and companies.

I've also used Vue + Nuxt in the past for a headless website. Though I never really got to like it. To me it felt like a lot of boilerplate, though that might be biased because of this specific project that I had to work with and that was probably not representative for other Vue + Nuxt projects.

So at least I tried some different things, but so far nothing convinced me to replace React as my favorite frontend library. Though using web components / going back to vanilla frontend development does really have it's charm, so I continue to try to build as much as possible outside of React now.