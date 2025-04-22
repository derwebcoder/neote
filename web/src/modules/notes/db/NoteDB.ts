import { NoteBasic, NoteDocument } from "@/modules/notes/models/Note";
import PouchDB from "pouchdb-browser";

export class NoteDB {
  private db;

  constructor(
    options?: PouchDB.Configuration.DatabaseConfiguration,
    dbSuffix: string = "",
  ) {
    this.db = new PouchDB<NoteDocument>(`notes${dbSuffix}`, options);
  }

  public async get(id: string) {
    return this.db.get(id);
  }

  public async getAll() {
    return this.db.allDocs({ include_docs: true });
  }

  public async create(note: NoteBasic) {
    return await this.db.put({
      _id: note.dateCreated.toJSON(),
      ...note,
    });
  }

  public async update(note: NoteBasic) {
    const id = note.dateCreated.toJSON();
    const currentNote = await this.db.get(id);
    const updatedNote = {
      ...currentNote,
      ...note,
      _rev: currentNote._rev,
    };
    return this.db.put(updatedNote);
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
    callback: (change: PouchDB.Core.ChangesResponseChange<NoteBasic>) => void,
  ) {
    this.db
      .changes({ live: true, since: "now", include_docs: true })
      .on("change", callback);
  }

  public async xxxBEWARE__destroy() {
    await this.db.destroy();
  }
}
