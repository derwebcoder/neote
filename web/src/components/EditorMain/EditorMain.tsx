import { BalloonButton } from "@/components/BalloonButton/BalloonButton";
import { EditorPIP } from "@/components/EditorPIP/EditorPIP";
import { Button } from "@/modules/ui/elements/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/modules/ui/elements/tooltip";
import { useNoteService } from "@/hooks/useNoteService";
import { usePIP } from "@/hooks/usePIP";
import { getAppEnvironment, isAppEnvironment } from "@/modules/environment";
import { cn } from "@/modules/ui/lib/utils";
import { defineNeoteEditor, EditorSubmitEvent, NeoteEditor } from "@/modules/editor/components/NeoteEditor";
import { Note } from "@/modules/notes/models/Note";
import { Send } from "lucide-react";
import { FocusEventHandler, useState } from "react";
import { defineNeoteTag } from "@/modules/tags/components/NeoteTag";

defineNeoteEditor()
defineNeoteTag()


export const EditorMain = () => {
  const noteService = useNoteService()
  const [isTyping, setIsTyping] = useState(false);
  const { triggerPIP } = usePIP({ Children: <EditorPIP /> })

  const handleTyping: FocusEventHandler<NeoteEditor> = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleBalloonClick = () => {
    if (isAppEnvironment()) {
      getAppEnvironment().window.openFloatingEditor()
      return
    }
    triggerPIP()
  }

  const triggerSubmit = () => {
    const editor = document.querySelector("neote-editor div[contenteditable]") as HTMLElement | null;
    if (editor) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true,
        ...(isMac
          ? { metaKey: true }
          : { ctrlKey: true }),
      });
      editor.dispatchEvent(event);
    }
  }

  const handleSubmit = (e: EditorSubmitEvent) => {
    if (!e.detail?.content || e.detail?.content.trim() === "") {
      return;
    }
    const note = Note.getDataFromHtmlString(e.detail.content);
    noteService.create(note)
  };

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = isMac ? 'CMD + Enter' : 'CTRL + Enter';

  return (
    <div
      className={cn(
        "relative z-50 flex h-full w-full transition-all duration-300 ease-in-out",
      )}
    >
      <neote-editor
        extension-tag="enabled"
        placeholder="Type here ..."
        className="p-2 pe-8 h-full w-full rounded-sm border-1 border-stone-200 bg-white outline-0 focus-within:border-stone-400"
        onFocus={handleTyping}
        onBlur={handleBlur}
        oneditor-submit={handleSubmit}
      ></neote-editor>
      <div className="absolute right-1 flex h-full flex-col justify-between py-1">
        <BalloonButton mute={isTyping} onClick={handleBalloonClick} />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className={cn(
                "hover:text-stone-600",
                isTyping ? "bg-stone-100 opacity-70" : "",
              )}
              onClick={triggerSubmit}
            >
              <Send color={isTyping ? "url(#green_gradient)" : "url(#gray_gradient)"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add note ({shortcut})</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
