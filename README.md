# StudioSpace

StudioSpace connects creators with photography, film, podcast and music studios.

**Live site:** Pending deployment. Add the actual deployed URL before submission.

## Features

- Email/password and Google sign-in with persistent Better Auth sessions.
- Explore studios with category, amenity and price filters, sorting and pagination.
- Private studio creation, pre-filled editing and owner-only listing management.
- ImgBB uploads, studio galleries, host details and API-provided reviews.
- Booking requests, email-scoped My Bookings and pending-only cancellation.
- Host confirmation/completion, saved studios and host messaging.
- Responsive light/dark themes, custom dialogs, loading skeletons and a custom 404 page.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Better Auth, Swiper, React Hot Toast, Express and MongoDB. ImgBB provides image hosting.

## Run locally

1. Install dependencies with `npm install`.
2. Configure frontend API URLs using `.env.example`.
3. Configure private credentials in `../Cat_harry_server/.env`; see [backend setup](../Cat_harry_server/README.md).
4. Run `npm start` in the backend and `npm run dev` here.
5. Open http://localhost:3000.

Google redirect URI: `http://localhost:3000/api/auth/callback/google`.

## Routes

Public: `/`, `/studios`, `/studios/[id]`, `/explore_studios`, `/category/[slug]`, `/how_it_works`, `/host_space`, `/about`, `/login`, `/register`.

Private: `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/[id]`, and every `/dashboard/*` page. Booking and saving a studio also require login. Edit pages additionally check listing ownership.

## Architecture

All studio, booking, wishlist and message data goes through Express API helpers in `src/app/libs/api.ts`. My Bookings uses `GET /api/studios/my-booking?email=...`. Better Auth, MongoDB and ImgBB uploads run in Express. Next.js rewrites `/api/*` to Express, keeping browser sessions on the frontend origin. No custom JWT implementation has been added; that is the next phase.

## Checks

`node scripts/check-api.cjs` checks frontend API endpoint/payload contracts with mocked fetch.

- `npm run build`
- `npx tsc --noEmit`
- `npx eslint src/app src/proxy.ts`
- Backend checks live in `../Cat_harry_server/scripts/`.

## Examiner access and submission

A dedicated examiner account has not been supplied. Create one through Register on the deployed app and put its email/password here before submission; never publish your personal account credentials.

Before submission: add the live URL, the dedicated examiner credentials, both GitHub repository links, and meaningful commit history (at least 15 client and 8 server commits). Verify Google login, image upload and cross-origin sessions on the deployed domains.

Optional PDF invoices are not implemented. JWT security is intentionally deferred. Backend deployment and real OAuth/upload verification require your credentials and backend setup.
