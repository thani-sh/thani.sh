import { Post } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

/**
 * Load blog post by slug
 */
export const load: LayoutServerLoad = async ({ params }) => {
	const post = await Post.getBySlug(params.slug);
	if (!post) {
		error(404, 'Post not found');
	}
	return { post };
};
