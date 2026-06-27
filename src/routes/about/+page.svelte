<script lang="ts">
	// Career data — chronological order. Kadira first (Storybook birthplace),
	// then Creately → Klarna → Normative → PostNord.
	const roles = [
		{ dates: '2015–16', company: 'Kadira', tagline: 'co-founder · storybook' },
		{ dates: '2016–20', company: 'Creately', tagline: 'CRDT collab · canvas perf' },
		{ dates: '2020–23', company: 'Klarna', tagline: 'race conditions · idempotency' },
		{ dates: '2023–25', company: 'Normative', tagline: 'access control · federated auth' },
		{
			dates: 'now',
			company: 'PostNord',
			tagline: 'tech lead · frontend · AI dev',
			current: true
		}
	];
</script>

<!-- /about — the about page. Same hero as the home page (thani.sh / $ whoami)
     because it's still the same site; what's different is the content below:
     a visual career timeline + the contact details and links. -->
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

<main class="container mx-auto max-w-3xl space-y-10 p-4 pb-16 lg:pb-20">
	<!-- Career timeline — visual replacement for the chronological paragraphs.
	     Horizontal on desktop (5 nodes connected by a thin line), vertical on
	     mobile (each node has a line dropping to the next). Current role
	     (PostNord) gets a filled primary dot to stand out. -->
	<section>
		<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
			<span class="text-primary">##</span> career
		</h3>

		<ol class="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-5 sm:gap-x-4">
			{#each roles as role, i (role.company)}
				<li class="relative flex flex-col pl-7 sm:items-center sm:pl-0 sm:pt-7">
					<!-- Desktop: horizontal connecting lines (left half + right half of cell) -->
					{#if i > 0}
						<span
							class="absolute left-0 top-[5px] hidden h-px w-1/2 bg-base-300 sm:block"
							aria-hidden="true"
						></span>
					{/if}
					{#if i < roles.length - 1}
						<span
							class="absolute left-1/2 top-[5px] hidden h-px w-1/2 bg-base-300 sm:block"
							aria-hidden="true"
						></span>
					{/if}
					<!-- Mobile: vertical connecting line dropping to the next node -->
					{#if i < roles.length - 1}
						<span
							class="absolute left-[5px] top-[6px] bottom-0 w-px bg-base-300 sm:hidden"
							aria-hidden="true"
						></span>
					{/if}

					<!-- Dot: top-left on mobile, top-center on desktop. Filled with
					     primary for current role, outlined for past. -->
					<span
						class="absolute left-0 top-0 flex h-3 w-3 items-center justify-center rounded-full border-2 bg-base-100 sm:left-1/2 sm:top-0 sm:-translate-x-1/2 {role.current
							? 'border-primary'
							: 'border-base-300'}"
						aria-hidden="true"
					>
						{#if role.current}
							<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
						{/if}
					</span>

					<p class="font-mono text-xs text-base-content/50">{role.dates}</p>
					<h4 class="mt-1 font-light text-base text-base-content">{role.company}</h4>
					<p class="mt-0.5 text-sm text-base-content/60">{role.tagline}</p>
				</li>
			{/each}
		</ol>
	</section>

	<!-- Side projects — what I'm up to when work quiets down. Kept as prose
	     because there's no useful visual for "I tinker on OSS sometimes". -->
	<section class="text-base-content/80 space-y-4 leading-relaxed">
		<p>
			I'm one of the founding developers of React Storybook. That's probably the thing people
			know me for, even though I haven't touched the codebase in years.
		</p>
		<p>
			When work quiets down I hack on small OSS tools — <a
				href="https://github.com/thani-sh/provar"
				class="hover:text-primary hover:underline"
				rel="noopener">provar</a
			>, <a
				href="https://github.com/thani-sh/duct-tape"
				class="hover:text-primary hover:underline"
				rel="noopener">duct-tape</a
			>, <a
				href="https://github.com/thani-sh/taskmaster"
				class="hover:text-primary hover:underline"
				rel="noopener">taskmaster</a
			> — and write the occasional blog post here. Both happen less often than I'd like.
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