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
      className="bg-tm-yellow border-b-4 border-tm-maroon text-gray-900 py-4 px-4"
      role="alert"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-base sm:text-lg">
          <svg
            className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-tm-maroon flex-shrink-0"
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
          <span className="font-bold mr-2">Notice:</span>
          <span className="font-medium">{bannerState.message}</span>
          <a href="/calendar" className="ml-3 text-tm-blue hover:underline font-bold whitespace-nowrap">
            View calendar →
          </a>
        </div>
      </div>
    </div>
  );
}
