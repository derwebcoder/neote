[[All Docs](../index.md)]

# Offline First

Offline-first a.k.a. local-first has been around for a while. There are plenty solutions out there to enable local (and therefore offline) data management and syncing the local data with remote data stores. They often implement conflict resolution to allow multiple states to co-exist and eventuelly sync again.

In a first version of this app I used [Dexie.js](https://dexie.org/) to store data locally (with not intention to sync eventuelly). Based on the learnings of the first version I explored different alternatives that would meet the following requirements:

- (hard) Offline only
  - Syncing data is a feature I will think about later. In the meantime I intend to start with an offline-only approach.
- (hard) TypeScript support
  - It should support typing in an easy to use way.
- (hard) Backend flexibility
  - If it comes to it, I want to spend as less time as possible on maintaining the backend / data storage. That includes giving me flexibility to choose between different options.
- (hard) Healthy project state
  - The project should be mature and updated regularly. There should be a plan for long-term maintenance and support. I don't mind paying a fair share (for support) should I come to make money out of this project.
- (hard) Good documentation
  - The docs are easily accessible, have a good structure and are up to date.
- (soft) Full-text search
  - IndexedDB does not offer complex search queries but this feature is needed for users to make the most out of their content. There are some tricks and if the data is not that big it's still possible to go through it via JS. Though performance will decrease with more data. Alternatively I will need to look for another solution just for this purpose.
- (soft) Encryption
  - I don't even want to be able to see any user content. If (strong) encryption support is already built-in, even better. Otherwise I will need to find a way to handle this myself. Which may come as a drawback of other features (like full-text search).
- (soft) Low maintenance
  - If it comes to it, it should not require changes in the data structure / format to enable remote syncing.


This following is an overview of different solutions I found and had a look at. The evaluation is only meant for this project. It was done in January 2025 and might be outdated when you're reading this. I didn't have a thorough look through all of the tools, it was mostly done by reading through their documentation.


## Tools

### Dexie.js

[Dexie.js](https://dexie.org/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes, but a bit cumbersome
- (hard) Backend flexibility
  - No, only [DexieCloud](https://dexie.org/cloud/) support
- (hard) Healthy project state
  - Seems to be actively maintained and supports itself via its cloud service.
- (hard) Good documentation
  - Docs are messy (only alphabetically sorted), you need to know what you look for. Documentation around TS is sparse.
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Yes


### RxDB

[RxDB](https://rxdb.info/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Yes, supports a multitude of different storage options. Probably the most out of all libraries.
- (hard) Healthy project state
  - Seems to be actively maintained and supports itself via its pro libraries.
- (hard) Good documentation
  - Docs seem to be well-written. But it looks like they only scratch the surface of some storage solutions.
- (soft) Full-text search
  - Yes (paid plugin)
- (soft) Encryption
  - Yes
- (soft) Low maintenance
  - Unsure yes. Given the many options for storage solutions, this might get a bit tricky.

I feel like this is the "Egg-laying wool-milk sow" (german saying). But just to get this project off the ground, it feels to heavy (and while being upfront about paid plugins, I'm not sure what I actually need at this point). Most likely something worth to look at again in the future.

### sql.js

[sql.js](https://github.com/sql-js/sql.js/)

- (hard) Offline only
  - Yes, though memory only. Storage (even local) needs to be solved independently.
- (hard) TypeScript support
  - ?
- (hard) Backend flexibility
  - No support out of the box
- (hard) Healthy project state
  - Seems to be relatively actively maintained
- (hard) Good documentation
  - Docs seem to be okay. It's mostly SQL anyways.
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Requires own solution

### SQLite Wasm

[SQLite Wasm](https://github.com/sqlite/sqlite-wasm)

- (hard) Offline only
  - Yes, though memory only. Storage (even local) needs to be solved independently.
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - No support out of the box
- (hard) Healthy project state
  - Seems to be relatively actively maintained
- (hard) Good documentation
  - Docs seem to be not so plenty
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Requires own solution


### BlinkDB

[BlinkDB](https://github.com/blinkdb-js/blinkdb)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - No support out of the box
- (hard) Healthy project state
  - Updated ~1 year ago
- (hard) Good documentation
  - Docs seem to be okay
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Requires own solution

### PouchDB

[PouchDB](https://pouchdb.com/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Partly yes. Requires a CouchDB instance. But there are different providers or hosting my own.
- (hard) Healthy project state
  - More or less yes. There is an [initiative to move it to ASF](https://github.com/pouchdb/pouchdb/issues/8999).
- (hard) Good documentation
  - Docs are good, with helpful explanation
- (soft) Full-text search
  - No
- (soft) Encryption
  - No, but there are third-party plugins for encryption and there are some solutions to encryption in a couchdb server.
- (soft) Low maintenance
  - Should be easy

### electric

[electric](https://electric-sql.com/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Partly yes. Has its own cloud service but can also host myself (using Postgres in the background).
- (hard) Healthy project state
  - Yes, is being acticely developed. But it's not mature yet, still <1.0.0
- (hard) Good documentation
  - Docs seem to be good
- (soft) Full-text search
  - No
- (soft) Encryption
  - Yes, supports [end-to-end encryption](https://electric-sql.com/docs/guides/security).
- (soft) Low maintenance
  - Should be easy

Usage seems to be a bit more complicated. But overall very promising.


### remoteStorage

[remoteStorage](https://remotestorage.io/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - No need for me to handle this at all. Users bring their own storage.
- (hard) Healthy project state
  - Seems to be okay, some development <1 year ago. But their own(?) storage service [5apps](https://5apps.com/storage) seems to be in beta for a long time.
- (hard) Good documentation
  - Docs seem to be good
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Should be easy

I like the idea. But I fear that the UX of users bringing their own storage is not accessible enough for all users.


### Replicache

[Replicache](https://replicache.dev/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - "Bring your own backend". But pricing model for bigger commercial users.
- (hard) Healthy project state
  - Last GitHub release is almost 3 years ago. Not open source.
- (hard) Good documentation
  - Docs seem to be okay
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Not sure


### Triplit

[Triplit](https://www.triplit.dev/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Supports only its own DB. They have a cloud offering but also support self-hosting.
- (hard) Healthy project state
  - Seems to be good.
- (hard) Good documentation
  - Docs seem to be okay
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Guess so with their own DB.


### Verdant

[Verdant](https://github.com/a-type/verdant)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - NodeJS + SQL DB
- (hard) Healthy project state
  - Seems to be good.
- (hard) Good documentation
  - Docs seem to be okayish, some meta
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Own responsibility


### jazz

[jazz](https://jazz.tools/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes?
- (hard) Backend flexibility
  - Hosting my own or use their cloud
- (hard) Healthy project state
  - Seems to be good. But it's not mature yet.
- (hard) Good documentation
  - Existing docs seem to be good, but many are still marked as "coming soon"
- (soft) Full-text search
  - No
- (soft) Encryption
  - Yes
- (soft) Low maintenance
  - Requires using their backend tool


### Automerge

[Automerge](https://automerge.org/)

Mentioning this here only for completeness sake. This is more low-level.


### Evolu

[Evolu](https://www.evolu.dev/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Needs hosting a sync server or using their service
- (hard) Healthy project state
  - Seems to be okay
- (hard) Good documentation
  - Existing docs seem to be basic
- (soft) Full-text search
  - No
- (soft) Encryption
  - Yes
- (soft) Low maintenance
  - Requires hosting their sync server


### instant

[instant](https://www.instantdb.com/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Only supports their own backend
- (hard) Healthy project state
  - Seems to be good
- (hard) Good documentation
  - Existing docs seem to be good
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Yes, but restricted to their service


### TinyBase

[TinyBase](https://tinybase.org/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes
- (hard) Backend flexibility
  - Yes, supports multiple storage options
- (hard) Healthy project state
  - Seems to be good
- (hard) Good documentation
  - Existing docs seem to be good but a lot
- (soft) Full-text search
  - No
- (soft) Encryption
  - No
- (soft) Low maintenance
  - Seems to be a bit more maintenance


### Fireproof

[Fireproof](https://fireproof.storage/)

- (hard) Offline only
  - Yes
- (hard) TypeScript support
  - Yes?
- (hard) Backend flexibility
  - Yes, supports multiple storage options
- (hard) Healthy project state
  - Seems to be good but not mature yet
- (hard) Good documentation
  - Existing docs seem to be a lot of text and not so much code?
- (soft) Full-text search
  - No
- (soft) Encryption
  - End-to-End encryption
- (soft) Low maintenance
  - Seems to be a bit more complex


## Decision

In the current state of this project, [PouchDB](#pouchdb) seems to be the best option for it.
- It is mature enough and supports a mature backend
- CouchDB is known for local-first applications
- Good docs to get something off the ground

There are other solutions that are worth keeping an eye on in the future:
- Full-fledged solutions:
  - [RxDB](#rxdb): As a full-fledged solution. But to use this the project itself needs to mature first.
- With potential:
  - [electric](#electric)
  - [jazz](#jazz)
  - [Fireproof](#fireproof)
  - [TinyBase](#tinybase)
- Proprietary solutions:
  - [Triplit](#triplit)
  - [Evolu](#evolu)
  - [instant](#instant)