import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const postTable = sqliteTable('posts', {
	id: integer().primaryKey({ autoIncrement: true }),
	slug: text().notNull(),
	tags: text({ mode: 'json' }).$type<string[]>().notNull(),
	heading: text().notNull(),
	summary: text().notNull(),
	content: text({ mode: 'json' }).$type<object>().notNull(),
	created_at: integer({ mode: 'timestamp' }).notNull(),
	updated_at: integer({ mode: 'timestamp' }).notNull()
});
