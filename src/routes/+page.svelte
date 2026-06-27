<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import BackgroundCanvas from '$lib/ui/BackgroundCanvas.svelte';
	import SocialIcons from '$lib/ui/SocialIcons.svelte';

	export let data: PageData;

	// Adaptive pagination: how many posts fit on a page is computed from the
	// available section height so the grid fills the viewport instead of
	// leaving a blank strip below the pagination. SSR uses the floor (6) and
	// the client upgrades after hydration via ResizeObserver.
	const MIN_PER_PAGE = 6;
	const SAFETY = 0.92; // leave headroom so a tall summary can't push the nav off-screen
	const PAGINATION_RESERVE = 120; // px reserved for pagination chrome (mt-8 + button + container p-4)

	// Measured layout state. Starts at 0 → perPage falls back to MIN_PER_PAGE
	// during SSR and the initial pre-measurement render.
	let availableHeight = 0;
	let rowHeight = 0;
	let columns = 1;

	let sectionEl: HTMLElement;
	let gridEl: HTMLElement;

	function computeColumns() {
		if (!browser) return 1;
		if (window.matchMedia('(min-width: 1024px)').matches) return 3;
		if (window.matchMedia('(min-width: 768px)').matches) return 2;
		return 1;
	}

	function measureAvailableHeight() {
		if (!sectionEl) return;
		const rect = sectionEl.getBoundingClientRect();
		const cs = window.getComputedStyle(sectionEl);
		const padTop = parseFloat(cs.paddingTop) || 0;
		const padBottom = parseFloat(cs.paddingBottom) || 0;
		// Subtract the section's own padding + the space the pagination nav
		// will occupy (mt-8 + button height + container p-4).
		availableHeight = Math.max(0, rect.height - padTop - padBottom - PAGINATION_RESERVE);
	}

	function measureRowHeight() {
		// querySelector picks up whichever card is first after a pagination
		// change. Different posts have different summary lengths, so row
		// height isn't constant across pages.
		const firstCard = gridEl?.querySelector('.card') as HTMLElement | null;
		if (firstCard) {
			rowHeight = firstCard.offsetHeight;
		}
	}

	// Derived per-page count. Falls back to MIN_PER_PAGE while measurements
	// haven't run yet (SSR + first client paint).
	$: perPage = (() => {
		if (!availableHeight || !rowHeight) return MIN_PER_PAGE;
		const maxRows = Math.max(2, Math.floor((availableHeight * SAFETY) / rowHeight));
		return Math.max(MIN_PER_PAGE, maxRows * columns);
	})();

	// URL-driven pagination so reload / back / share work as expected.
	$: pageIndex = Math.max(1, Number(page.url.searchParams.get('page') ?? '1') || 1);
	$: totalPages = Math.max(1, Math.ceil(data.posts.length / perPage));
	$: clampedIndex = Math.min(pageIndex, totalPages);
	$: paginatedPosts = data.posts.slice((clampedIndex - 1) * perPage, clampedIndex * perPage);
	// Hide pagination entirely when everything fits in one "page".
	$: showPagination = totalPages > 1 && perPage < data.posts.length;

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
		if (event.key === 'ArrowLeft') navigate(-1);
		else if (event.key === 'ArrowRight') navigate(1);
	}

	onMount(() => {
		columns = computeColumns();

		// Section resize → availableHeight changes (viewport height changes
		// shift the section's min-h-[calc(100vh-...)]).
		const sectionObserver = new ResizeObserver(() => measureAvailableHeight());
		sectionObserver.observe(sectionEl);
		measureAvailableHeight();

		// Grid resize → cards reflowed (breakpoint change, or first card
		// swapped on pagination → different summary length).
		const gridObserver = new ResizeObserver(() => measureRowHeight());
		gridObserver.observe(gridEl);
		measureRowHeight();

		// Column count flips at md/lg. Mirror the grid-cols-* in the template.
		const mqLg = window.matchMedia('(min-width: 1024px)');
		const mqMd = window.matchMedia('(min-width: 768px)');
		const onMqChange = () => {
			columns = computeColumns();
		};
		mqLg.addEventListener('change', onMqChange);
		mqMd.addEventListener('change', onMqChange);

		return () => {
			sectionObserver.disconnect();
			gridObserver.disconnect();
			mqLg.removeEventListener('change', onMqChange);
			mqMd.removeEventListener('change', onMqChange);
		};
	});

	// If totalPages shrinks below the current ?page=N (e.g. user resized the
	// window so more rows fit → fewer pages needed), sync the URL so a reload
	// doesn't bounce them to a now-defunct page index.
	$: if (browser && pageIndex !== clampedIndex) {
		const url = new URL(page.url);
		const desiredParam = clampedIndex === 1 ? null : String(clampedIndex);
		if (url.searchParams.get('page') !== desiredParam) {
			if (desiredParam === null) {
				url.searchParams.delete('page');
			} else {
				url.searchParams.set('page', desiredParam);
			}
			goto(url, { replaceState: true, noScroll: true, keepFocus: true });
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="container mx-auto p-4">
	<!-- Hero Section: left-aligned to match the blog post view's header pattern -->
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
		<div class="mt-3 flex items-center justify-between">
			<a
				href="/about"
				class="font-mono text-xs text-base-content/50 hover:text-base-content/80 hover:underline">→ about</a
			>
			<SocialIcons />
		</div>
	</header>
</div>

<!-- Recent Posts Section: Conway's Game of Life renders behind the cards.
     Lives outside the container so the canvas spans the full viewport width.
     min-h-[calc(100vh-Xrem)] keeps the canvas reaching the bottom of the
     viewport even when the card grid is short, so we never get a blank
     strip below the pagination. X = header height (incl. container padding). -->
<section
	bind:this={sectionEl}
	class="relative isolate min-h-[calc(100vh-15rem)] overflow-hidden pt-4 pb-16 lg:min-h-[calc(100vh-22rem)] lg:pt-6 lg:pb-20"
>
	<BackgroundCanvas class="absolute inset-0 -z-10 h-full w-full" />
	<div class="container mx-auto p-4">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" bind:this={gridEl}>
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
			<!-- Pagination styled to match the post preview cards (translucent
			     paper + border + backdrop-blur) so it sits in the same visual
			     register and is easier to read against the animated canvas. -->
			<nav class="mt-8 flex items-center justify-between gap-3" aria-label="Posts pagination">
				<button
					type="button"
					onclick={() => navigate(-1)}
					disabled={clampedIndex <= 1}
					class="rounded-field border border-base-300 bg-base-100/85 px-4 py-2 text-sm text-base-content/80 backdrop-blur-[2px] transition-all hover:border-primary disabled:opacity-30 disabled:hover:border-base-300"
					aria-label="Newer posts"
				>
					<span aria-hidden="true">←</span> Newer
				</button>
				<span
					class="rounded-field border border-base-300 bg-base-100/85 px-4 py-2 font-mono text-xs text-base-content/60 backdrop-blur-[2px]"
				>
					Page {clampedIndex} of {totalPages}
				</span>
				<button
					type="button"
					onclick={() => navigate(1)}
					disabled={clampedIndex >= totalPages}
					class="rounded-field border border-base-300 bg-base-100/85 px-4 py-2 text-sm text-base-content/80 backdrop-blur-[2px] transition-all hover:border-primary disabled:opacity-30 disabled:hover:border-base-300"
					aria-label="Older posts"
				>
					Older <span aria-hidden="true">→</span>
				</button>
			</nav>
		{/if}
	</div>
</section>