<!-- /about — single static page that lets a stranger identify you and find a
     way to reach out. Mirrors the home page's warm-paper / terminal aesthetic:
     left-aligned hero, mono `##` section markers, translucent cards matching
     the post preview style on the home page.

     Placeholder content is realistic-shaped so the layout reads as a real
     page; search for `TODO` to find the bits you want to replace. -->
<div class="container mx-auto p-4">
	<header class="pt-20 pb-8 lg:pt-32 lg:pb-12">
		<h1 class="text-5xl font-light tracking-tight lg:text-7xl">thani<span class="text-primary">.</span>sh</h1>
		<p class="mt-2 font-mono text-base text-base-content/70 lg:text-lg">
			<span class="text-primary">$</span> whoami
		</p>
		<div class="mt-8 flex items-center gap-3">
			<span class="h-px w-12 bg-base-content/20"></span>
			<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
			<span class="h-px flex-1 bg-base-content/10"></span>
		</div>
	</header>
</div>

<main class="container mx-auto max-w-3xl space-y-6 p-4 pb-16 lg:pb-20">
	<!-- Identity — initials avatar (CSS-only, swap for <img> when you have one),
	     name, one-liner role, and a short bio paragraph. -->
	<section class="card card-border bg-base-100/85 backdrop-blur-[2px]">
		<div class="card-body">
			<div class="flex items-start gap-4">
				<div
					class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 font-light text-2xl text-primary"
					aria-hidden="true"
				>
					<!-- TODO: swap this CSS avatar for an <img src="/avatar.jpg"> once you have one -->
					TN
				</div>
				<div class="flex-1 pt-1">
					<h2 class="font-light text-xl tracking-tight">Thanish Nizam</h2>
					<p class="mt-1 font-mono text-sm text-base-content/60">
						tech lead at postnord · knivsta, sweden
					</p>
				</div>
			</div>
			<p class="mt-4 text-base-content/80 leading-relaxed">
				Polyglot software engineer specializing in SaaS products. Ten years of building things
				across payments, carbon accounting, collaborative editing, and developer tools —
				currently tech-lead at PostNord working on AI-assisted development workflows.
				Founding developer of React Storybook; built a CRDT-based collaborative editor at
				Creately from scratch.
			</p>
		</div>
	</section>

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