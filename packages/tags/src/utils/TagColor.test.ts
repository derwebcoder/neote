import { TagColor } from "./TagColor";

describe("TagColor", () => {
  it("should generate a color for a tag", () => {
    const tagColor = new TagColor();

    const color = tagColor.get("10thirtyFive");

    expect(color).toEqual(168);
  });

  it("should return the correct color for a manually set tag", () => {
    const tagColor = new TagColor();

    const generatedColor = tagColor.get("Luftballons");
    tagColor.update("Luftballons", 99);
    const updatedColor = tagColor.get("Luftballons");

    expect(generatedColor).toEqual(296);
    expect(updatedColor).toEqual(99);
  });
});
