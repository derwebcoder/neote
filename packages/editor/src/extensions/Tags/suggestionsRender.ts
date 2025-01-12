import { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import {
  NeoteTagSuggestions,
  TagSelectEvent,
} from "../../components/NeoteTagSuggestions";
import { computePosition, flip, offset, shift } from "@floating-ui/dom";

export const getSuggestionRender = (
  selectOnly: boolean,
): SuggestionOptions["render"] => {
  return () => {
    let wrapper: HTMLElement;
    let component: NeoteTagSuggestions;
    let listener: (e: TagSelectEvent) => void;

    return {
      onStart: (props) => {
        const getClientRect = props.clientRect;
        if (!getClientRect) {
          return;
        }

        wrapper = props.editor.$doc.element.parentElement!;

        component = document.createElement(
          "neote-tag-suggestions",
        ) as NeoteTagSuggestions;

        component.setAttribute("data-popover", "true");

        if (selectOnly) {
          component.setAttribute("select-only", "true");
        }

        listener = (e: TagSelectEvent) => {
          const tag = e.detail?.tag;
          props.command({ id: tag });
        };
        component.addEventListener("tag-select", listener);

        wrapper.appendChild(component);

        positionPopup(getClientRect, component);
      },

      onUpdate(props) {
        const getClientRect = props.clientRect;
        if (!getClientRect) {
          return;
        }

        component.setAttribute("query", props.query);
        component.removeEventListener("tag-select", listener);
        listener = (e: TagSelectEvent) => {
          const tag = e.detail?.tag;
          props.command({ id: tag });
        };
        component.addEventListener("tag-select", listener);

        positionPopup(getClientRect, component);
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          wrapper.removeChild(component);

          return true;
        }

        return component.onExternalKeyDown(props);
      },

      onExit() {
        wrapper.removeChild(component);
        component.removeEventListener("tag-select", listener);
      },
    };
  };
};

const positionPopup = (
  getAnchorRect: SuggestionProps["clientRect"],
  component: NeoteTagSuggestions,
) => {
  const rect = {
    x: 0,
    y: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    ...getAnchorRect?.()?.toJSON(),
  };
  const virtualEl = {
    getBoundingClientRect: () => rect,
    getClientRects: () => [rect],
  };
  computePosition(virtualEl, component, {
    placement: "bottom-start",
    middleware: [offset(6), flip(), shift()],
  }).then(({ x, y }) => {
    Object.assign(component.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
};
