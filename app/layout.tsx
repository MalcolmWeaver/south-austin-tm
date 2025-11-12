import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { organizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    default: "South Austin Toastmasters | Public Speaking & Leadership",
    template: "%s | South Austin Toastmasters",
  },
  description:
    "Join South Austin Toastmasters - a community dedicated to developing communication and leadership skills through public speaking practice. Meetings every Tuesday at 7:00 PM.",
  keywords: [
    "Toastmasters",
    "Austin",
    "South Austin",
    "Public Speaking",
    "Leadership",
    "Communication Skills",
    "Pathways",
    "ACC",
    "Presentation Skills",
  ],
  openGraph: {
    title: "South Austin Toastmasters",
    description:
      "Develop communication and leadership skills in a supportive environment. Join us every Tuesday at 7:00 PM.",
    url: "https://southaustintoastmasters.org",
    siteName: "South Austin Toastmasters",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "South Austin Toastmasters",
    description: "Develop communication and leadership skills through public speaking practice.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <header>
          <Navigation />
        </header>
        <main className="flex-grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
