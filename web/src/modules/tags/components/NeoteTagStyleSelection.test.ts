import "@testing-library/jest-dom";
import { within } from "@testing-library/dom";
import "./NeoteTagStyleSelection";
import { html, rawHtml } from "@/modules/render";
import userEvent from "@testing-library/user-event";

describe("NeoteTagStyleSelection", () => {
  it("should render", () => {
    const [wrapper] = html`
      <neote-tag-style-selection value="chip-dark"></neote-tag-style-selection>
    `;

    expect(rawHtml(wrapper)).toEqual(
      '<neote-tag-style-selection value="chip-dark"><div class="wrapper"> <select size="9"> <option value="basic"> Basic </option><option value="chip-light"> Chip (light) </option><option value="chip-dark" selected=""> Chip (dark) </option><option value="chip-border"> Chip outline </option><option value="chip-icon-light"> Chip icon (light) </option><option value="chip-icon-dark"> Chip icon (border) </option><option value="neon"> Neon </option><option value="token-gradient-light"> Token gradient (light) </option><option value="token-gradient-dark"> Token gradient (dark) </option> </select> <div class="preview"> <p class="" style=""> <neote-tag name="thought"></neote-tag> <neote-tag name="philosophy"></neote-tag> Is the <neote-tag name="universe"></neote-tag> really expanding or are our minds just shrinking? </p> </div> </div></neote-tag-style-selection>',
    );
  });

  it("should trigger a selection event", async () => {
    const user = userEvent.setup();
    const [wrapper] = html`
      <neote-tag-style-selection></neote-tag-style-selection>
    `;

    const eventHandler = vi.fn();
    wrapper.addEventListener("style-select", eventHandler);

    const query = within(wrapper);
    const select = query.getByRole("listbox");

    await user.selectOptions(select, ["neon"]);

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler.mock.calls[0][0].detail.style).toEqual("neon");
  });
});
