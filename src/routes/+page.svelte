<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import BackgroundCanvas from '$lib/ui/BackgroundCanvas.svelte';

	export let data: PageData;

	const PER_PAGE = 6;

	// Reactive pagination derived from the URL's ?page query param so the
	// state survives reloads and the back button, and is shareable.
	$: pageIndex = Math.max(1, Number(page.url.searchParams.get('page') ?? '1') || 1);
	$: totalPages = Math.max(1, Math.ceil(data.posts.length / PER_PAGE));
	$: clampedIndex = Math.min(pageIndex, totalPages);
	$: paginatedPosts = data.posts.slice((clampedIndex - 1) * PER_PAGE, clampedIndex * PER_PAGE);
	$: showPagination = totalPages > 1;

	function navigate(delta: number) {
		const next = clampedIndex + delta;
		if (next < 1 || next > totalPages) return;
		const url = new URL(page.url);
		if (next === 1) {
			url.searchParams.delete('page');
		} else {
			url.searchParams.set('page', String(next));
		}
		goto(url, { replaceState: true, noScroll: true, keepFocus: true });
	}

	function handleKeydown(event: KeyboardEvent) {
		// Don't hijack arrows when typing in form fields
		const t = event.target;
		if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
		if (event.key === 'ArrowLeft') {
			navigate(-1);
		} else if (event.key === 'ArrowRight') {
			navigate(1);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="container mx-auto p-4">
	<!-- Hero Section — left-aligned to match the blog post view's header pattern -->
	<header class="pt-20 pb-4 lg:pt-32 lg:pb-6">
		<h1 class="text-5xl font-light tracking-tight lg:text-7xl">thani<span class="text-primary">.</span>sh</h1>
		<p class="mt-2 font-mono text-base text-base-content/70 lg:text-lg">
			<span class="text-primary">$</span> dd if=/dev/head of=/dev/blog
		</p>
		<div class="mt-8 flex items-center gap-3">
			<span class="h-px w-12 bg-base-content/20"></span>
			<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
			<span class="h-px flex-1 bg-base-content/10"></span>
		</div>
	</header>
</div>

<!-- Recent Posts Section — Conway's Game of Life renders behind the cards.
     Lives outside the container so the canvas spans the full viewport width. -->
<section class="relative isolate overflow-hidden pt-4 pb-16 lg:pt-6 lg:pb-20">
	<BackgroundCanvas class="absolute inset-0 -z-10 h-full w-full" />
	<div class="container mx-auto p-4">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each paginatedPosts as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="card card-border bg-base-100/85 backdrop-blur-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary"
				>
					<div class="card-body">
						<h2 class="card-title text-base">{post.title}</h2>
						<p class="text-base-content/60 text-sm">
							Posted on {new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<p class="mt-2 text-base-content/80">{post.summary}</p>
					</div>
				</a>
			{/each}
		</div>

		{#if showPagination}
			<nav class="mt-8 flex items-center justify-between text-sm" aria-label="Posts pagination">
				<button
					type="button"
					onclick={() => navigate(-1)}
					disabled={clampedIndex <= 1}
					class="btn btn-ghost btn-sm gap-1 disabled:opacity-30"
					aria-label="Newer posts"
				>
					<span aria-hidden="true">←</span> Newer
				</button>
				<span class="text-base-content/60 font-mono text-xs">
					Page {clampedIndex} of {totalPages}
				</span>
				<button
					type="button"
					onclick={() => navigate(1)}
					disabled={clampedIndex >= totalPages}
					class="btn btn-ghost btn-sm gap-1 disabled:opacity-30"
					aria-label="Older posts"
				>
					Older <span aria-hidden="true">→</span>
				</button>
			</nav>
		{/if}
	</div>
</section>