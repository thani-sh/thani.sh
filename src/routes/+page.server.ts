import type { PageServerLoad } from './$types';
import { getPosts } from '../lib/data';

/**
 * Load recent blog posts for the homepage
 */
export const load: PageServerLoad = async () => {
	return { posts: getPosts() };
};
