import { TagService } from "./TagService";
import memoryAdapter from "pouchdb-adapter-memory";
import PouchDB from "pouchdb-browser";
import { TagDB } from "../db/TagDB";

describe("TagService", () => {
  let tagService: TagService;
  PouchDB.plugin(memoryAdapter);
  let db: TagDB;

  beforeEach(async () => {
    db = new TagDB({ adapter: "memory" }, `-${Math.random()}`);
    tagService = await TagService.construct(db);
  });

  afterEach(async () => {
    await db.xxxBEWARE__destroy();
  });

  it("should return a default tag if non exists", async () => {
    const tag = tagService.get("something");
    expect(tag).toEqual({
      description: "",
      hue: 134,
      icon: "hash",
      name: "something",
      state: "draft",
    });
  });

  it("should always lowercase tags", async () => {
    const tag = tagService.get("SantaClause");
    expect(tag.getName()).toEqual("santaclause");
  });

  it("should hydrate the cache", async () => {
    const db = new TagDB({ adapter: "memory" }, "-hydrate-test");
    await db.create("tree", {
      description: "A huge plant",
      hue: 35,
      icon: "mail",
    });
    await db.create("bird", {
      description: "An animal with wings",
      hue: 356,
      icon: "star",
    });

    const service = await TagService.construct(db);

    expect(service.get("tree")).toEqual({
      description: "A huge plant",
      hue: 35,
      icon: "mail",
      name: "tree",
      state: "stored",
    });
    expect(service.get("bird")).toEqual({
      description: "An animal with wings",
      hue: 356,
      icon: "star",
      name: "bird",
      state: "stored",
    });
    await db.xxxBEWARE__destroy();
  });

  it("should update a tag", async () => {
    const tag = tagService.get("banana");
    expect(tag.getState()).toEqual("draft");

    const dbCreate = vi.spyOn(db, "create");
    const dbUpdate = vi.spyOn(db, "update");

    tag.setDescription("restores 5 health");
    tag.setIcon("heart");
    await tagService.update(tag);

    expect(tagService.get("banana")).toEqual({
      name: "banana",
      description: "restores 5 health",
      icon: "heart",
      hue: 342,
      state: "stored",
    });

    tag.setHue(98);
    await tagService.update(tag);

    expect(tagService.get("banana")).toEqual({
      name: "banana",
      description: "restores 5 health",
      icon: "heart",
      hue: 98,
      state: "stored",
    });

    expect(dbCreate).toHaveBeenCalledTimes(1);
    expect(dbUpdate).toHaveBeenCalledTimes(1);
  });

  it("should delete a tag", async () => {
    const db = new TagDB({ adapter: "memory" }, "-deletion-test");
    await db.create("weekend", {
      description: "",
      hue: 44,
      icon: "lock",
    });

    const service = await TagService.construct(db);

    expect(service.get("weekend")).toEqual({
      name: "weekend",
      description: "",
      hue: 44,
      icon: "lock",
      state: "stored",
    });

    await service.delete("weekend");

    expect(service.get("weekend")).toEqual({
      name: "weekend",
      description: "",
      hue: 37,
      icon: "hash",
      state: "draft",
    });
  });

  it("should let me observe changes to a tag", async () => {
    const callback = vi.fn();

    tagService.observe("money", callback);

    const moneyTag = tagService.get("money");
    const cashTag = tagService.get("cash");

    moneyTag.setDescription("Not available");
    await tagService.update(moneyTag);

    cashTag.setIcon("info");
    await tagService.update(cashTag);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.lastCall?.[0]).toEqual({
      name: "money",
      description: "Not available",
      hue: 230,
      icon: "hash",
      state: "stored",
    });
  });
});
