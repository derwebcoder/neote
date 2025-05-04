import { format } from "date-fns";

export type DateSeparatorProps = {
  date: Date;
};

export const DateSeparator = ({ date }: DateSeparatorProps) => {
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
