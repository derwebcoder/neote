import { generateDefaultHue } from "./TagColorConfig";

describe("generateDefaultColor", () => {
  it("should return the correct default color", () => {
    expect(generateDefaultHue("test")).toEqual(47);
    expect(generateDefaultHue("123k")).toEqual(10);
    expect(generateDefaultHue("thisislong")).toEqual(218);
  });
});
