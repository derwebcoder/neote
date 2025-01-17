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

        // we want to attach the component to the editor
        // for easier positioning
        wrapper = props.editor.$doc.element.parentElement!;

        component = document.createElement(
          "neote-tag-suggestions",
        ) as NeoteTagSuggestions;

        // positions the component absolute via CSS
        // we can't use classes as they will be overriden
        component.setAttribute("data-popover", "true");

        if (selectOnly) {
          component.setAttribute("select-only", "true");
        }

        // The component triggers a custom event `tag-select`
        // which contains the selected tag name
        listener = (e: TagSelectEvent) => {
          const tag = e.detail?.tag;
          props.command({ name: tag });
        };
        component.addEventListener("tag-select", listener);

        wrapper.appendChild(component);

        // position the component relative to the user input
        positionPopup(getClientRect, component);
      },

      onUpdate(props) {
        const getClientRect = props.clientRect;
        if (!getClientRect) {
          return;
        }

        // the query could have changed
        component.setAttribute("query", props.query);

        // the position of the user input could have changed
        positionPopup(getClientRect, component);
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          wrapper.removeChild(component);

          return true;
        }

        // the extension needs to handle the user input
        // and forwards this to the component
        // which can either act on it (return true, for example for up/down/enter)
        // or ignore it (return false), so it will be handled by tiptap / other extensions
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
