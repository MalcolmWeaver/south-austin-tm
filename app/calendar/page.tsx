import { getCalendarEvents } from "@/lib/calendar";
import EventCard from "@/components/EventCard";
import { localBusinessSchema, generateEventSchema } from "@/lib/structured-data";

// Enable ISR - revalidate every 4 hours
export const revalidate = 14400;

export default async function CalendarPage() {
  // Fetch calendar events from Easy-Speak
  const events = await getCalendarEvents("1938");

  // Log for debugging in deployment
  console.log(JSON.stringify({
    level: "info",
    service: "calendar_page",
    action: "render",
    eventCount: events.length,
  }));

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      {/* JSON-LD Structured Data for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* JSON-LD Structured Data for Each Event */}
      {events.map((event) => (
        <script
          key={`schema-${event.uid}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateEventSchema(event)),
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meeting Calendar</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View our upcoming meetings and themes. All meetings are held on Tuesdays at 7:00 PM
            at Austin Community College, South Austin Campus.
          </p>
        </div>

        {/* Calendar Instructions */}
        <div className="bg-blue-50 border-l-4 border-tm-blue p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign Up for Roles</h2>
          <p className="text-gray-700 mb-3">
            Members can sign up for meeting roles on Easy-Speak. Click on any event below to
            view details and sign up.
          </p>
          <a
            href="https://easy-speak.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-tm-blue text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors font-semibold"
          >
            Go to Easy-Speak
          </a>
        </div>

        {/* Events List - Timeline View */}
        {events.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Meetings</h2>

            {/* Desktop: Timeline view */}
            <div className="hidden md:block relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-tm-blue"></div>

              <div className="space-y-8">
                {events.map((event, index) => (
                  <div key={event.uid} className="relative pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 bg-tm-maroon rounded-full border-4 border-white shadow-md"></div>

                    {/* Event card */}
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Stacked cards */}
            <div className="md:hidden space-y-6">
              {events.map((event) => (
                <EventCard key={event.uid} event={event} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Upcoming Meetings</h3>
            <p className="text-gray-600 mb-4">
              Check back soon for our next meeting schedule, or contact us for more information.
            </p>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Troubleshooting Information
              </summary>
              <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-4 rounded">
                <p className="mb-2">
                  If you&apos;re seeing this and expect events to be shown, check the server logs for
                  calendar fetch errors. The logs will show:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Whether the network request was attempted</li>
                  <li>HTTP response status codes</li>
                  <li>Any parsing or processing errors</li>
                  <li>Number of events fetched and filtered</li>
                </ul>
                <p className="mt-2">
                  Calendar data is cached for 4 hours. You may need to wait for the cache to expire
                  or trigger a redeployment to see updates.
                </p>
              </div>
            </details>
          </div>
        )}

        {/* Meeting Info Reminder */}
        <div className="mt-8 bg-gradient-to-r from-tm-blue to-tm-maroon text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Meeting Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">When</h4>
              <p>Every Tuesday at 7:00 PM - 8:00 PM CST</p>
              <p className="text-gray-200 text-sm mt-1">Arrive by 6:45 PM</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Where</h4>
              <p>Austin Community College</p>
              <p>South Austin Campus, Room 1319 (3rd Floor)</p>
              <p className="text-gray-200 text-sm mt-1">1820 W. Stassney Lane, Austin, TX 78745</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
