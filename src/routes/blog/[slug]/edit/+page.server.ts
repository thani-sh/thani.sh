import { Post } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async ({ request, params }) => {
		// Get the post from the database
		const currentData = await Post.getBySlug(params.slug);
		if (!currentData) {
			return fail(404, { error: 'Post not found' });
		}

		// Collect modified data
		const modifiedData: Partial<Post.NewPost> = {};
		const data = await request.formData();
		const slug = data.get('slug')?.toString();
		if (slug) {
			modifiedData.slug = slug;
		}
		const tags = data.get('tags')?.toString();
		if (tags) {
			modifiedData.tags = JSON.parse(tags);
		}
		const heading = data.get('heading')?.toString();
		if (heading) {
			modifiedData.heading = heading;
		}
		const summary = data.get('summary')?.toString();
		if (summary) {
			modifiedData.summary = summary;
		}
		const content = data.get('content')?.toString();
		if (content) {
			modifiedData.content = content;
		}

		try {
			// Update the post in the database
			await Post.modify(currentData.id, modifiedData);
		} catch (error) {
			if (error === Post.ErrSlugTaken) {
				return fail(400, { error: 'Slug already taken' });
			}
			console.error('Error updating post:', error);
			return fail(500, { error: 'Failed to update post' });
		}
	}
};
