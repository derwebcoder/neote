import { useAllNotes } from "@/hooks/useAllNotes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const notes = useAllNotes();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ul>
        {notes.map((note) => (
          <li key={note.getId()}>{note.getHtml()}</li>
        ))}
      </ul>
    </div>
  );
}
