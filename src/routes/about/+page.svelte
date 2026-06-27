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
					TS
				</div>
				<div class="flex-1 pt-1">
					<h2 class="font-light text-xl tracking-tight">Thani Shafeek</h2>
					<p class="mt-1 font-mono text-sm text-base-content/60">
						software engineer · stockholm
					</p>
				</div>
			</div>
			<!-- TODO: replace with a 2-3 line bio about what you actually do and care about -->
			<p class="mt-4 text-base-content/80 leading-relaxed">
				Building multiplayer systems, distributed protocols, and the occasional game.
				I write long-form on the blog and shorter thoughts in the feed. Previously shipped
				software at companies you've probably heard of, currently figuring out what comes next.
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
						Building
						<a href="/blog/2025-06-08-multiplayer-tetris-game-part-6" class="hover:text-primary hover:underline"
							>a multiplayer Tetris game</a
						>
						using AI agents to do the heavy lifting
					</span>
				</li>
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>Reading about lock-free data structures and CRDTs</span>
				</li>
				<li class="flex gap-3">
					<span class="shrink-0 font-mono text-base-content/40">→</span>
					<span>Based in Stockholm, Sweden</span>
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
				<!-- TODO: replace the email + add/remove the channels you actually use.
				     rel="me" on social links helps Mastodon/Bridgy verify ownership. -->
				<a
					href="mailto:hello@thani.sh"
					class="rounded-field border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/80 transition-all hover:border-primary"
					>hello@thani.sh</a
				>
				<a
					href="https://github.com/thani-sh"
					rel="me"
					class="rounded-field border border-base-300 bg-base-100 px-3 py-1.5 text-sm text-base-content/80 transition-all hover:border-primary"
					>github / thani-sh</a
				>
				<a
					href="https://www.linkedin.com/in/thani-shafeek"
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