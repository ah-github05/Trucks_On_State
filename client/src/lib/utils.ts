import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Schedule } from "@shared/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isCurrentlyOpen(schedule: Schedule): boolean {
  // Get current time in CST (UTC-6) or CDT (UTC-5)
  const now = new Date();
  const cstTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[cstTime.getDay()];
  const currentTime = cstTime.getHours() * 60 + cstTime.getMinutes(); // Current time in minutes since midnight
  
  const todayHours = schedule[currentDay];
  
  if (!todayHours || todayHours.toLowerCase() === 'closed') {
    return false;
  }
  
  // Parse hours like "11:00 AM - 8:00 PM"
  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i;
  const match = todayHours.match(timeRegex);
  
  if (!match) {
    return false;
  }
  
  const [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;
  
  // Convert to 24-hour format and then to minutes
  let openTime = parseInt(startHour) * 60 + parseInt(startMin);
  let closeTime = parseInt(endHour) * 60 + parseInt(endMin);
  
  // Adjust for AM/PM
  if (startPeriod.toUpperCase() === 'PM' && parseInt(startHour) !== 12) {
    openTime += 12 * 60;
  } else if (startPeriod.toUpperCase() === 'AM' && parseInt(startHour) === 12) {
    openTime = parseInt(startMin); // 12 AM is 00:xx
  }
  
  if (endPeriod.toUpperCase() === 'PM' && parseInt(endHour) !== 12) {
    closeTime += 12 * 60;
  } else if (endPeriod.toUpperCase() === 'AM' && parseInt(endHour) === 12) {
    closeTime = parseInt(endMin); // 12 AM is 00:xx
  }
  
  // Handle overnight hours (e.g., 10 PM - 2 AM)
  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime <= closeTime;
  }
  
  return currentTime >= openTime && currentTime <= closeTime;
}
