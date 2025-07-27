import { useEffect, useState } from "react";
import { DI } from "@/modules/dependency-injection";

export const useGetAllTags = () => {
  const tagService = DI.resolve("TagService");
  const [tags, setTags] = useState(tagService.getAll());
  useEffect(() => {
    const unsubscribe = tagService.observe(setTags);
    return () => unsubscribe();
  }, [tagService]);
  return tags;
};