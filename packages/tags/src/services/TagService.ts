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
  private watcher: Record<string, Array<(tag: Tag) => void>> = {};

  constructor() {
    this.db = new TagDB();

    this.hydrateCache();

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
        tag.name,
        {
          description: tag.description,
          icon: tag.icon,
          hue: tag.hue,
        },
      ] as const;
      if (tag.state === "draft") {
        await this.db.create(...params);
      } else {
        await this.db.update(...params);
      }
      tag.state = "stored";
      this.cache.set(tag.name, tag);
      this.publish(tag);
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

  public observe(name: string, callback: (tag: Tag) => void) {
    this.watcher[name] = this.watcher[name] || [];
    this.watcher[name].push(callback);

    return () => {
      this.watcher[name] = this.watcher[name].filter((cb) => cb !== callback);
    };
  }

  private publish(tag: Tag) {
    if (this.watcher[tag.name]) {
      this.watcher[tag.name].forEach((callback) => {
        callback(tag);
      });
    }
  }

  private async hydrateCache() {
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
    console.log("hydrated");
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
