import type { PageServerLoad } from './$types';

/**
 * Load recent blog posts for the homepage
 */
export const load: PageServerLoad = async () => {
	return { posts: [] };
};
