import { getCalendarEvents } from "./calendar";
import { logger } from "./logger";

export interface BannerState {
  show: boolean;
  message: string;
  nextMeetingDate?: Date;
}

/**
 * Check if there's a meeting next Tuesday
 * Returns banner state indicating whether to show "no meeting" alert
 */
export async function getNextTuesdayMeeting(): Promise<BannerState> {
  logger.info("banner", "function_start", {
    timestamp: new Date().toISOString(),
    mockMode: process.env.MOCK_NO_MEETING
  });

  try {
    // Get next Tuesday
    const today = new Date();
    const nextTuesday = getNextTuesday(today);

    logger.info("banner", "calculated_next_tuesday", {
      nextTuesday: nextTuesday.toISOString()
    });

    // Mock mode for testing "no meeting" banner
    if (process.env.MOCK_NO_MEETING === "true") {
      logger.info("banner", "mock_mode_active", {});
      const formattedDate = formatDate(nextTuesday);
      return {
        show: true,
        message: `No meeting on ${formattedDate}.`,
        nextMeetingDate: undefined,
      };
    }

    logger.info("banner", "calling_get_calendar_events", { clubId: "1938" });
    const events = await getCalendarEvents("1938");
    logger.info("banner", "received_calendar_events", { eventCount: events?.length ?? 0 });

    // If we couldn't fetch events, show generic message
    if (!events || events.length === 0) {
      return {
        show: true,
        message: "Check back soon for our next meeting schedule.",
        nextMeetingDate: undefined,
      };
    }

    // Check if there's a meeting next Tuesday
    const nextTuesdayMeeting = events.find((event) => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, nextTuesday);
    });

    if (!nextTuesdayMeeting) {
      // No meeting next Tuesday - show banner
      const formattedDate = formatDate(nextTuesday);
      return {
        show: true,
        message: `No meeting on ${formattedDate}.`,
        nextMeetingDate: undefined,
      };
    }

    // There is a meeting next Tuesday - don't show banner
    return {
      show: false,
      message: "",
      nextMeetingDate: nextTuesdayMeeting.start,
    };
  } catch (error) {
    logger.error("banner", "get_next_tuesday_error", error);
    // Default to not showing banner on error (avoid false alarms)
    return {
      show: false,
      message: "",
      nextMeetingDate: undefined,
    };
  }
}

/**
 * Helper: Get next Tuesday date (in CST)
 * @param from - Starting date (defaults to today)
 * @returns Next Tuesday's date in CST
 */
function getNextTuesday(from: Date = new Date()): Date {
  // Get date components in CST timezone using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = formatter.formatToParts(from);
  const year = parseInt(parts.find(p => p.type === "year")!.value);
  const month = parseInt(parts.find(p => p.type === "month")!.value) - 1; // 0-indexed
  const day = parseInt(parts.find(p => p.type === "day")!.value);

  // Create date in CST
  const dateInCST = new Date(year, month, day, 0, 0, 0, 0);

  const dayOfWeek = dateInCST.getDay();

  // Calculate days until next Tuesday
  // If today is Tuesday (2), next Tuesday is in 7 days
  // Otherwise, calculate days until next Tuesday
  let daysUntilTuesday: number;

  if (dayOfWeek === 2) {
    // Today is Tuesday, so next Tuesday is 7 days away
    daysUntilTuesday = 7;
  } else if (dayOfWeek < 2) {
    // Before Tuesday this week
    daysUntilTuesday = 2 - dayOfWeek;
  } else {
    // After Tuesday this week
    daysUntilTuesday = 7 - (dayOfWeek - 2);
  }

  dateInCST.setDate(dateInCST.getDate() + daysUntilTuesday);

  return dateInCST;
}

/**
 * Helper: Get date components in CST
 */
function getDateInCST(date: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  return {
    year: parseInt(parts.find(p => p.type === "year")!.value),
    month: parseInt(parts.find(p => p.type === "month")!.value),
    day: parseInt(parts.find(p => p.type === "day")!.value),
  };
}

/**
 * Check if two dates are the same day (ignoring time, in CST)
 */
function isSameDay(date1: Date, date2: Date): boolean {
  const d1 = getDateInCST(date1);
  const d2 = getDateInCST(date2);

  return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
}

/**
 * Format date as "Month Day, Year" (e.g., "November 19, 2025") in CST
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}
