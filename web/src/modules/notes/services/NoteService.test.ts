import memoryAdapter from "pouchdb-adapter-memory";
import PouchDB from "pouchdb-browser";
import { NoteService } from "@/modules/notes/services/NoteService";
import { NoteDB } from "@/modules/notes/db/NoteDB";

describe("NoteService", () => {
  let noteService: NoteService;
  PouchDB.plugin(memoryAdapter);
  let db: NoteDB;

  beforeEach(async () => {
    db = new NoteDB({ adapter: "memory" }, `-${Math.random()}`);
    noteService = new NoteService(db);
  });

  afterEach(async () => {
    await db.xxxBEWARE__destroy();
  });

  it("should error if no note exists", async () => {
    await expect(noteService.get("something")).rejects.toThrowError();
  });

  it("should create and return a note", async () => {
    const date = new Date();
    const note = {
      html: "<p>Test</p>",
      text: "Test",
      dateCreated: date,
      tags: ["tag1", "tag2"],
      contextTags: ["contextTag1", "contextTag2"],
    };
    await noteService.create(note);
    const fetchedNote = await noteService.get(date.toJSON());
    expect(fetchedNote).toEqual(expect.objectContaining(note));
  });

  it("should update a note", async () => {
    const date = new Date();
    const note = {
      html: "<p>Test</p>",
      text: "Test",
      dateCreated: date,
      tags: ["tag1", "tag2"],
      contextTags: ["contextTag1", "contextTag2"],
    };
    await noteService.create(note); // Create the note first
    const fetchedNote = await noteService.get(date.toJSON());
    fetchedNote.updateContent(
      '<p><neote-tag name="neote">neote</neote-tag> Updated</p>',
    );
    await noteService.update(fetchedNote);
    const updatedNote = await noteService.get(date.toJSON());
    expect(updatedNote.getHtml()).toEqual(
      '<p><neote-tag name="neote" data-context-tag="true">neote</neote-tag> Updated</p>',
    );
    expect(updatedNote.getText()).toEqual("neote Updated");
    expect(updatedNote.getTags()).toEqual(["neote"]);
    expect(updatedNote.getContextTags()).toEqual(["neote"]);
  });

  it("should delete an existing note", async () => {
    const date = new Date();
    const note = {
      html: "<p>Test</p>",
      text: "Test",
      dateCreated: date,
      tags: ["tag1", "tag2"],
      contextTags: ["contextTag1", "contextTag2"],
    };
    await noteService.create(note);
    const fetchedNote = await noteService.get(date.toJSON());
    expect(fetchedNote).toEqual(expect.objectContaining(note));
    await noteService.delete(fetchedNote);
    await expect(noteService.get(date.toJSON())).rejects.toThrowError();
  });

  // it("should always lowercase tags", async () => {
  //   const tag = noteService.get("SantaClause");
  //   expect(tag.getName()).toEqual("santaclause");
  // });

  // it("should hydrate the cache", async () => {
  //   const db = new TagDB({ adapter: "memory" }, "-hydrate-test");
  //   await db.create("tree", {
  //     description: "A huge plant",
  //     hue: 35,
  //     icon: "mail",
  //   });
  //   await db.create("bird", {
  //     description: "An animal with wings",
  //     hue: 356,
  //     icon: "star",
  //   });

  //   const service = await noteService.construct(db);

  //   expect(service.get("tree")).toEqual({
  //     description: "A huge plant",
  //     hue: 35,
  //     icon: "mail",
  //     name: "tree",
  //     state: "stored",
  //   });
  //   expect(service.get("bird")).toEqual({
  //     description: "An animal with wings",
  //     hue: 356,
  //     icon: "star",
  //     name: "bird",
  //     state: "stored",
  //   });
  //   await db.xxxBEWARE__destroy();
  // });

  // it("should update a tag", async () => {
  //   const tag = noteService.get("banana");
  //   expect(tag.getState()).toEqual("draft");

  //   const dbCreate = vi.spyOn(db, "create");
  //   const dbUpdate = vi.spyOn(db, "update");

  //   tag.setDescription("restores 5 health");
  //   tag.setIcon("heart");
  //   await noteService.update(tag);

  //   expect(noteService.get("banana")).toEqual({
  //     name: "banana",
  //     description: "restores 5 health",
  //     icon: "heart",
  //     hue: 342,
  //     state: "stored",
  //   });

  //   tag.setHue(98);
  //   await noteService.update(tag);

  //   expect(noteService.get("banana")).toEqual({
  //     name: "banana",
  //     description: "restores 5 health",
  //     icon: "heart",
  //     hue: 98,
  //     state: "stored",
  //   });

  //   expect(dbCreate).toHaveBeenCalledTimes(1);
  //   expect(dbUpdate).toHaveBeenCalledTimes(1);
  // });

  // it("should delete a tag", async () => {
  //   const db = new TagDB({ adapter: "memory" }, "-deletion-test");
  //   await db.create("weekend", {
  //     description: "",
  //     hue: 44,
  //     icon: "lock",
  //   });

  //   const service = await noteService.construct(db);

  //   expect(service.get("weekend")).toEqual({
  //     name: "weekend",
  //     description: "",
  //     hue: 44,
  //     icon: "lock",
  //     state: "stored",
  //   });

  //   await service.delete("weekend");

  //   expect(service.get("weekend")).toEqual({
  //     name: "weekend",
  //     description: "",
  //     hue: 37,
  //     icon: "hash",
  //     state: "draft",
  //   });
  // });

  // it("should let me observe changes to a tag", async () => {
  //   const callback = vi.fn();

  //   noteService.observe("money", callback);

  //   const moneyTag = noteService.get("money");
  //   const cashTag = noteService.get("cash");

  //   moneyTag.setDescription("Not available");
  //   await noteService.update(moneyTag);

  //   cashTag.setIcon("info");
  //   await noteService.update(cashTag);

  //   expect(callback).toHaveBeenCalledTimes(1);
  //   expect(callback.mock.lastCall?.[0]).toEqual({
  //     name: "money",
  //     description: "Not available",
  //     hue: 230,
  //     icon: "hash",
  //     state: "stored",
  //   });
  // });
});
