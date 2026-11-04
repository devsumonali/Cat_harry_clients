# StudioSpace

StudioSpace connects creators with photography, film, podcast and music studios.

**Live site:** [StudioSpace](https://cat-harry-clients.vercel.app)

**Repositories:** [Frontend](https://github.com/devsumonali/Cat_harry_clients) | [Backend](https://github.com/devsumonali/Cat_harry_server)

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
2. Create `.env` in the frontend root with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   BACKEND_API_URL=http://localhost:8000/api
   ```
3. Configure private credentials in `../Cat_harry_server/.env`; see [backend setup](https://github.com/devsumonali/Cat_harry_server#readme).
4. Run `npm start` in the backend and `npm run dev` here.
5. Open http://localhost:3000.

Google redirect URI: `http://localhost:3000/api/auth/callback/google`.

## Routes

Public: `/`, `/studios`, `/studios/[id]`, `/explore_studios`, `/category/[slug]`, `/how_it_works`, `/host_space`, `/about`, `/login`, `/register`.

Private: `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/[id]`, and every `/dashboard/*` page. Booking and saving a studio also require login. Edit pages additionally check listing ownership.

## Architecture

All studio, booking, wishlist and message data goes through Express API helpers in `src/app/libs/api.ts`. My Bookings uses `GET /api/studios/my-booking?email=...`. Better Auth, MongoDB and ImgBB uploads run in Express. Next.js rewrites `/api/*` to Express, keeping browser sessions on the frontend origin. The backend issues a short-lived JWT as a HTTPOnly cookie after authentication and requires it for private API access.

## Checks

`node scripts/check-api.cjs` checks frontend API endpoint/payload contracts with mocked fetch.

- `npm run build`
- `npx tsc --noEmit`
- `npx eslint src/app src/proxy.ts`
- Backend checks live in `../Cat_harry_server/scripts/`.

## Examiner access and submission

Dedicated examiner credentials are pending. Until they are supplied, use Register on the live site to create a test account, then log in. Do not use or publish personal account credentials.

Before submission, supply dedicated examiner credentials and ensure meaningful GitHub commit history (at least 15 client and 8 server commits). Verify Google login, image upload and private-route reload on the deployed site.

Authentication uses Better Auth sessions plus a short-lived JWT stored in a HTTPOnly cookie. Set `JWT_SECRET` only in the backend environment before deployment. Optional PDF invoices are not implemented.
