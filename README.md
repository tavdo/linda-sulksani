# ლინდა & სულხანი — ქორწილის მოწვევა

ციფრული ქორწილის მოწვევა ლინდასა და სულხანისთვის — **13 სექტემბერი, 2026**, დარბაზი **რენესანსი** (ფრიდონ ხალვაშის 83, ბათუმი).

Built with Next.js, Framer Motion, GSAP, and Lenis smooth scrolling.

## Features

- **Cinematic preloader** with monogram reveal and golden shimmer
- **Fullscreen hero** with parallax, film grain, and particle effects
- **Interactive wax seal** opening experience
- **Scroll-driven love story** timeline
- **Glass-morphism event cards** with schedule and map
- **Live countdown** with animated number transitions
- **Editorial gallery** with fullscreen lightbox and swipe support
- **Premium RSVP form** with floating labels and validation
- **Floating music player** with vinyl-inspired UI
- **Multilingual support** (EN / FR)
- **Dark / light theme** toggle
- **Guest personalization** via URL params (`?guest=Name&id=123`)
- **Shareable links** and Web Share API support

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scrolling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

Edit wedding data in `constants/wedding-data.ts`:

- Couple names and initials
- Wedding date and venue
- Love story chapters
- Gallery images
- Schedule and dress code

Edit translations in `constants/translations.ts` for EN/FR copy.

## Assets

- **Images**: Currently uses Unsplash URLs. Replace with your own in `public/images/` and update `wedding-data.ts`.
- **Audio**: Add your ambient soundtrack to `public/audio/ambient-piano.mp3`.

## Guest Personalization

Share personalized links:

```
https://yoursite.com/?guest=Sarah%20Johnson&id=abc123
```

Optional language override: `?lang=fr`

## Deploy on Netlify

1. Push this repo to GitHub ([tavdo/wedding](https://github.com/tavdo/wedding)).
2. In [Netlify](https://app.netlify.com), click **Add new site → Import an existing project** and connect the repo.
3. Netlify auto-detects Next.js via `netlify.toml`. Build command: `npm run build`.
4. Add **Environment variables** (Site settings → Environment variables):

   | Variable | Value |
   |----------|-------|
   | `ADMIN_PASSWORD` | Your admin login password |
   | `ADMIN_SECRET` | Long random string (session signing) |
   | `NODE_VERSION` | `20` (optional, already in netlify.toml) |

5. Deploy. Your site will be live at `https://your-site.netlify.app`.

### Admin panel (production)

- Login: `https://your-site.netlify.app/admin/login`
- Dashboard: `https://your-site.netlify.app/admin`

On Netlify, wedding content, RSVPs, and uploaded photos are stored in **Netlify Blobs** (persistent across deploys). Locally, files are stored in `data/` and `public/uploads/`.

### Notes

- Change `ADMIN_PASSWORD` and `ADMIN_SECRET` before going live.
- Uploaded images are served from `/api/uploads/...` on Netlify.
- Free Netlify tier includes Blobs storage suitable for a wedding site.

## Production (self-hosted)

```bash
npm run build
npm start
```

## Project Structure

```
app/                  # Next.js app router
components/
  sections/           # Page sections (Hero, Gallery, RSVP, etc.)
  ui/                 # Reusable UI (GlassCard, AnimatedButton, etc.)
  layout/             # Navbar, Providers
  animations/         # GSAP hooks and Framer variants
constants/            # Wedding data and translations
hooks/                # Lenis, theme, language, countdown
styles/               # Global CSS and design tokens
types/                # TypeScript interfaces
utils/                # Helpers and personalization
public/               # Static assets (images, audio, video)
```
