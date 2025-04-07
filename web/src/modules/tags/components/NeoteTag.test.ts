import "@testing-library/jest-dom";
import "./NeoteTag";
import { html, rawHtml } from "@/modules/render";
import { waitFor } from "@testing-library/dom";
import { DI } from "@/modules/dependency-injection";
import { TagService } from "../services/TagService";
import { TagDB } from "../db/TagDB";
import memoryAdapter from "pouchdb-adapter-memory";
import PouchDB from "pouchdb-browser";

describe("NeoteTag", () => {
  it("should render", async () => {
    PouchDB.plugin(memoryAdapter);
    const db = new TagDB({ adapter: "memory" });
    const tagService = await TagService.construct(db);
    DI.inject("TagService", tagService);
    const [wrapper] = html`<neote-tag name="mytag"></neote-tag>`;

    await waitFor(() => {
      expect(rawHtml(wrapper)).toEqual(
        '<neote-tag name="mytag" style="--icon: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-hash%22%3E%3Cline%20x1%3D%224%22%20y1%3D%229%22%20x2%3D%2220%22%20y2%3D%229%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224%22%20y1%3D%2215%22%20x2%3D%2220%22%20y2%3D%2215%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2210%22%20y1%3D%223%22%20x2%3D%228%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2216%22%20y1%3D%223%22%20x2%3D%2214%22%20y2%3D%2221%22%3E%3C%2Fline%3E%3C%2Fsvg%3E); --hue-color: 162;"></neote-tag>',
      );
    });
  });
});
