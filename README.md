# South Austin Toastmasters Website

A modern, responsive website for the South Austin Toastmasters club, built with Next.js 15+ and featuring automatic calendar integration with Easy-Speak.

## Features

- **Home Page**: Club mission, about section, meeting information, and image placeholders
- **Members Page**: Resources for current members including Easy-Speak links and club goals
- **Guests Page**: Information for visitors with interactive FAQ accordion and condensed "What to Expect" section
- **Calendar Page**: Timeline view of meetings with automatic Easy-Speak integration (updates every 4 hours)
- **Responsive Design**: Mobile-first design with proper touch targets (48px minimum) and optimized layouts
- **SEO Optimized**: Full metadata, Open Graph tags, JSON-LD structured data, sitemap, and robots.txt
- **Toastmasters Branding**: Official TM colors (Blue #004165, Maroon #772432, Yellow #F2DF74)
- **Automatic Banner**: Shows alert when no meeting scheduled next Tuesday

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Calendar Integration**: node-ical for parsing Easy-Speak iCal feeds
- **Deployment**: Optimized for Vercel (free tier)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will auto-update as you edit files.

## Project Structure

```
south-austin-tm-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page
│   ├── members/            # Members page
│   ├── guests/             # Guests page
│   └── calendar/           # Calendar page with Easy-Speak integration
├── components/             # React components
│   ├── Navigation.tsx      # Site navigation
│   ├── Footer.tsx          # Footer with contact info
│   └── EventCard.tsx       # Calendar event display
├── lib/                    # Utilities
│   └── calendar.ts         # Easy-Speak calendar parsing
└── public/                 # Static assets
    └── images/             # Images (logo, banners, etc.)
```

## Customization

### Adding Your Club Branding

1. Add your club logo to `public/images/logo.png`
2. Update colors in `tailwind.config.ts` if desired
3. Replace placeholder social media links in `components/Footer.tsx`

### Updating Easy-Speak Club ID

The calendar is currently configured for club ID `1938`. To change it:

Edit `app/calendar/page.tsx` and update:
```typescript
const events = await getCalendarEvents("YOUR_CLUB_ID");
```

### Adding a Notice Banner

To display an alert (e.g., "No meeting this week"), uncomment the banner section in `app/page.tsx`:

```tsx
<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
  <p className="font-bold">Notice</p>
  <p>No meeting this week - [reason]</p>
</div>
```

## Deployment to Vercel (Free)

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your site will be live in minutes at `https://YOUR_PROJECT.vercel.app`

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to deploy.

## Environment Configuration

The calendar feature uses ISR (Incremental Static Regeneration) with a 6-hour revalidation period. No environment variables are required for basic functionality.

## Calendar Integration

The calendar automatically fetches events from Easy-Speak using the iCal feed:
- **Revalidation**: Every 6 hours
- **Format**: Parses meeting themes and word of the day
- **Display**: Shows upcoming events only
- **Features**: Add to Google Calendar, iCal feed subscription

## Performance

- **Static Generation**: Most pages are statically generated at build time
- **ISR**: Calendar page uses Incremental Static Regeneration
- **CDN**: All pages served from Vercel's global CDN
- **Optimized**: Next.js automatic image and font optimization

## License

This project is intended for use by South Austin Toastmasters club.

## Contributing

This is a club-specific website. For contributions, please contact the club officers.
