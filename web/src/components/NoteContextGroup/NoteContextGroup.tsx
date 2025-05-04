import { Note } from "@/modules/notes/models/Note";
import { Tag } from "@/modules/tags";
import { NoteDisplay } from "@/components/NoteDisplay/NoteDisplay";

export type NoteContextGroupProps = {
  context: Tag[];
  notes: Note[];
};

export const NoteContextGroup = (props: NoteContextGroupProps) => {
  const { context, notes } = props;

  return (
    <section className="mb-6 grid grid-cols-[25%_1fr] gap-4">
      <div className="border-e border-slate-300 py-2 pe-4">
        <div className="sticky top-4 flex flex-col items-end gap-1">
          {context.map((tag) => (
            <neote-tag name={tag.getName()} key={tag.getName()}></neote-tag>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 py-2">
        {notes.map((note) => (
          <NoteDisplay key={note.getId()} note={note} />
        ))}
      </div>
    </section>
  );
};
