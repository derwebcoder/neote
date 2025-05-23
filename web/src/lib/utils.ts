import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * shadcn ui utils!!!
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
