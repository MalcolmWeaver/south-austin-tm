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
 * Helper: Get next Tuesday date
 * @param from - Starting date (defaults to today)
 * @returns Next Tuesday's date
 */
function getNextTuesday(from: Date = new Date()): Date {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);

  const dayOfWeek = date.getDay();

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

  date.setDate(date.getDate() + daysUntilTuesday);

  return date;
}

/**
 * Check if two dates are the same day (ignoring time)
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Format date as "Month Day, Year" (e.g., "November 19, 2025")
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
