#!/bin/bash
set -euo pipefail

rm -rf static/blog
mkdir -p static/blog

# Bundle each embed-poc with bun's built-in bundler. Each embed-poc is a
# simple src/index.html + src/index.mjs pair; no plugin pipeline needed.
for dir in src/routes/blog/*/embed-*; do
	[ -d "$dir" ] || continue
	slug="$(basename "$(dirname "$dir")")"
	echo "→ Building ${slug}"
	(
		cd "$dir"
		bun build src/index.html \
			--outdir "../../../../../static/blog/${slug}/embed-poc" \
			--public-path "/blog/${slug}/embed-poc/"
	)
done