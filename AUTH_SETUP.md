# Authentication setup

Better Auth and MongoDB run in `../Cat_harry_server`. Configure private credentials there using its `.env.example`.

The frontend forwards `/api/*` to Express through `BACKEND_API_URL`. The auth client and image upload UI use these same-origin URLs. Server-rendered pages request session identity from Express using `src/app/libs/session.ts`.

Keep `BETTER_AUTH_URL` and `FRONTEND_URL` in the backend set to the public frontend origin. The local Google OAuth callback remains `http://localhost:3000/api/auth/callback/google`.

See [backend setup](../Cat_harry_server/README.md).
