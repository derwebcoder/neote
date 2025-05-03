import { DI } from "@/modules/dependency-injection";
import { useRef } from "react";

export const useNoteService = () => {
  return useRef(DI.resolve("NoteService")).current;
};
