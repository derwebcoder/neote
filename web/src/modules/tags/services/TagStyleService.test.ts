import { local } from "../utils/localStorage";
import { TagStyleService } from "./TagStyleService";

describe("TagStyleService", () => {
  afterEach(() => {
    document.body.removeAttribute("data-tag-style");
  });

  it("should init and set default attribute value on body when no localstorage value exists", async () => {
    const tagStyleService = new TagStyleService();
    tagStyleService.init();

    expect(document.body.getAttribute("data-tag-style")).toEqual("chip-light");
  });

  it("should init and set localstorage attribute value on body", async () => {
    vi.spyOn(local, "get").mockImplementationOnce(() => "token-gradient-light");
    const tagStyleService = new TagStyleService();
    tagStyleService.init();

    expect(document.body.getAttribute("data-tag-style")).toEqual(
      "token-gradient-light",
    );
  });

  it("should init and fall back to default value if value in localstorage is invalid", async () => {
    vi.spyOn(local, "get").mockImplementationOnce(() => "abc");
    const tagStyleService = new TagStyleService();
    tagStyleService.init();

    expect(document.body.getAttribute("data-tag-style")).toEqual("chip-light");
  });

  it("should return the current style", async () => {
    vi.spyOn(local, "get").mockImplementationOnce(() => "neon");
    const tagStyleService = new TagStyleService();
    tagStyleService.init();

    expect(tagStyleService.getStyle()).toEqual("neon");
  });

  it("should update the style", async () => {
    vi.spyOn(local, "get").mockImplementationOnce(() => "neon");
    const localSetMock = vi.spyOn(local, "set");
    const tagStyleService = new TagStyleService();
    tagStyleService.init();

    tagStyleService.updateStyle("chip-border");

    expect(document.body.getAttribute("data-tag-style")).toEqual("chip-border");
    expect(localSetMock.mock.calls[0][1]).toEqual("chip-border");
  });
});
