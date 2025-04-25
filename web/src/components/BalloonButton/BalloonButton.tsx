import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { differenceInCalendarDays, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { BalloonIcon } from "@/assets/BalloonIcon";

export type BalloonButtonProps = {
  mute?: boolean;
  onClick?: () => void;
};

export const BalloonButton = ({
  mute = false,
  onClick,
}: BalloonButtonProps) => {
  // initial value is 30 days ago, so it will be animated on the first visit
  const [lastUsedDate, setLastUsedDate] = useLocalStorage(
    "balloon",
    subDays(new Date(), 30),
  );

  const lastUsed30DaysAgo =
    differenceInCalendarDays(new Date(), lastUsedDate) >= 30;

  const handleClick = () => {
    setLastUsedDate(new Date());
    onClick?.();
  };

  return (
    <Button
      variant="ghost"
      size={"icon"}
      className={cn(
        lastUsed30DaysAgo && !mute && "animate-ballooning",
        mute ? "text-stone-200" : "text-stone-400",
        "hover:text-stone-600",
        "bg-palegreen",
      )}
      onClick={handleClick}
    >
      <BalloonIcon className={cn("h-5 w-5")} />
    </Button>
  );
};
