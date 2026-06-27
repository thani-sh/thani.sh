<!-- /about — the about page. Same hero as the home page (thani.sh / $ whoami)
     because it's still the same site; what's different is the content below:
     a short bio in first-person voice (no CV-style chronology), then contact
     details and links. -->
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
	<!-- Bio — first-person, no CV chronology. A few short paragraphs that
	     sound like the blog rather than a résumé. -->
	<section class="space-y-4">
		<p class="text-base-content/80 leading-relaxed">
			I've been writing code for about a decade. Payments at Klarna, then climate accounting
			at Normative, then four years at Creately where I built a CRDT-based collaborative
			editor from scratch (the kind where two people can edit the same thing without stepping
			on each other's toes). These days I lead a frontend team at PostNord, mostly thinking
			about how AI agents fit into dev workflows.
		</p>
		<p class="text-base-content/80 leading-relaxed">
			I'm one of the founding developers of React Storybook. That's probably the thing people
			know me for, even though I haven't touched the codebase in years.
		</p>
		<p class="text-base-content/80 leading-relaxed">
			When work quiets down I hack on small OSS tools — provar, duct-tape, taskmaster, a few
			others — and write the occasional blog post here. Both happen less often than I'd like.
		</p>
	</section>

	<!-- Find me — tag-style pills, same recipe as the pagination buttons on
	     the home page. -->
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

	<!-- Elsewhere — utility links. -->
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