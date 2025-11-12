import ical, { CalendarComponent } from "node-ical";

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
  try {
    const url = `https://easy-speak.org/webcal.php?c=${clubId}`;
    console.log(JSON.stringify({
      level: "info",
      service: "calendar",
      action: "fetch_start",
      url,
      clubId,
    }));

    // Fetch with User-Agent header as shown in the example
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 14400 }, // Revalidate every 4 hours
    });

    console.log(JSON.stringify({
      level: "info",
      service: "calendar",
      action: "fetch_response",
      status: response.status,
      statusText: response.statusText,
    }));

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(JSON.stringify({
        level: "error",
        service: "calendar",
        action: "fetch_failed",
        status: response.status,
        statusText: response.statusText,
        errorBody,
      }));
      throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
    }

    const icsData = await response.text();
    console.log(JSON.stringify({
      level: "info",
      service: "calendar",
      action: "received_ics_data",
      dataLength: icsData.length,
    }));

    // Parse the iCal data
    const events = await ical.async.parseICS(icsData);
    console.log(JSON.stringify({
      level: "info",
      service: "calendar",
      action: "parsed_events",
      rawEventCount: Object.keys(events).length,
    }));

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

    console.log(JSON.stringify({
      level: "info",
      service: "calendar",
      action: "process_complete",
      totalEvents: calendarEvents.length,
      upcomingEvents: upcomingEvents.length,
    }));
    return upcomingEvents;
  } catch (error) {
    console.error(JSON.stringify({
      level: "error",
      service: "calendar",
      action: "fetch_error",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }));
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
