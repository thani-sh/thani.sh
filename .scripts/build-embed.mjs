// Bundle each blog embed-poc into a single self-contained HTML file.
//
// Replaces the previous Bun-based script. Bun's HTML entry support reads
// the HTML, follows the <script type="module"> tag, bundles the module,
// and rewrites the script src. esbuild doesn't have that exact feature,
// so we use esbuild's JS API to bundle the .mjs in-memory and inline the
// result as a single <script type="module"> block. Equivalent output
// for these standalone embeds, no external file references to chase.
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

const repoRoot = new URL('..', import.meta.url).pathname;
const blogRoot = path.join(repoRoot, 'src/routes/blog');

fs.rmSync(path.join(repoRoot, 'static/blog'), { recursive: true, force: true });

const embedDirs = fs
	.readdirSync(blogRoot, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => path.join(blogRoot, entry.name, 'embed-poc'))
	.filter((dir) => fs.existsSync(path.join(dir, 'src/index.html')));

for (const embedDir of embedDirs) {
	const slug = path.basename(path.dirname(embedDir));
	console.log(`→ Building ${slug}`);

	const outdir = path.join(repoRoot, `static/blog/${slug}/embed-poc`);
	fs.mkdirSync(outdir, { recursive: true });

	const html = fs.readFileSync(path.join(embedDir, 'src/index.html'), 'utf-8');
	const scriptTag = html.match(/<script\s+type="module"\s+src="\.\/index\.mjs"\s*><\/script>/);

	let finalHtml;
	if (scriptTag) {
		const result = await build({
			entryPoints: [path.join(embedDir, 'src/index.mjs')],
			bundle: true,
			format: 'esm',
			target: 'es2020',
			write: false,
			logLevel: 'warning'
		});

		// Escape any </script> inside the bundled JS so the parser doesn't terminate the script early.
		const inlined = result.outputFiles[0].text.replace(/<\/script>/gi, '<\\/script>');
		finalHtml = html.replace(scriptTag[0], `<script type="module">\n${inlined}\n</script>`);
	} else {
		finalHtml = html;
	}

	fs.writeFileSync(path.join(outdir, 'index.html'), finalHtml);
}

console.log(`Built ${embedDirs.length} embed-poc${embedDirs.length === 1 ? '' : 's'}.`);