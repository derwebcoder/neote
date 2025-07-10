import { BalloonButton } from "@/components/BalloonButton/BalloonButton";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "@/modules/editor";
import { NeoteEditor } from "@/modules/editor/components/NeoteEditor";
import "@/modules/tags";
import { Send } from "lucide-react";
import { FocusEventHandler, useState } from "react";

export const EditorMain = () => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping: FocusEventHandler<NeoteEditor> = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleSubmit = () => {
    // TODO: Implement submit functionality
    console.log("Submit button clicked");
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
      ></neote-editor>
      <div className="absolute right-1 flex h-full flex-col justify-between py-1">
        <BalloonButton mute={isTyping} />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className={cn(
                "hover:text-stone-600",
                isTyping ? "bg-stone-100 opacity-70" : "",
              )}
              onClick={handleSubmit}
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
