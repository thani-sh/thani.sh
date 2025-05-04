import { Post } from '$lib/server/db';
import type { NewPost } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

// Custom zod type to parse string[]
const jsonStringArray = z.preprocess(
	(val) => (typeof val === 'string' ? JSON.parse(val) : undefined),
	z.array(z.string())
);

const jsonObject = z.preprocess(
	(val) => (typeof val === 'string' ? JSON.parse(val) : {}),
	z.object({})
);

// Schema for updating a post
const updateSchema = z.object({
	slug: z.string(),
	tags: jsonStringArray,
	heading: z.string(),
	summary: z.string(),
	content: jsonObject
});

/**
 * Actions for updating a blog post.
 */
export const actions: Actions = {
	update: async ({ request, params }) => {
		try {
			// Parse the form data and validate it
			const data = await request.formData();
			const diff: Partial<NewPost> = updateSchema.parse({
				slug: data.get('slug')?.toString(),
				tags: data.get('tags')?.toString(),
				heading: data.get('heading')?.toString(),
				summary: data.get('summary')?.toString(),
				content: data.get('content')?.toString()
			});
			// Get current post from the database by slug
			const post = await Post.getBySlug(params.slug);
			if (!post) {
				return fail(404, { error: 'Post not found' });
			}
			// Update the post in the database
			await Post.modify(post.id, diff);
		} catch (error) {
			if (error === Post.ErrSlugTaken) {
				return fail(400, { error: 'Slug already taken' });
			}
			console.error('Error updating post:', error);
			return fail(500, { error: 'Failed to update post' });
		}
	}
};
