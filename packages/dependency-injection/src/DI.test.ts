import { TagDB, TagService } from "@neote/tags";
import { DI } from "./DI";
import memoryAdapter from "pouchdb-adapter-memory";
import PouchDB from "pouchdb-browser";

describe("DI", () => {
  it("should inject and resolve dependencies", async () => {
    PouchDB.plugin(memoryAdapter);
    const db = new TagDB({ adapter: "memory" });
    const tagService = await TagService.construct(db);

    DI.inject("TagService", tagService);

    expect(DI.resolve("TagService")).toBe(tagService);
  });
});
