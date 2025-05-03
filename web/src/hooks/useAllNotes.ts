import { useNoteService } from "@/hooks/useNoteService";
import { useSyncExternalStore } from "react";

export const useAllNotes = () => {
  const noteService = useNoteService();
  return useSyncExternalStore(
    (callback) => {
      const watch = noteService.watch.bind(noteService);
      const unsubscribe = watch(() => {
        callback();
      });
      return () => unsubscribe();
    },
    () => {
      const notes = noteService.getAllSync();
      return notes;
    },
  );
};
