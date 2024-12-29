import PouchDB from "pouchdb-browser";
import { TagBasic, TagExistingDocument } from "../models/Tag";

export class TagDB {
  private db = new PouchDB<TagExistingDocument>("tags");

  constructor() {}

  public async get(name: string) {
    return this.db.get(name);
  }

  public async getAll() {
    return this.db.allDocs({ include_docs: true });
  }

  public async update(id: string, tag: TagBasic) {
    const currentTag = await this.db.get(id);
    const updatedTag = {
      ...currentTag,
      ...tag,
      _rev: currentTag._rev,
    };
    return this.db.put(updatedTag);
  }

  public async delete(id: string) {
    const currentTag = await this.db.get(id);
    const updatedTag = {
      ...currentTag,
      _deleted: true,
    };
    return this.db.put(updatedTag);
  }

  public async watch(
    callback: (
      change: PouchDB.Core.ChangesResponseChange<TagExistingDocument>,
    ) => void,
  ) {
    this.db
      .changes({ live: true, since: "now", include_docs: true })
      .on("change", callback);
  }
}
