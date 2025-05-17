import fs from 'node:fs';
import path from 'node:path';
import type { PageServerLoad } from './$types';

type Post = {
	title: string;
	slug: string;
	date: string;
	summary: string;
};

/**
 * Load recent blog posts for the homepage
 */
export const load: PageServerLoad = async () => {
	/**
	 * TODO: Fetch posts from the filesystem
	 * All directories in the blog directory are considered blog posts
	 * and the directory name is the slug. Other details can be extracted
	 * from the +page.svx file in the directory.
	 */
	const base = new URL('blog', import.meta.url).pathname;
	const slugs = fs
		.readdirSync(base)
		.filter((file) => fs.statSync(path.join(base, file)).isDirectory())
		.reverse()
		.map((file) => path.parse(file).name);
	const posts: Post[] = slugs.map((slug) => {
		const file = path.join(base, slug, '+page.svx');
		const text = fs.readFileSync(file, 'utf-8');
		// read frontmatter
		const frontmatter = text.match(/---\n([\s\S]+?)\n---/);
		if (!frontmatter) {
			throw new Error(`No frontmatter found in ${file}`);
		}
		const frontmatterText = frontmatter[1];
		const frontmatterLines = frontmatterText.split('\n');
		const frontmatterObj: Record<string, string> = {};
		frontmatterLines.forEach((line) => {
			const [key, value] = line.split(':');
			if (key && value) {
				frontmatterObj[key.trim()] = value.trim();
			}
		});
		const title = frontmatterObj['title'] || slug;
		const date = frontmatterObj['date'] || 'Unknown date';
		const summary = frontmatterObj['description'] || 'No summary';
		return { title, slug, date, summary };
	});
	return { posts };
};
