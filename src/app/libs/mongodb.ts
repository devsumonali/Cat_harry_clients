import 'server-only';
import { MongoClient } from 'mongodb';
import type { AuthMongoGlobal } from '@/app/types/type';

const mongoGlobal = globalThis as typeof globalThis & AuthMongoGlobal;
const client = mongoGlobal.authMongoClient ?? new MongoClient(
     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
     { serverSelectionTimeoutMS: 10000 },
);
if (process.env.NODE_ENV !== 'production') mongoGlobal.authMongoClient = client;
export const db = client.db(process.env.MONGODB_DB_NAME || 'studiospace_db');
