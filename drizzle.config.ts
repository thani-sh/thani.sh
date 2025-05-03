import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './.db',
	schema: ['./src/lib/db/post.schema.ts'],
	dialect: 'sqlite',
	dbCredentials: { url: process.env.DB_URL! }
});
