# StudioSpace authentication

Authentication runs in the Next.js app at `/api/auth/*`. The existing Express API on port 8000 continues to serve studio and category data. Do not expose the MongoDB URI, Google secret or Better Auth secret with a `NEXT_PUBLIC_` prefix.

## Environment

`.env.example` lists the required settings. The local `.env` retains existing values; missing settings were added. The misspelled `GOOGLE_CLIENT_SCREET` key was renamed to `GOOGLE_CLIENT_SECRET` without printing its value. Restart `npm run dev` after changing credentials.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` — existing Express API |
| `BETTER_AUTH_URL` | `http://localhost:3000` — Next.js origin |
| `BETTER_AUTH_SECRET` | Random secret of at least 32 characters. A new random value is generated during setup only if the original value is missing/empty. |
| `MONGODB_URI` | Your MongoDB connection string |
| `MONGODB_DB_NAME` | `studiospace_db` |
| `GOOGLE_CLIENT_ID` | Google OAuth Web application client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

For Google Cloud OAuth configuration, add:

- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- If the consent screen is in testing mode, add your Google account as a test user.

For deployment, replace the localhost origin and register the deployed callback URL in Google Cloud. Keep `BETTER_AUTH_SECRET` stable across deployments.

## Implemented flows

- Email registration: name, email, photo URL and password. Password needs 6–128 characters, one uppercase and one lowercase letter; password rules are checked on client and server.
- Successful email registration redirects to Login (no automatic sign-in).
- Email login uses the Remember me option and returns to a safe same-site callback URL or Home.
- Google signup/login uses the same Google OAuth flow and returns to the requested page or Home.
- Navbar shows Login/Register while signed out; name, profile picture, dashboard links and Logout while signed in.
- Dashboard routes validate sessions on the server. Refreshing a valid session does not send the user back to Login.
- Booking requests require login in the UI. Server authorization must also be enabled in Express as described below.
- Email verification and password reset are intentionally not implemented, per the project requirements. The Forgot password control is disabled.

Better Auth stores users, accounts and sessions in MongoDB. Passwords are hashed by Better Auth; no tokens or passwords are stored in browser localStorage. The adapter currently runs without multi-document transactions so both local standalone MongoDB and Atlas work. For a replica set, the adapter can be configured with `{ client }` to enable transactions.

## Required Express integration

The provided Express server was pasted into chat and is not in this repository. Its mutations are still public until you add authorization there. Next.js page protection alone does not protect Express endpoints.

Replace `app.use(cors())` with a credential-aware allowlist:

```js
app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true,
}));
```

Add these variables to the **Express server's** `.env`:

```dotenv
FRONTEND_URL=http://localhost:3000
AUTH_SERVER_URL=http://localhost:3000
```

For local development, both ports share the localhost cookie host. Verify the cookie through the Next.js auth server before accepting protected operations:

```js
async function requireUser(req, res, next) {
     const expectedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
     if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.get('origin') !== expectedOrigin) {
          return res.status(403).json({ message: 'Untrusted request origin' });
     }
     try {
          const response = await fetch(
               `${process.env.AUTH_SERVER_URL || 'http://localhost:3000'}/api/auth/get-session`,
               { headers: { cookie: req.headers.cookie || '' }, signal: AbortSignal.timeout(10000) },
          );
          if (!response.ok) return res.status(503).json({ message: 'Authentication unavailable' });
          const session = await response.json();
          if (!session?.user) return res.status(401).json({ message: 'Please log in' });
          req.user = session.user;
          next();
     } catch {
          return res.status(503).json({ message: 'Authentication unavailable' });
     }
}

// Replace the existing POST handler; do not register a second unprotected copy.
app.post('/api/studios', requireUser, async (req, res) => {
     const studio = {
          ...req.body,
          ownerId: req.user.id,
          ownerEmail: req.user.email,
          ownerName: req.user.name,
     };
     const result = await studiosCollection.insertOne(studio);
     res.status(201).send(result);
});
```

Apply `requireUser` to booking creation and update/delete operations too. Derive booking ownership from `req.user`, and check listing ownership for update/delete; never trust a client-supplied email or user ID. Recalculate booking costs on the server.

Browser requests to protected Express endpoints need `credentials: 'include'`. Booking already includes this option. The Add Studio request is also configured to include credentials.

On production domains, use a same-site reverse proxy or deliberately configured shared-domain cookies; localhost cookie sharing does not automatically work between unrelated domains. Better Auth's standard session cookie is not a JWT. The assignment's optional JWT challenge needs separate work if you choose it.

## Verification

After real credentials are set, register a new account, log in with email, refresh a dashboard page, log out, and verify the dashboard redirects back to Login. Test Google sign-in with an authorized test user. Wrong passwords and duplicate registrations should show errors, not success messages.

References: [Next.js integration](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), [Google OAuth](https://better-auth.com/docs/authentication/google).
