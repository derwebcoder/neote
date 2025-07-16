import { createAtom } from "@xstate/store";
import { Storage } from "../types/storage";

export const storageAtom = createAtom<Storage>({})