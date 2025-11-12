import ical from "node-ical";
import { logger } from "./logger";

export interface CalendarEvent {
  uid: string;
  summary: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  url?: string;
  theme?: string;
  wordOfTheDay?: string;
}

/**
 * Fetches and parses the Easy-Speak calendar feed
 * @param clubId - The Easy-Speak club ID (e.g., 1938)
 * @returns Array of parsed calendar events
 */
export async function getCalendarEvents(clubId: string = "1938"): Promise<CalendarEvent[]> {
  logger.info("calendar", "function_entry", {
    clubId,
    timestamp: new Date().toISOString()
  });

  let icsData: string;

  try {
    // First, try to read from the static file synced by GitHub Actions
    logger.info("calendar", "trying_static_file", { path: "/calendar.ics" });

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const staticFileUrl = `${baseUrl}/calendar.ics`;

    const staticResponse = await fetch(staticFileUrl, {
      cache: "no-store",
    });

    if (staticResponse.ok) {
      icsData = await staticResponse.text();

      // Verify it's valid calendar data
      if (icsData.includes("BEGIN:VCALENDAR")) {
        logger.info("calendar", "using_static_file", { dataLength: icsData.length });
      } else {
        throw new Error("Static file doesn't contain valid calendar data");
      }
    } else {
      throw new Error(`Static file not found: ${staticResponse.status}`);
    }
  } catch (staticError) {
    // Fallback: Try to fetch directly from Easy-Speak
    // Note: This will likely be blocked by Cloudflare from Vercel's servers
    logger.info("calendar", "static_file_failed_trying_direct_fetch", {
      error: staticError instanceof Error ? staticError.message : String(staticError)
    });

    const url = `https://easy-speak.org/webcal.php?c=${clubId}`;
    logger.info("calendar", "fetch_start", { url, clubId });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    logger.info("calendar", "fetch_response", {
      status: response.status,
      statusText: response.statusText,
    });

    if (!response.ok) {
      let errorBody = "";
      try {
        errorBody = await response.text();
      } catch (e) {
        logger.error("calendar", "error_reading_body", e);
      }

      const error = new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
      logger.error("calendar", "fetch_failed", error, {
        status: response.status,
        errorBody: errorBody.substring(0, 200),
        note: "Both static file and direct fetch failed. Calendar will show no events."
      });
      throw error;
    }

    icsData = await response.text();
    logger.info("calendar", "received_ics_data_from_direct_fetch", { dataLength: icsData.length });
  }

  try {

    // Parse the iCal data
    const events = await ical.async.parseICS(icsData);
    logger.info("calendar", "parsed_events", {
      rawEventCount: Object.keys(events).length,
    });

    // Filter and transform events
    const calendarEvents: CalendarEvent[] = [];

    for (const k in events) {
      const event = events[k];

      // Only process VEVENT type components
      if (event.type === "VEVENT") {
        // node-ical types are incomplete, using any for runtime properties
        const vevent = event as any;

        // Parse description for theme and word of the day
        const description = vevent.description || "";
        let theme: string | undefined;
        let wordOfTheDay: string | undefined;

        // Extract theme (after "Meeting theme:")
        const themeMatch = description.match(/Meeting theme:\s*(.+?)(?:\n|$|WOTD)/i);
        if (themeMatch) {
          theme = themeMatch[1].trim();
        }

        // Extract word of the day (after "WOTD:")
        const wotdMatch = description.match(/WOTD:\s*(.+?)(?:\n|$)/i);
        if (wotdMatch) {
          wordOfTheDay = wotdMatch[1].trim();
        }

        calendarEvents.push({
          uid: vevent.uid || "",
          summary: vevent.summary || "South Austin Toastmasters Meeting",
          description: description,
          start: new Date(vevent.start),
          end: new Date(vevent.end),
          location: vevent.location || "",
          url: vevent.url || undefined,
          theme,
          wordOfTheDay,
        });
      }
    }

    // Sort events by start date (ascending)
    calendarEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    // Filter to only show upcoming events (today and future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = calendarEvents.filter(event => event.start >= today);

    logger.info("calendar", "process_complete", {
      totalEvents: calendarEvents.length,
      upcomingEvents: upcomingEvents.length,
    });
    return upcomingEvents;
  } catch (error) {
    logger.error("calendar", "fetch_error", error);
    return [];
  }
}

/**
 * Formats a date for display
 */
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a time for display
 */
export function formatEventTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

/**
 * Checks if an event is happening today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if an event is happening this week
 */
export function isThisWeek(date: Date): boolean {
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);

  return date >= today && date <= weekFromNow;
}
