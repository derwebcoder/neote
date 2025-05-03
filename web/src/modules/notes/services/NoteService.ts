import { NoteDB } from "@/modules/notes/db/NoteDB";
import { Note, NoteBasic } from "@/modules/notes/models/Note";

/**
 * A service for CRUD operations on notes.
 *
 * Basically a wrapper around the database
 */
export class NoteService {
  private db: NoteDB;
  private cachedNotes: Note[] = [];

  constructor(noteDB: NoteDB) {
    this.db = noteDB;
    this.initializeCache();
  }

  private async initializeCache() {
    const allNotes = await this.getAll();
    this.cachedNotes = allNotes;

    this.watch((change) => {
      if (!change.doc) {
        console.error("No document found in change:", change);
        return;
      }
      if (change.deleted) {
        this.cachedNotes = this.cachedNotes.filter(
          (note) => note.getId() !== change.id,
        );
      } else {
        const updatedNote = this.createNoteFromDoc(change.doc);
        const existingIndex = this.cachedNotes.findIndex(
          (note) => note.getId() === change.id,
        );
        if (existingIndex !== -1) {
          this.cachedNotes[existingIndex] = updatedNote;
        } else {
          // we want to add new notes to the beginning of the array
          // so that the most recent notes are at the top
          this.cachedNotes.unshift(updatedNote);
        }
      }
      // we need to mutate the array to trigger reactivity
      this.cachedNotes = [...this.cachedNotes];
    });
  }

  public async get(id: string) {
    const noteDoc = await this.db.get(id);
    if (!noteDoc) {
      console.error("No document found for id:", id);
      return null; // or handle the error as needed
    }
    return this.createNoteFromDoc(noteDoc);
  }

  public async create(note: NoteBasic) {
    try {
      await this.db.create(note);
      return new Note(
        note.dateCreated.toJSON(),
        note.html,
        note.text,
        note.dateCreated,
        note.tags,
        note.contextTags,
      );
    } catch (e) {
      console.error(e);
    }
  }

  public async update(note: Note) {
    try {
      const noteBasic = {
        html: note.getHtml(),
        text: note.getText(),
        dateCreated: note.getDateCreated(),
        tags: note.getTags(),
        contextTags: note.getContextTags(),
      };
      await this.db.update(noteBasic);
      return note;
    } catch (e) {
      console.error(e);
    }
  }

  public async delete(note: Note) {
    try {
      const result = await this.db.delete(note.getId());
      return result.ok;
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  public async getAll() {
    const allNotes = await this.db.getAll();
    return allNotes.rows
      .map((noteDoc) =>
        noteDoc.doc ? this.createNoteFromDoc(noteDoc.doc) : null,
      )
      .filter((note) => note !== null);
  }

  public getAllSync() {
    return this.cachedNotes;
  }

  public watch(
    callback: (change: PouchDB.Core.ChangesResponseChange<NoteBasic>) => void,
  ) {
    return this.db.watch(callback);
  }

  public async xxxBEWARE__destroy() {
    await this.db.xxxBEWARE__destroy();
  }

  private createNoteFromDoc(noteDoc: NoteBasic & PouchDB.Core.IdMeta) {
    return new Note(
      noteDoc._id,
      noteDoc.html,
      noteDoc.text,
      new Date(noteDoc.dateCreated),
      noteDoc.tags,
      noteDoc.contextTags,
    );
  }
}
