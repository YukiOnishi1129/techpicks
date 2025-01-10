import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const joinWithSpace = (strList: Array<string>): string => {
  return strList.filter((str) => str !== "").join(" ");
};

export const splitBySpace = (input: string): string[] => {
  return input.trim().split(/\s+/);
};
