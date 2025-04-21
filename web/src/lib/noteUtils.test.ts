import { describe, it, expect } from "vitest";
import { noteUtils } from "./noteUtils";

describe("noteUtils", () => {
  describe("markContextTags", () => {
    it("should flag neote-tag as context tag when it has no previous sibling", () => {
      const html = `<neote-tag name="fire">fire</neote-tag> is hot`;
      const result = noteUtils.markContextTags(html);
      expect(result).toEqual(
        '<neote-tag name="fire" data-context-tag="true">fire</neote-tag> is hot',
      );
    });

    it("should flag neote-tag as context tag when previous sibling is an empty text node", () => {
      const html = '   <neote-tag name="water">water</neote-tag> is wet';
      const result = noteUtils.markContextTags(html);
      expect(result).toEqual(
        '   <neote-tag name="water" data-context-tag="true">water</neote-tag> is wet',
      );
    });

    it("should flag neote-tag as context tag when previous sibling has data-context-tag attribute", () => {
      const html = `<neote-tag name="earth">earth</neote-tag><neote-tag name="air">air</neote-tag> are elements.`;
      const result = noteUtils.markContextTags(html);
      expect(result).toEqual(
        '<neote-tag name="earth" data-context-tag="true">earth</neote-tag><neote-tag name="air" data-context-tag="true">air</neote-tag> are elements.',
      );
    });

    it("should not flag neote-tag as context tag when neote-tag is inside text", () => {
      const html = `<neote-tag name="earth">earth</neote-tag><neote-tag name="air">air</neote-tag> are both <neote-tag name="element">element</neote-tag>s`;
      const result = noteUtils.markContextTags(html);
      expect(result).toEqual(
        '<neote-tag name="earth" data-context-tag="true">earth</neote-tag><neote-tag name="air" data-context-tag="true">air</neote-tag> are both <neote-tag name="element">element</neote-tag>s',
      );
    });

    it("should not flag any neote-tag that are inside text and no context tag exists", () => {
      const html = `We all live on <neote-tag name="earth">earth</neote-tag>`;
      const result = noteUtils.markContextTags(html);
      expect(result).toEqual(
        'We all live on <neote-tag name="earth">earth</neote-tag>',
      );
    });
  });

  describe("getTagsFromHtml", () => {
    it("should return an array of tag names from neote-tag elements", () => {
      const html = `<neote-tag name="fire">fire</neote-tag> is hot and <neote-tag name="water">water</neote-tag> is cold`;
      const result = noteUtils.getTagsFromHtml(html);
      expect(result).toEqual(["fire", "water"]);
    });

    it("should return an empty array if no neote-tag elements are present", () => {
      const html = `<div>No tags here</div>`;
      const result = noteUtils.getTagsFromHtml(html);
      expect(result).toEqual([]);
    });

    it("should ignore neote-tag elements without a name attribute", () => {
      const html = `<neote-tag>no name</neote-tag><neote-tag name="earth">earth</neote-tag>`;
      const result = noteUtils.getTagsFromHtml(html);
      expect(result).toEqual(["earth"]);
    });

    it("should handle nested neote-tag elements correctly", () => {
      const html = `<div><neote-tag name="fire">fire</neote-tag></div><neote-tag name="air">air</neote-tag>`;
      const result = noteUtils.getTagsFromHtml(html);
      expect(result).toEqual(["fire", "air"]);
    });

    it("should return all tags, including the ones which are marked as context tags", () => {
      const html = `<neote-tag>no name</neote-tag><neote-tag name="earth">earth</neote-tag> and <neote-tag name="fire" data-context-tag="true">fire</neote-tag> plus <neote-tag name="water">water</neote-tag>`;
      const result = noteUtils.getTagsFromHtml(html);
      expect(result).toEqual(["earth", "fire", "water"]);
    });
  });

  describe("getContextTagsFromHtml", () => {
    it("should return an array of tag names with data-context-tag attribute", () => {
      const html = `
        <neote-tag name="fire" data-context-tag="true">fire</neote-tag>
        <neote-tag name="water">water</neote-tag>
        <neote-tag name="earth" data-context-tag="true">earth</neote-tag>
      `;
      const result = noteUtils.getContextTagsFromHtml(html);
      expect(result).toEqual(["fire", "earth"]);
    });

    it("should return an empty array if no tags have data-context-tag attribute", () => {
      const html = `
        <neote-tag name="fire">fire</neote-tag>
        <neote-tag name="water">water</neote-tag>
      `;
      const result = noteUtils.getContextTagsFromHtml(html);
      expect(result).toEqual([]);
    });

    it("should ignore tags without a name attribute even if they have data-context-tag", () => {
      const html = `
        <neote-tag data-context-tag="true">no name</neote-tag>
        <neote-tag name="earth" data-context-tag="true">earth</neote-tag>
      `;
      const result = noteUtils.getContextTagsFromHtml(html);
      expect(result).toEqual(["earth"]);
    });

    it("should handle nested tags with data-context-tag correctly", () => {
      const html = `
        <div>
          <neote-tag name="fire" data-context-tag="true">fire</neote-tag>
        </div>
        <neote-tag name="air" data-context-tag="true">air</neote-tag>
      `;
      const result = noteUtils.getContextTagsFromHtml(html);
      expect(result).toEqual(["fire", "air"]);
    });

    it("should return all tags with data-context-tag, even if mixed with others", () => {
      const html = `
        <neote-tag name="fire" data-context-tag="true">fire</neote-tag>
        <neote-tag name="water">water</neote-tag>
        <neote-tag name="earth" data-context-tag="true">earth</neote-tag>
        <neote-tag name="air">air</neote-tag>
      `;
      const result = noteUtils.getContextTagsFromHtml(html);
      expect(result).toEqual(["fire", "earth"]);
    });
  });

  describe("cleanTagStyles", () => {
    it("should remove all style attributes from neote-tags from the HTML", () => {
      const html = `<p>Yes <neote-tag data-type="tags" name="vegetables" contenteditable="false" style="--icon: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%229%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2215%22%20y2%3D%2215%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2210%22%20x2%3D%228%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2216%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3C%2Fsvg%3E); --hue-color: 44;">vegetables</neote-tag> I like <neote-tag data-type="tags" name="bananas" contenteditable="false" style="--icon: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%229%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2215%22%20y2%3D%2215%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2210%22%20x2%3D%228%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2216%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3C%2Fsvg%3E); --hue-color: 67;">bananas</neote-tag> and <neote-tag data-type="tags" name="apples" contenteditable="false" style="--icon: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%229%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224%22%20x2%3D%2220%22%20y1%3D%2215%22%20y2%3D%2215%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2210%22%20x2%3D%228%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2216%22%20x2%3D%2214%22%20y1%3D%223%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3C%2Fsvg%3E); --hue-color: 124;">apples</neote-tag><br class="ProseMirror-trailingBreak"></p>`;
      const result = noteUtils.cleanTagStyles(html);
      expect(result).toEqual(
        `<p>Yes <neote-tag data-type="tags" name="vegetables" contenteditable="false">vegetables</neote-tag> I like <neote-tag data-type="tags" name="bananas" contenteditable="false">bananas</neote-tag> and <neote-tag data-type="tags" name="apples" contenteditable="false">apples</neote-tag><br class="ProseMirror-trailingBreak"></p>`,
      );
    });

    it("should only remove style attributes from neote-tag elements and leave other elements untouched", () => {
      const html = `<div style="color: blue;">This is a div</div><neote-tag style="color: red;" name="example">example</neote-tag><span style="font-size: 12px;">This is a span</span>`;
      const result = noteUtils.cleanTagStyles(html);
      expect(result).toEqual(
        `<div style="color: blue;">This is a div</div><neote-tag name="example">example</neote-tag><span style="font-size: 12px;">This is a span</span>`,
      );
    });
  });
});
