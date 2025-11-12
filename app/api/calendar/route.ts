import { NextResponse } from "next/server";

// Use Edge Runtime which has different IP ranges and might bypass some Cloudflare rules
export const runtime = "edge";

/**
 * API Route to fetch calendar from Easy-Speak
 * Uses Edge Runtime to try different IP ranges
 */
export async function GET() {
  try {
    const url = "https://easy-speak.org/webcal.php?c=1938";

    // Try with comprehensive browser-like headers
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        "Accept": "text/calendar,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Calendar API fetch failed:", {
        status: response.status,
        errorPreview: errorText.substring(0, 200),
      });
      return NextResponse.json(
        { error: "Failed to fetch calendar", status: response.status },
        { status: response.status }
      );
    }

    const icsData = await response.text();

    // Return the ICS data with appropriate headers
    return new NextResponse(icsData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Calendar API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
