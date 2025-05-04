import { format } from "date-fns";

export const DateSeparator = ({ date }: { date: Date }) => {
  return (
    <span
      className="mb-2 ps-3 text-sm text-neutral-400"
      data-key={date.toString()}
      key={date.toString()}
    >
      {format(date, "dd.MM.yyyy")}
    </span>
  );
};
