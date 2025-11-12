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
      className="bg-tm-yellow border-l-4 border-tm-maroon text-gray-900 p-4 mx-4 mt-4 rounded-r-lg shadow-md"
      role="alert"
    >
      <p className="font-bold flex items-center">
        <svg
          className="h-5 w-5 mr-2 text-tm-maroon"
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
        Notice
      </p>
      <p className="ml-7">{bannerState.message}</p>
      <p className="ml-7 mt-2 text-sm">
        <a href="/calendar" className="text-tm-blue hover:underline font-semibold">
          View full calendar →
        </a>
      </p>
    </div>
  );
}
