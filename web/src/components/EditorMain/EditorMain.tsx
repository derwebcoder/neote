import { BalloonButton } from "@/components/BalloonButton/BalloonButton";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import "@/modules/editor";
import { NeoteEditor } from "@/modules/editor/components/NeoteEditor";
import "@/modules/tags";
import { SquareArrowOutDownRight, SquareArrowUpLeft } from "lucide-react";
import { FocusEventHandler, useState } from "react";

export const EditorMain = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useLocalStorage("editor-expanded", false);

  const handleTyping: FocusEventHandler<NeoteEditor> = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  return (
    <div
      className={cn(
        "relative z-50 flex h-full w-full transition-all duration-300 ease-in-out",
        isTyping && isExpanded && "h-[150%] w-[140%]",
      )}
    >
      <neote-editor
        extension-tag="enabled"
        placeholder="Type here ..."
        className="h-full w-full rounded-sm border-1 border-stone-200 bg-white outline-0 focus-within:border-stone-400"
        onFocus={handleTyping}
        onBlur={handleBlur}
      ></neote-editor>
      <div className="absolute right-1 flex h-full flex-col justify-between py-1">
        <BalloonButton mute={isTyping} />
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "hover:text-stone-600",
            isTyping ? "text-stone-200" : "text-stone-400",
          )}
          onMouseDown={() => {
            setIsExpanded((prev) => !prev);
            // when clicking on the expand button, we want to focus the editor
            // otherwise the click would not have any visual effect for the user
            // we also need a timeout otherwise a click while the editor is focused
            // would cause the editor to lose focus
            window.setTimeout(() => {
              (
                document.querySelector("neote-editor") as NeoteEditor
              ).focusEditor();
            }, 0);
          }}
        >
          {isExpanded ? <SquareArrowUpLeft /> : <SquareArrowOutDownRight />}
        </Button>
      </div>
    </div>
  );
};
