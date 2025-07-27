import { matchSorter } from "match-sorter";
import { generateDefaultHue } from "../config/TagColorConfig";
import { getDefaultIcon, TagIconMap } from "../config/TagIconConfig";
import { TagDB } from "../db/TagDB";
import { Tag, TagExistingDocument } from "../models/Tag";

/**
 * A service for CRUD operations on tags.
 *
 * Basically a wrapper around the database with some caching, to allow for sync get operations.
 */
export class TagService {
  private db: TagDB;
  private cache: Map<string, Tag> = new Map();
  private tagWatcher: Record<string, Array<(tag: Tag) => void>> = {};
  private watcher: Array<(tags: Tag[]) => void> = [];

  private constructor(tagDB: TagDB) {
    this.db = tagDB;

    this.db.watch(async (change) => {
      if (change.deleted) {
        this.cache.delete(change.id);
      } else {
        // we can assert here because we set `include_docs: true` in the watch method
        const tag = this.convertDocToTag(change.doc!);
        this.cache.set(change.id, tag);
        this.publish(tag);
      }
    });
  }

  public static async construct(tagDB: TagDB) {
    const tagService = new this(tagDB);
    await tagService.hydrateCache();
    return tagService;
  }

  public getAll() {
    return [...this.cache.values()];
  }

  public get(name: string) {
    const nameCleaned = name.toLowerCase();
    if (!this.cache.has(nameCleaned)) {
      return new Tag(
        nameCleaned,
        "",
        getDefaultIcon(),
        generateDefaultHue(nameCleaned),
        "draft",
      );
    }
    return this.cache.get(nameCleaned)!;
  }

  public async update(tag: Tag) {
    try {
      const params = [
        tag.getName(),
        {
          description: tag.getDescription(),
          icon: tag.getIcon(),
          hue: tag.getHue(),
        },
      ] as const;
      if (tag.getState() === "draft") {
        await this.db.create(...params);
      } else {
        await this.db.update(...params);
      }
      tag.setState("stored");
      this.cache.set(tag.getName(), tag);
      return tag;
    } catch (e) {
      console.error(e);
    }
  }

  public async delete(name: string) {
    try {
      const result = await this.db.delete(name);
      this.cache.delete(name);
      return result.ok;
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  public observe(callback: (tags: Tag[]) => void) {
    this.watcher.push(callback);

    return () => {
      this.watcher = this.watcher.filter((cb) => cb !== callback);
    };
  }

  public observeTag(name: string, callback: (tag: Tag) => void) {
    this.tagWatcher[name] = this.tagWatcher[name] || [];
    this.tagWatcher[name].push(callback);

    return () => {
      this.tagWatcher[name] = this.tagWatcher[name].filter((cb) => cb !== callback);
    };
  }

  public async find(query: string, limit = 20) {
    const tags = [...(await this.cache.values())];
    const matches = matchSorter(tags, query, {
      keys: [
        "name",
        {
          key: "description",
          maxRanking: matchSorter.rankings.STARTS_WITH,
        },
      ],
    });
    return matches.slice(0, limit);
  }

  private publish(tag: Tag) {
    if (this.tagWatcher[tag.getName()]) {
      this.tagWatcher[tag.getName()].forEach((callback) => {
        callback(tag);
      });
    }
    this.watcher.forEach((callback) => {
      callback(this.getAll());
    });
  }

  public async hydrateCache() {
    const tags = await this.db.getAll();
    tags.rows.forEach((result) => {
      const tagDoc = result.doc;
      if (!tagDoc) {
        return;
      }
      const tag = this.convertDocToTag(tagDoc);
      this.cache.set(result.id, tag);
      this.publish(tag);
    });
    return true;
  }

  private convertDocToTag(doc: TagExistingDocument) {
    return new Tag(
      doc._id,
      doc.description,
      doc.icon as keyof typeof TagIconMap,
      doc.hue,
      "stored",
    );
  }
}
