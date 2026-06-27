<!-- /about — person identity page. The home page hero is *site* identity
     (thani.sh / $ dd / blog); this hero is *person* identity (your name +
     one-line tagline + divider). One header, not two. -->
<div class="container mx-auto p-4">
	<header class="pt-20 pb-8 lg:pt-32 lg:pb-12">
		<h1 class="text-5xl font-light tracking-tight lg:text-7xl">Thanish Nizam</h1>
		<p class="mt-2 font-mono text-base text-base-content/70 lg:text-lg">
			<span class="text-primary">$</span> polyglot software engineer specializing in saas products
		</p>
		<div class="mt-8 flex items-center gap-3">
			<span class="h-px w-12 bg-base-content/20"></span>
			<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
			<span class="h-px flex-1 bg-base-content/10"></span>
		</div>
	</header>
</div>

<main class="container mx-auto max-w-3xl space-y-6 p-4 pb-16 lg:pb-20">
	<!-- Bio — flows directly under the header, no card wrapper. The hero is
	     the identity; this is just a paragraph hanging off it. -->
	<p class="text-base-content/80 leading-relaxed">
		Ten years of building things across payments, carbon accounting, collaborative editing,
		and developer tools — currently tech-lead at PostNord working on AI-assisted development
		workflows. Founding developer of React Storybook; built a CRDT-based collaborative editor
		at Creately from scratch.
	</p>

	<!-- Currently — 2-4 short bullets. Keep it fresh; this section's job is
	     "is this person still active?" -->
	<section class="card card-border bg-base-100/85 backdrop-blur-[2px]">
		<div class="card-body">
			<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
				<span class="text-primary">##</span> currently
			</h3>
			<ul class="mt-3 space-y-2 text-base-content/80">
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>
						Leading frontend architecture and AI-assisted development at
						<a
							href="https://www.postnord.com/"
							class="hover:text-primary hover:underline"
							rel="noopener">PostNord</a
						>
					</span>
				</li>
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>
						Open-sourcing side projects —
						<a
							href="https://github.com/thani-sh/provar"
							class="hover:text-primary hover:underline"
							rel="noopener">provar</a
						>
						(visual testing),
						<a
							href="https://github.com/thani-sh/duct-tape"
							class="hover:text-primary hover:underline"
							rel="noopener">duct-tape</a
						>
						(LLM self-healing runtime),
						<a
							href="https://github.com/thani-sh/taskmaster"
							class="hover:text-primary hover:underline"
							rel="noopener">taskmaster</a
						>
						(workflow engine), and a few others
					</span>
				</li>
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>
						Writing
						<a
							href="/blog/2025-06-08-multiplayer-tetris-game-part-6"
							class="hover:text-primary hover:underline"
							>the multiplayer Tetris series</a
						>
						on the blog — letting AI agents do the heavy lifting this time
					</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Find me — tag-style links (pills matching the pagination buttons on
	     the home page). Drop any you don't actually use. -->
	<section class="card card-border bg-base-100/85 backdrop-blur-[2px]">
		<div class="card-body">
			<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
				<span class="text-primary">##</span> find me
			</h3>
			<div class="mt-3 flex flex-wrap gap-2">
				<a
					href="mailto:me@thani.sh"
					class="rounded-field border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/80 transition-all hover:border-primary"
					>me@thani.sh</a
				>
				<a
					href="https://github.com/thani-sh"
					rel="me"
					class="rounded-field border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/80 transition-all hover:border-primary"
					>github / thani-sh</a
				>
				<a
					href="https://www.linkedin.com/in/thani-sh/"
					rel="me"
					class="rounded-field border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/80 transition-all hover:border-primary"
					>linkedin</a
				>
			</div>
		</div>
	</section>

	<!-- Elsewhere — utility links. Optional, feel free to delete. -->
	<section class="card card-border bg-base-100/85 backdrop-blur-[2px]">
		<div class="card-body">
			<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
				<span class="text-primary">##</span> elsewhere
			</h3>
			<ul class="mt-3 space-y-2 text-base-content/80">
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>
						<a href="/rss.xml" class="hover:text-primary hover:underline">RSS feed</a>
						— get the posts without the site
					</span>
				</li>
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>
						<a href="/" class="hover:text-primary hover:underline">← home</a>
					</span>
				</li>
			</ul>
		</div>
	</section>
</main>