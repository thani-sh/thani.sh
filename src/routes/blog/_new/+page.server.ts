import { Post } from '$lib/server/db';
import type { NewPost } from '$lib/types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

// Custom zod type to parse string[]
const jsonStringArray = z.preprocess(
	(val) => (typeof val === 'string' ? JSON.parse(val) : []),
	z.array(z.string())
);

const jsonObject = z.preprocess(
	(val) => (typeof val === 'string' ? JSON.parse(val) : {}),
	z.object({})
);

// Schema for updating a post
const insertSchema = z.object({
	slug: z.string().min(1, 'Slug is required'),
	tags: jsonStringArray,
	heading: z.string().min(1, 'Heading is required'),
	summary: z.string().min(1, 'Summary is required'),
	content: jsonObject
});

/**
 * Actions for updating a blog post.
 */
export const actions: Actions = {
	insert: async ({ request }) => {
		try {
			// Parse the form data and validate it
			const data = await request.formData();
			const post: NewPost = insertSchema.parse({
				slug: data.get('slug')?.toString(),
				tags: data.get('tags')?.toString(),
				heading: data.get('heading')?.toString(),
				summary: data.get('summary')?.toString(),
				content: data.get('content')?.toString()
			});
			// Update the post in the database
			await Post.insert(post);
		} catch (error) {
			if (error === Post.ErrSlugTaken) {
				return fail(400, { error: 'Slug already taken' });
			}
			console.error('Error updating post:', error);
			return fail(500, { error: 'Failed to update post' });
		}
	}
};
