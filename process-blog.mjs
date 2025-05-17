// @ts-nocheck
import fs from 'fs/promises';
import path from 'path';
// import { glob } from 'glob';

const blogDir = path.resolve('src/routes/blog');
// const files = await glob(path.join(blogDir, '**/index.mdx').replace(/\\/g, '/'));

const blogDirEntries = await fs.readdir(blogDir, { withFileTypes: true });
const files = [];
for (const entry of blogDirEntries) {
	if (entry.isDirectory()) {
		const slugDir = path.join(blogDir, entry.name);
		const mdxFilePath = path.join(slugDir, 'index.mdx');
		try {
			await fs.access(mdxFilePath); // Check if file exists
			files.push(mdxFilePath);
		} catch (err) {
			// index.mdx doesn't exist in this directory, or other error
			// console.log(`Skipping ${slugDir}, index.mdx not found or not accessible.`);
		}
	}
}

for (const file of files) {
	const content = await fs.readFile(file, 'utf-8');
	const directory = path.dirname(file);

	let imports = '';
	let meta = {}; // Explicitly type meta
	let body = '';

	const lines = content.split('\n');
	let metaSection = false;
	let bodySection = false;
	let inIntroBlock = false; // To track if currently parsing lines of the 'intro' field
	let inDescriptionBlock = false;
	let descriptionLines = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.startsWith('export const meta = {')) {
			metaSection = true;
			inIntroBlock = false;
			inDescriptionBlock = false;
			continue;
		}

		if (metaSection) {
			if (line.startsWith('};')) {
				// End of the meta object
				metaSection = false;
				bodySection = true;
				inIntroBlock = false;
				inDescriptionBlock = false;
				if (descriptionLines.length > 0) {
					meta['description'] = descriptionLines.join('\n').replace(/^['"]|['"]$/g, '');
					descriptionLines = [];
				}
				continue;
			}

			const trimmedLine = line.trim();

			if (trimmedLine.startsWith('intro:')) {
				inIntroBlock = true;
				continue;
			}
			if (inIntroBlock) {
				if (trimmedLine.endsWith('),')) {
					inIntroBlock = false;
				}
				continue;
			}

			if (inDescriptionBlock) {
				descriptionLines.push(trimmedLine);
				// Check if this line ends the description (ends with the same quote as it started)
				const descEndMatch = trimmedLine.match(/(["'])(.*)\1,?$/);
				if (descEndMatch) {
					inDescriptionBlock = false;
					// Join all lines, remove leading/trailing quotes and commas
					const desc = descriptionLines.join('\n');
					meta['description'] = desc.replace(/^description:\s*["']?|["'],?$/g, '');
					descriptionLines = [];
				}
				continue;
			}

			if (trimmedLine.startsWith('layout:')) {
				continue;
			}

			if (trimmedLine.startsWith('description:')) {
				// Start of description block
				const descMatch = trimmedLine.match(/^description:\s*(["'])(.*)/);
				if (descMatch) {
					const quoteChar = descMatch[1];
					let descRest = descMatch[2];
					if (descRest.endsWith(quoteChar + ',') || descRest.endsWith(quoteChar)) {
						// Single-line description
						meta['description'] = descRest.replace(new RegExp(quoteChar + ',?$'), '');
					} else {
						// Multi-line description: collect lines until closing quote
						inDescriptionBlock = true;
						descriptionLines = [trimmedLine];
					}
					continue;
				} else {
					// description: is present, but value is on the next line(s)
					let descLineIdx = i + 1;
					let descStartLine = lines[descLineIdx] ? lines[descLineIdx].trim() : '';
					if (descStartLine.match(/^(["']).*/)) {
						inDescriptionBlock = true;
						descriptionLines = [descStartLine];
						i = descLineIdx; // skip to the line where description starts
						continue;
					}
				}
			}

			const keyValueParts = trimmedLine.split(/:(.*)/, 2);
			const key = keyValueParts[0].trim();

			if (key && keyValueParts.length > 1) {
				let valueString = keyValueParts[1].trim().replace(/,$/, '');

				if (key === 'tags') {
					try {
						meta[key] = JSON.parse(valueString.replace(/'/g, '"'));
					} catch (parseError) {
						console.error(`Error parsing tags in ${file}: ${valueString}`, parseError);
						meta[key] = [];
					}
				} else if (key !== 'description' && key !== 'intro') {
					// Always strip both leading and trailing quotes for string fields
					meta[key] = valueString.replace(/^['"]|['"]$/g, '');
				}
			}
		} else if (bodySection) {
			body += line + '\n';
		} else if (line.startsWith('import') && !line.includes('Layout')) {
			imports += line + '\n';
		}
	}

	const frontmatter = Object.entries(meta)
		.map(([key, value]) => {
			if (key === 'tags' && Array.isArray(value)) {
				return `${key}: [${value.map((v) => `'${v}'`).join(', ')}]`;
			}
			// For string values, ensure no stray quotes
			if (typeof value === 'string') {
				value = value.replace(/^['"]*|['"]*$/g, '');
			}
			return `${key}: ${value}`;
		})
		.join('\n');

	let svxContent = `---
${frontmatter}
layout: 'blog'
---
${imports ? `\n<script>\n${imports}</script>\n` : ''}
${body.trim()}
`;

	// Post-processing: remove stray quotes from multiline frontmatter fields
	svxContent = svxContent.replace(/",\s*date: "/g, ',\ndate: ');

	await fs.writeFile(path.join(directory, '+page.svx'), svxContent);
	console.log(`Processed ${file} -> ${path.join(directory, '+page.svx')}`);
}

console.log('All blog posts processed.');
