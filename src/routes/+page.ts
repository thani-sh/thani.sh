import type { PageLoad } from './$types';

/**
 * Load recent blog posts for the homepage
 */
export const load: PageLoad = async () => {
	return { posts: [] as any[] };
};
