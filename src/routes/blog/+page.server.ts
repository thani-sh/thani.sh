import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Load a list of blog posts
 */
export const load: PageServerLoad = async () => {
	redirect(302, '/');
};
