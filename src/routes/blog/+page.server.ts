import { Post } from '$lib/server/db';
import type { PageServerLoad } from './$types';

/**
 * Load a list of blog posts
 */
export const load: PageServerLoad = async () => {
	const posts = await Post.getAll();
	return { posts };
};
