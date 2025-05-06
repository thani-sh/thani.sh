import { Post } from '$lib/server/db';
import type { PageServerLoad } from './$types';

/**
 * Load recent blog posts for the homepage
 */
export const load: PageServerLoad = async () => {
	const posts = await Post.getAll();
	return { posts };
};
