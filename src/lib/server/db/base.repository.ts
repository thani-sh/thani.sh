import { DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle(DB_URL);
