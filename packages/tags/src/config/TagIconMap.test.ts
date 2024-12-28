import { TagIconMap } from "./TagIconMap";

describe("TagIconMap", () => {
  it("should have the expected entries", () => {
    const keys = Object.keys(TagIconMap);
    expect(keys).toEqual([
      "alert-triangle",
      "bookmark",
      "calendar",
      "gift",
      "hash",
      "heart",
      "help-circle",
      "info",
      "lock",
      "mail",
      "map-pin",
      "shield",
      "star",
      "user",
      "users",
      "zap",
    ]);
  });

  it("should return the svg with a stroke width of 1.5", () => {
    const starIcon = TagIconMap["star"];
    expect(starIcon).toEqual(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    );
  });
});
