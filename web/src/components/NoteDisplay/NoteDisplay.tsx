import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/modules/ui/elements/alert-dialog";
import { Button } from "@/modules/ui/elements/button";
import { Note } from "@/modules/notes/models/Note";
import { DI } from "@/modules/dependency-injection";
import { Pencil, Trash } from "lucide-react";
import { cn } from "@/modules/ui/lib/utils";
import { EditorSubmitEvent } from "@/modules/editor/components/NeoteEditor";

type Props = {
  note: Note;
  blur?: boolean;
};

export const NoteDisplay = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { note, blur = false } = props;
  const noteService = DI.resolve("NoteService");

  const handleSubmit = async (event: EditorSubmitEvent) => {
    note.updateContent(event.detail?.content || "");
    await noteService.update(note);
    setIsEditing(false);
  };

  const handleEscape = () => {
    setIsEditing(false);
  };

  const handleTrashClicked = async () => {
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    setIsDeleting(false);
    await noteService.delete(note);
  };

  return (
    <article
      key={note.getId()}
      className={cn(`group relative flex`, blur ? "blur-sm" : "why")}
    >
      {isEditing ? (
        <div className="h-full w-full">
          <neote-editor
            oneditor-submit={handleSubmit}
            content={note.getHtml()}
            extension-tag="enabled"
            oneditor-escape={handleEscape}
          ></neote-editor>
        </div>
      ) : (
        <p
          className="hidden-context-tags min-h-3 text-sm break-words [word-break:break-word]"
          dangerouslySetInnerHTML={{
            __html: note.getHtml(),
          }}
        />
      )}
      <div
        className={`hidden ${isEditing ? "" : "group-hover:flex"} absolute right-1 bottom-0 flex-row gap-1`}
      >
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil />
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={handleTrashClicked}
        >
          <Trash />
        </Button>
      </div>
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this spark?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              spark.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleting(false)}>
              Cancel
            </AlertDialogCancel>
            <Button onClick={handleDelete} variant={"destructive"}>
              <Trash /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
};
