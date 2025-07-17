import { createAtom } from "@xstate/store";
import { Storage } from "../types/storage";

export const defaultStorage: Storage = {
  windowBounds: {},
  settings: {
    floatingWindow: {
      opacity: 1,
      opaqueOnFocus: false,
      shrinkOnBlur: false,
    }
  },
}

export const storageAtom = createAtom<Storage>(defaultStorage)