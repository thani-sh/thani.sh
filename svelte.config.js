import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { createHighlighter } from 'shiki';

function getAbsolutePath(relativePath) {
	const url = new URL(relativePath, import.meta.url);
	return url.pathname;
}

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'go', 'bash', 'json', 'html', 'markdown']
});

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrettyCode],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
					return `{@html \`${html}\` }`;
				}
			},
			layout: {
				blog: getAbsolutePath('./src/routes/blog/(layouts)/blog.svelte')
			}
		})
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
