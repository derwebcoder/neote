import {
  DateSeparator,
  DateSeparatorProps,
} from "@/components/DateSeparator/DateSeparator";
import {
  NoteContextGroup,
  NoteContextGroupProps,
} from "@/components/NoteContextGroup/NoteContextGroup";
import { useAllNotes } from "@/hooks/useAllNotes";
import { DI } from "@/modules/dependency-injection";
import { Note } from "@/modules/notes/models/Note";
import { MainTemplate } from "@/templates/MainTemplate";
import { createFileRoute } from "@tanstack/react-router";
import { differenceInCalendarDays } from "date-fns";

type NoteContextGroupSection = {
  key: string;
  type: "noteGroup";
} & NoteContextGroupProps;

type DateSection = {
  key: string;
  type: "date";
} & DateSeparatorProps;

type Section = NoteContextGroupSection | DateSection;

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <MainTemplate menuSlot={<>Hello</>} mainSlot={<Main />} />;
}

const Main = () => {
  const notes = useAllNotes();
  const sections = groupNotes(notes);

  if (!sections || sections.length <= 0) {
    return (
      <div className="flex h-full flex-col px-8 py-10">
        Add your first note in the input in the top left!
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col px-8 py-10">
      <ul>
        {sections.map((section) => {
          if (section.type === "date") {
            return (
              <div key={section.key} className="sticky top-0 flex justify-center py-2">
                <DateSeparator date={section.date} />
              </div>
            );
          }
          return (
            <NoteContextGroup
              context={section.context}
              notes={section.notes}
              key={section.key}
            />
          );
        })}
      </ul>
    </div>
  );
};

const groupNotes = (notes: Note[]): Section[] => {
  const tagService = DI.resolve("TagService");
  return notes.reduce<Section[]>((tmpSections, note) => {
    const prevSection =
      tmpSections.length > 0 ? tmpSections[tmpSections.length - 1] : undefined;

    const prevSectionKey = prevSection?.key;

    if (prevSection?.type === "date") {
      // this can logically actually not happen because we always add a spark at the end
      return tmpSections;
    }

    const nextKey =
      note.getContextTags().length > 0
        ? note.getContextTags().join("/")
        : `${Math.random()}`;
    const nextDate = note.getDateCreated();

    // if it's the first entry, just add a date section and the single first note
    if (!prevSection) {
      tmpSections.push({
        type: "date",
        key: nextDate.toUTCString(),
        date: nextDate,
      });
      tmpSections.push({
        type: "noteGroup",
        key: nextKey,
        context: note.getContextTags().map((tag) => tagService.get(tag)),
        notes: [note],
      });
      return tmpSections;
    }

    // check the date of the latest spark in the prevSection.
    // If the date is not the same, add a new date section first and then a new spark section
    const prevDate = prevSection.notes[0].getDateCreated();
    if (differenceInCalendarDays(prevDate, nextDate) >= 1) {
      tmpSections.push({
        type: "date",
        key: nextDate.toUTCString(),
        date: nextDate,
      });
      tmpSections.push({
        type: "noteGroup",
        key: nextKey,
        context: note.getContextTags().map((tag) => tagService.get(tag)),
        notes: [note],
      });
      return tmpSections;
    }

    // if the key diff because the next note has different context tags, we create a new section
    if (prevSectionKey !== nextKey) {
      tmpSections.push({
        key: nextKey,
        context: note.getContextTags().map((tag) => tagService.get(tag)),
        notes: [note],
        type: "noteGroup",
      });
      return tmpSections;
    }

    // otherwise if the keys match (meaning same context tags) we add the note to the previous section
    prevSection.notes.push(note);
    return tmpSections;
  }, []);
};
