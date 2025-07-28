import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AttendedTypeEnum } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function combineDateTime(
  date: Date,
  timeStr: string,
  timeFormat: "AM" | "PM"
) {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = Number.parseInt(hourStr, 10);
  const minute = Number.parseInt(minuteStr || "0", 10);

  // convert to 24 hour format
  if (timeFormat === "PM" && hour < 12) {
    hour += 12;
  } else if (timeFormat === "AM" && hour === 12) {
    hour = 0;
  }

  const result = new Date(date);
  result.setHours(hour, minute, 0, 0);
  return result;
}

export const formatColumnTitle = (columnType: AttendedTypeEnum): string => {
  return columnType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
