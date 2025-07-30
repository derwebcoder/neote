import { useEffect, useState } from "react";
import { DI } from "@/modules/dependency-injection";

export const useGetAllTags = () => {
  const tagService = DI.resolve("TagService");
  const [tags, setTags] = useState(tagService.getAll());
  useEffect(() => {
    const unsubscribe = tagService.observe((tags) => {
      console.log(tags)
      setTags(tags)
    });
    return () => unsubscribe();
  }, [tagService]);
  return tags;
};