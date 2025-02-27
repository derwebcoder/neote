[[All Docs](../index.md)]

# Routing library

A routing library is a base library for any web project. It defines the overall structure of the app.

## Options and pros + cons

- React Router (v7, successor of Remix)
  - Pros
    - Close to web standards
    - Has a library mode
    - Exists for the longest time and backed up by Shopify
  - Cons
    - For electron it is recommended to use a memory or hash router. While react router does have one, it is not mentioned in the official documentation anymore since v7. Not sure if I can trust into it's further development.
    - Not all features supported in library mode
- NextJS
  - Pros
    - Basic experience with it so far
  - Cons
    - Too complex for this project, focusses heavily on server side
- Astro
  - Pros
    - I built sparktag based on astro, so I have already experience with it
    - Simple to use
  - Cons
    - Based on my experience with sparktag, I cannot use 90% of the features of astro for this project anyways
- Tanstack Router
  - Pros
    - This package is relatively new but Tanstack has been around for a while
    - Library mode with extensive feature set
    - Memory and hash router built in and documented
  - Cons
    - No experience with it so far


## Decision

I will use Tanstack Router. It seems to be the most promising and well-documented routing option so far.
And should I have the need to expand, Tanstack also offers other libraries and also a full framework Tanstack Start (which is currently in beta).