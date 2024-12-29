import { TagIcon } from "./TagIcon";

describe("TagIcon", () => {
  it("should return 'hash' for new tag", () => {
    const tagIcon = new TagIcon();

    const color = tagIcon.get("play");

    expect(color).toEqual("hash");
  });

  it("should return the correct icon name for a manually set tag", () => {
    const tagIcon = new TagIcon();

    const generatedTag = tagIcon.get("Post");
    tagIcon.update("Post", "mail");
    const updatedTag = tagIcon.get("Post");

    expect(generatedTag).toEqual("hash");
    expect(updatedTag).toEqual("mail");
  });
});
