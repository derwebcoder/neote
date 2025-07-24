import { noteUtils } from "$/utils/noteUtils";
import { HTMLString } from "@/modules/notes/models/HTML";

export class Note {
  constructor(
    // The id, a string of the creation date (for the date use `dateCreated`)
    private id: string,
    // The html content of the note
    private html: HTMLString,
    // The plain text content of the note, based on the html
    private text: string,
    private dateCreated: Date,
    // All tags, including the context tags
    private tags: string[],
    private contextTags: string[],
  ) { }

  public getId() {
    return this.id;
  }

  public getHtml() {
    return this.html;
  }

  public updateContent(htmlRaw: HTMLString) {
    const { html, text, tags, contextTags } =
      Note.getDataFromHtmlString(htmlRaw);
    this.html = html;
    this.text = text;
    this.tags = tags;
    this.contextTags = contextTags;
  }

  public getText() {
    return this.text;
  }

  public getDateCreated() {
    return this.dateCreated;
  }

  public getTags() {
    return this.tags;
  }

  public getContextTags() {
    return this.contextTags;
  }

  static getDataFromHtmlString(html: HTMLString) {
    const dateCreated = new Date();
    const id = dateCreated.toJSON();
    const preppedHtml = noteUtils.cleanTagStyles(
      noteUtils.markContextTags(html),
    );
    const text = noteUtils.getPlainText(preppedHtml);
    const tags = noteUtils.getTagsFromHtml(preppedHtml);
    const contextTags = noteUtils.getContextTagsFromHtml(preppedHtml);
    return { id, html: preppedHtml, text, dateCreated, tags, contextTags };
  }

  static build(html: HTMLString) {
    const { id, html: preppedHtml, text, dateCreated, tags, contextTags } = Note.getDataFromHtmlString(html);
    return new Note(id, preppedHtml, text, dateCreated, tags, contextTags);
  }
}

export type NoteBasic = {
  html: HTMLString;
  text: string;
  dateCreated: Date;
  tags: string[];
  contextTags: string[];
};

export type NodeExistingDocument = PouchDB.Core.ExistingDocument<NoteBasic>;
export type NoteDocument = PouchDB.Core.Document<NoteBasic>;
