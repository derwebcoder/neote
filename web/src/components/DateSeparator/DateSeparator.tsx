import { format, isToday, isYesterday } from "date-fns";

export type DateSeparatorProps = {
  date: Date;
};

export const DateSeparator = ({ date }: DateSeparatorProps) => {
  let displayText: string;

  if (isToday(date)) {
    displayText = "Today";
  } else if (isYesterday(date)) {
    displayText = "Yesterday";
  } else {
    displayText = format(date, "dd.MM.yyyy");
  }

  return (
    <span
      className="rounded-full bg-white px-4 py-1 text-xs text-neutral-600 shadow-sm dark:bg-neutral-800 dark:text-neutral-300"
      data-key={date.toString()}
      key={date.toString()}
    >
      {displayText}
    </span>
  );
};
