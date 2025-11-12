import { CalendarEvent, formatEventDate, formatEventTime, isToday, isThisWeek } from "@/lib/calendar";

interface EventCardProps {
  event: CalendarEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const today = isToday(event.start);
  const thisWeek = isThisWeek(event.start);

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 ${
        today ? "border-tm-yellow" : thisWeek ? "border-tm-blue" : "border-gray-300"
      }`}
    >
      {/* Badge for today or this week */}
      {today && (
        <span className="inline-block bg-tm-yellow text-tm-blue text-xs font-bold px-2 py-1 rounded mb-3">
          TODAY
        </span>
      )}
      {!today && thisWeek && (
        <span className="inline-block bg-tm-blue text-white text-xs font-bold px-2 py-1 rounded mb-3">
          THIS WEEK
        </span>
      )}

      {/* Event Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.summary}</h3>

      {/* Date and Time */}
      <div className="text-gray-700 mb-4">
        <p className="font-semibold">{formatEventDate(event.start)}</p>
        <p className="text-gray-600">
          {formatEventTime(event.start)}
        </p>
      </div>

      {/* Theme */}
      {event.theme && event.theme !== "TBA" && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700">Meeting Theme:</p>
          <p className="text-gray-800">{event.theme}</p>
        </div>
      )}

      {/* Word of the Day */}
      {event.wordOfTheDay && (
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700">Word of the Day:</p>
          <p className="text-gray-800 italic">{event.wordOfTheDay}</p>
        </div>
      )}

      {/* Location */}
      {event.location && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700">Location:</p>
          <p className="text-gray-600 text-sm">{formatLocation(event.location)}</p>
        </div>
      )}

      {/* Link to Easy-Speak */}
      {event.url && (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-tm-blue hover:underline font-semibold text-sm"
        >
          View on Easy-Speak →
        </a>
      )}
    </div>
  );
}

/**
 * Formats the location string to be more readable
 */
function formatLocation(location: string): string {
  // The location string from Easy-Speak is quite long, let's simplify it
  if (location.includes("Austin Community College")) {
    return "Austin Community College, South Austin Campus, Room 1319 (3rd Floor)";
  }
  return location;
}
