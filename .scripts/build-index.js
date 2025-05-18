import fs from 'fs';
import path from 'path';

const paths = {
	base: new URL('../', import.meta.url).pathname,
	blog: new URL('../src/routes/blog', import.meta.url).pathname,
	data: new URL('../src/lib/data.ts', import.meta.url).pathname
};

const slugs = fs
	.readdirSync(paths.blog)
	.filter((file) => fs.statSync(path.join(paths.blog, file)).isDirectory())
	.reverse()
	.map((file) => path.parse(file).name);

const posts = slugs.map((slug) => {
	const file = path.join(paths.blog, slug, '+page.svx');
	const text = fs.readFileSync(file, 'utf-8');
	// read frontmatter
	const frontmatter = text.match(/---\n([\s\S]+?)\n---/);
	if (!frontmatter) {
		throw new Error(`No frontmatter found in ${file}`);
	}
	const frontmatterText = frontmatter[1];
	const frontmatterLines = frontmatterText.split('\n');
	const frontmatterObj = {};
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

const content = `
export type Post = {
	title: string;
	slug: string;
	date: string;
	summary: string;
};

/**
 * All slugs
 */
const slugs: string[] = ${JSON.stringify(slugs, null, 2)};

/**
 * All posts
 */
const posts: Post[] = ${JSON.stringify(posts, null, 2)};

/**
 * Get post by slug
 */
export const getPost = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
};

/**
 * Get all posts
 */
export const getPosts = (): Post[] => {
  return posts;
};

/**
 * Get all slugs
 */
export const getSlugs = (): string[] => {
  return slugs;
};
`;

fs.writeFileSync(paths.data, content, 'utf-8');
console.log('Index file generated successfully!');
console.log(`File written to ${paths.data}`);
