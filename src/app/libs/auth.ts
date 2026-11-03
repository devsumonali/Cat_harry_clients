import 'server-only';
import { betterAuth } from 'better-auth';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import type { AuthMongoGlobal } from '@/app/types/type';
import { getPasswordError } from './auth-utils';

const mongoGlobal = globalThis as typeof globalThis & AuthMongoGlobal;
const client = mongoGlobal.authMongoClient ?? new MongoClient(
     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
     { serverSelectionTimeoutMS: 10000 },
);
if (process.env.NODE_ENV !== 'production') mongoGlobal.authMongoClient = client;
const db = client.db(process.env.MONGODB_DB_NAME || 'studiospace_db');

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
