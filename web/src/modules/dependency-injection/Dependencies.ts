import type { NoteService } from "@/modules/notes/services/NoteService";
import type { TagService } from "@/modules/tags";

export class Dependencies {
  TagService!: TagService;
  NoteService!: NoteService;
}
