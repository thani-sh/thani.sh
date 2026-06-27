import { getPosts } from '$lib/data';
import type { RequestHandler } from './$types';

const escapeXml = (s: string): string =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

/**
 * RSS 2.0 feed of all blog posts. Served at /rss.xml so feed readers can
 * subscribe without needing the site itself.
 */
export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;
	const posts = getPosts();

	const items = posts
		.map(
			(p) => `
		<item>
			<title>${escapeXml(p.title)}</title>
			<link>${origin}/blog/${p.slug}</link>
			<guid isPermaLink="true">${origin}/blog/${p.slug}</guid>
			<pubDate>${new Date(p.date).toUTCString()}</pubDate>
			<description>${escapeXml(p.summary)}</description>
		</item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>thani.sh</title>
		<link>${origin}</link>
		<description>Notes on building things.</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			// Cloudflare (adapter-cloudflare) will cache based on these headers.
			'Cache-Control': 'public, max-age=3600'
		}
	});
};