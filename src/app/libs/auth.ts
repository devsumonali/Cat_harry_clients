import 'server-only';
import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { db } from './mongodb';
import { getPasswordError } from './auth-utils';

export const auth = betterAuth({
     appName: 'StudioSpace',
     baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
     secret: process.env.BETTER_AUTH_SECRET,
     database: mongodbAdapter(db),
     emailAndPassword: {
          enabled: true,
          minPasswordLength: 6,
          maxPasswordLength: 128,
          autoSignIn: false,
          requireEmailVerification: false,
     },
     socialProviders: {
          google: {
               clientId: process.env.GOOGLE_CLIENT_ID || '',
               clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          },
     },
     hooks: {
          before: createAuthMiddleware(async (ctx) => {
               if (ctx.path !== '/sign-up/email') return;
               const message = getPasswordError(ctx.body?.password);
               if (message) throw new APIError('BAD_REQUEST', { message });
               if (typeof ctx.body?.name !== 'string' || !ctx.body.name.trim()) {
                    throw new APIError('BAD_REQUEST', { message: 'Please enter your name.' });
               }
          }),
     },
});
