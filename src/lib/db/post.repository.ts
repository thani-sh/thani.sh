import { drizzle } from 'drizzle-orm/libsql';
import { eq, desc, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { db } from './base.repository';
import { postTable } from './post.schema';

// Re-export the post table!
export { postTable as table };

// Export types used when fetching the full post item
export type Post = InferSelectModel<typeof postTable>;

// Export types used when fetching a list of posts
export type PostItem = Pick<Post, 'id' | 'slug' | 'heading' | 'summary' | 'created_at'>;

// Export types used when creating a new post
export type NewPost = Omit<Post, 'id' | 'created_at' | 'updated_at'>;

// TOOD: export function to get a list of posts
export async function getPosts(): Promise<Post[]> {
	return await db.select().from(postTable).orderBy(desc(postTable.created_at)).all();
}

// TOOD: export function to get a post by id
// TOOD: export function to create a post
// TOOD: export function to update a post
// TOOD: export function to delete a post
