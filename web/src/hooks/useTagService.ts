import { DI } from "@/modules/dependency-injection";
import { useRef } from "react";

export const useTagService = () => {
  return useRef(DI.resolve("TagService")).current;
};
