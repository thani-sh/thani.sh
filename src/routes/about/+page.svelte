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

<main class="container mx-auto max-w-3xl space-y-4 p-4 pb-16 lg:pb-20">
	<!-- Bio — first-person, chronological order, each role gets a specific
	     angle (not a generic "did things at company"). Reads more like a
	     blog post than a résumé. -->
	<section class="text-base-content/80 space-y-4 leading-relaxed">
		<p>
			I've been writing code for about a decade. Started as a co-founder at Kadira, where I
			helped ship Storybook — making it framework-agnostic, then getting the React Native
			version out the door.
		</p>
		<p>
			After Kadira I spent four years at Creately, designing how their collaborative editor
			would actually work: CRDTs end to end, plus enough HTML Canvas optimization that two
			people on the same doc stopped noticing each other.
		</p>
		<p>
			Klarna was a different kind of problem. Payments is mostly the unglamorous work of
			making sure the same operation can't run twice by accident — race conditions,
			idempotency, all the things you only appreciate after they've bitten you.
		</p>
		<p>
			Then Normative, where I revamped the access control layer — user groups, granular
			property-based permissions, federated auth for the enterprise customers who'd been
			blocked on it. The kind of work where "the right people see the right things" depends
			entirely on which customer is asking.
		</p>
		<p>
			These days I lead a frontend team at PostNord, which is mostly process work: getting
			engineers to write things down, training the team on AI-assisted dev, pushing the
			boring best practices that prevent 3am pages.
		</p>
		<p>
			When work quiets down I hack on small OSS tools — provar, duct-tape, taskmaster — and
			write the occasional blog post here. Both happen less often than I'd like.
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