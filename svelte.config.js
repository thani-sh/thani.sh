import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { createHighlighter } from 'shiki';

function getAbsolutePath(relativePath) {
	return new URL(relativePath, import.meta.url).pathname;
}

const theme = 'one-dark-pro';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'go', 'bash', 'json', 'html', 'markdown', 'handlebars', 'css']
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
				blog: getAbsolutePath('./src/lib/layout/blog.svelte'),
				page: getAbsolutePath('./src/lib/layout/page.svelte')
			}
		})
	],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
