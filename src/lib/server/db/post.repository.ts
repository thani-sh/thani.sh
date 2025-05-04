import type { NewPost, Post, PostItem } from '$lib/types';
import { desc, eq } from 'drizzle-orm';
import { db } from './drizzle';
import { postTable } from './post.schema';

// Re-export the post table!
export { postTable as table };

// Export known errors for this repository
export const ErrSlugTaken = new Error('Slug already taken');

/**
 * Fetch all posts from the database
 */
export async function getAll(): Promise<PostItem[]> {
	return await db
		.select({
			id: postTable.id,
			slug: postTable.slug,
			tags: postTable.tags,
			heading: postTable.heading,
			summary: postTable.summary,
			created_at: postTable.created_at
		})
		.from(postTable)
		.orderBy(desc(postTable.created_at))
		.all();
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
	if (Object.keys(post).length === 0) {
		return;
	}
	if (post.slug) {
		// Check if the updated slug is already taken
		const existingPost = await getBySlug(post.slug);
		if (existingPost && existingPost.id !== id) {
			throw ErrSlugTaken;
		}
	}
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
