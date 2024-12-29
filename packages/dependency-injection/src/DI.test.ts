import { TagService } from "@neote/tags";
import { DI } from "./DI";

describe("DI", () => {
  it("should inject and resolve dependencies", () => {
    const tagService = new TagService();

    DI.inject("TagService", tagService);

    expect(DI.resolve("TagService")).toBe(tagService);
  });
});
