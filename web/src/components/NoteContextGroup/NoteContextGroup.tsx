import { Note } from "@/modules/notes/models/Note";
import { Tag } from "@/modules/tags";
import { NoteDisplay } from "@/components/NoteDisplay/NoteDisplay";

export type NoteContextGroupProps = {
  context: Tag[];
  notes: Note[];
};

export const NoteContextGroup = (props: NoteContextGroupProps) => {
  const { context, notes } = props;

  const hues = context.map((tag) => tag.getHue());
  const gradient = `linear-gradient(-45deg, ${hues.map((hue) => `hsl(${hue} 60% 90% / 20%)`).join(", ")})`;

  return (
    <section className="mb-6 grid grid-cols-[20%_1fr] gap-4">
      <div
        className="rounded-lg px-3 py-3 backdrop-blur backdrop-filter"
        style={{
          background: gradient,
        }}
      >
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
