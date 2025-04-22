import { NoteDB } from "@/modules/notes/db/NoteDB";
import { Note, NoteBasic } from "@/modules/notes/models/Note";

/**
 * A service for CRUD operations on notes.
 *
 * Basically a wrapper around the database
 */
export class NoteService {
  private db: NoteDB;

  constructor(noteDB: NoteDB) {
    this.db = noteDB;
  }

  public async get(id: string) {
    const noteDoc = await this.db.get(id);
    const note = new Note(
      noteDoc._id,
      noteDoc.html,
      noteDoc.text,
      new Date(noteDoc.dateCreated),
      noteDoc.tags,
      noteDoc.contextTags,
    );
    return note;
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
}
