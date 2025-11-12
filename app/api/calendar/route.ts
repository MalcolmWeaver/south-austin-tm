import { NextRequest, NextResponse } from "next/server";

// Use Edge Runtime which has different IP ranges and might bypass some Cloudflare rules
export const runtime = "edge";

/**
 * API Route to fetch calendar from Easy-Speak
 * Forwards the client's actual User-Agent to try to bypass Cloudflare
 */
export async function GET(request: NextRequest) {
  try {
    const url = "https://easy-speak.org/webcal.php?c=1938";

    // Get the client's actual User-Agent from the request
    const clientUserAgent = request.headers.get("user-agent") ||
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

    console.log("Calendar API: Using User-Agent:", clientUserAgent);

    // Try with comprehensive browser-like headers using client's User-Agent
    const response = await fetch(url, {
      headers: {
        "User-Agent": clientUserAgent,
        "Accept": "text/calendar,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
      },
    });

    console.log("Calendar API: Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Calendar API fetch failed:", {
        status: response.status,
        statusText: response.statusText,
        errorPreview: errorText.substring(0, 200),
        userAgent: clientUserAgent,
      });
      return NextResponse.json(
        {
          error: "Failed to fetch calendar",
          status: response.status,
          details: errorText.substring(0, 200)
        },
        { status: response.status }
      );
    }

    const icsData = await response.text();

    console.log("Calendar API: Success! Data length:", icsData.length);

    // Return the ICS data with appropriate headers
    return new NextResponse(icsData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "Access-Control-Allow-Origin": "*",
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
