import { getNextTuesdayMeeting } from "@/lib/banner";

/**
 * Automatic banner component that shows/hides based on meeting schedule
 * Server component that checks if there's a meeting next Tuesday
 */
export default async function AutoBanner() {
  const bannerState = await getNextTuesdayMeeting();

  if (!bannerState.show) {
    return null; // Don't render anything if no banner needed
  }

  return (
    <div
      className="bg-tm-yellow border-b-4 border-tm-maroon text-gray-900 py-3 px-4"
      role="alert"
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-sm sm:text-base">
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-tm-maroon flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center">
            <p className="font-medium">
              {bannerState.message}
            </p>
            <a href="/calendar" className="text-tm-blue hover:underline font-bold inline-block mt-1">
              View calendar →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
