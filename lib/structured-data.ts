import type { CalendarEvent } from "./calendar";

/**
 * Organization schema for Toastmasters club
 * Used for improving search engine discoverability
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "South Austin Toastmasters",
  url: "https://southaustintoastmasters.org",
  logo: "https://southaustintoastmasters.org/images/logo.png",
  description:
    "A Toastmasters International club dedicated to developing communication and leadership skills through public speaking practice in a supportive environment.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1820 W. Stassney Lane, Room 1319",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78745",
    addressCountry: "US",
  },
  telephone: "512-351-2706",
  email: "southaustintoastmasters@gmail.com",
  sameAs: [
    "https://www.toastmasters.org",
    // Add Facebook and Instagram URLs when available
  ],
  areaServed: {
    "@type": "City",
    name: "Austin",
  },
  memberOf: {
    "@type": "Organization",
    name: "Toastmasters International",
    url: "https://www.toastmasters.org",
  },
};

/**
 * LocalBusiness schema for location-based search
 * Helps with local SEO and Google Business Profile integration
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "South Austin Toastmasters",
  image: "https://southaustintoastmasters.org/images/logo.png",
  "@id": "https://southaustintoastmasters.org",
  url: "https://southaustintoastmasters.org",
  telephone: "512-351-2706",
  priceRange: "Free for guests",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1820 W. Stassney Lane, Room 1319 (3rd Floor)",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78745",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.2239,
    longitude: -97.8207,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Tuesday",
    opens: "18:45", // 6:45 PM arrival time
    closes: "20:00", // 8:00 PM end time
  },
};

/**
 * Generate Event schema for calendar events
 * Improves event discoverability in search results
 */
export function generateEventSchema(event: CalendarEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.summary || "South Austin Toastmasters Meeting",
    description: event.theme
      ? `Meeting theme: ${event.theme}${event.wordOfTheDay ? `. Word of the day: ${event.wordOfTheDay}` : ""}`
      : event.description || "Join us for public speaking practice and leadership development.",
    startDate: event.start.toISOString(),
    endDate: event.end.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Austin Community College, South Austin Campus",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1820 W. Stassney Lane, Room 1319 (3rd Floor)",
        addressLocality: "Austin",
        addressRegion: "TX",
        postalCode: "78745",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 30.2239,
        longitude: -97.8207,
      },
    },
    organizer: {
      "@type": "Organization",
      name: "South Austin Toastmasters",
      url: "https://southaustintoastmasters.org",
    },
    offers: {
      "@type": "Offer",
      url: event.url || "https://southaustintoastmasters.org/guests",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    performer: {
      "@type": "Organization",
      name: "South Austin Toastmasters",
    },
  };
}

/**
 * Helper function to create JSON-LD script tag content
 */
export function createStructuredData(schema: object): string {
  return JSON.stringify(schema);
}
