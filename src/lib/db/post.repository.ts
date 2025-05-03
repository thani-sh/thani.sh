import { desc, eq, type InferSelectModel } from 'drizzle-orm';
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

/**
 * Fetch all posts from the database
 */
export async function getAll(): Promise<Post[]> {
	return await db.select().from(postTable).orderBy(desc(postTable.created_at)).all();
}

/**
 * Fetch a post by its ID
 */
export async function getById(id: number): Promise<Post | undefined> {
	return await db.select().from(postTable).where(eq(postTable.id, id)).get();
}

/**
 * Fetch a post by its slug
 */
export async function getBySlug(slug: string): Promise<Post | undefined> {
	return await db.select().from(postTable).where(eq(postTable.slug, slug)).get();
}

/**
 * Insert a new post in the database
 */
export async function insert(post: NewPost): Promise<Post> {
	const now = new Date();
	const [newPost] = await db
		.insert(postTable)
		.values({ ...post, created_at: now, updated_at: now })
		.returning();
	return newPost;
}

/**
 * Modify an existing post in the database
 */
export async function modify(id: number, post: Partial<NewPost>): Promise<void> {
	await db
		.update(postTable)
		.set({ ...post, updated_at: new Date() })
		.where(eq(postTable.id, id));
}

/**
 * Remove a post from the database
 */
export async function remove(id: number): Promise<void> {
	await db.delete(postTable).where(eq(postTable.id, id));
}
