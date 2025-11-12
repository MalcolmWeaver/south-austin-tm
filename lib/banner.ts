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
    logger.info("banner", "checking_for_meeting", {
      nextTuesday: nextTuesday.toISOString(),
      nextTuesdayFormatted: formatDate(nextTuesday),
      eventCount: events.length,
    });

    const nextTuesdayMeeting = events.find((event) => {
      const eventDate = new Date(event.start);
      const isSame = isSameDay(eventDate, nextTuesday);

      logger.info("banner", "comparing_event", {
        eventStart: event.start.toISOString(),
        eventSummary: event.summary,
        nextTuesday: nextTuesday.toISOString(),
        isSameDay: isSame,
        eventDateInCST: getDateInCST(eventDate),
        nextTuesdayInCST: getDateInCST(nextTuesday),
      });

      return isSame;
    });

    logger.info("banner", "meeting_search_result", {
      found: !!nextTuesdayMeeting,
      meetingSummary: nextTuesdayMeeting?.summary,
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
  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_start", fromDate: from.toISOString() }));

  // Get current date components in CST
  const cstDate = getDateInCST(from);
  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_cstDate", cstDate }));

  // Get the day of week in CST timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
  });

  const weekdayStr = formatter.format(from);
  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_weekdayStr", weekdayStr }));

  // Map weekday string to number (0 = Sunday, 1 = Monday, etc.)
  const weekdayMap: Record<string, number> = {
    'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
  };
  const dayOfWeek = weekdayMap[weekdayStr];
  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_dayOfWeek", dayOfWeek }));

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
  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_daysUntilTuesday", daysUntilTuesday }));

  // Create result date by adding days to the CST date components
  // We need to create a Date that represents the target Tuesday
  // The exact time doesn't matter since isSameDay() only compares date components in CST
  const targetDay = cstDate.day + daysUntilTuesday;

  // Create a date at noon UTC on the target day to avoid any timezone boundary issues
  // Since isSameDay() converts both dates to CST and compares only the date parts,
  // using noon UTC ensures we're solidly in the middle of the target day
  const resultDate = new Date(Date.UTC(cstDate.year, cstDate.month - 1, targetDay, 12, 0, 0));

  console.error(JSON.stringify({ level: "error", service: "banner", action: "getNextTuesday_resultDate", resultDate: resultDate.toISOString(), resultDateFormatted: formatDate(resultDate) }));

  return resultDate;
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
