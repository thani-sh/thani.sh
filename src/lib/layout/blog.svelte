<script lang="ts">
	import { ChevronLeft, SquarePen } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	export let title: string;
	export let date: string;
	export let tags: string[];

	// Get the last path segment from the URL
	$: slug = browser
		? window.location.pathname.split('/').filter(Boolean).pop() || ''
		: page?.url?.pathname.split('/').filter(Boolean).pop() || '';

	// Format date to only show the date part (YYYY-MM-DD or locale string)
	$: formattedDate = date
		? new Date(date).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: '';
</script>

<a href="/" class="btn btn-circle btn-ghost absolute top-4 left-4">
	<ChevronLeft class="h-4 w-4" />
</a>

<a
	href="https://github.com/thani-sh/thani.sh/edit/main/src/routes/blog/{slug}/%2Bpage.svx"
	class="btn btn-circle btn-ghost absolute top-4 right-4 hidden lg:flex"
>
	<SquarePen class="h-4 w-4" />
</a>

<header class="mb-4 flex flex-col items-start gap-2 lg:mb-8">
	<h1 class="text-xl leading-tight font-medium lg:text-4xl">{title}</h1>
	<span class="text-sm text-neutral-500">Posted on: {formattedDate}</span>
</header>

<main class="prose max-w-none">
	<slot />
</main>

<footer class="mt-8">
	{#if tags?.length > 0}
		<div class="flex flex-wrap items-center gap-2">
			<span class="font-semibold">Tags:</span>
			{#each tags as tag}
				<span class="rounded bg-white/10 px-2 py-1 text-xs font-medium">{tag}</span>
			{/each}
		</div>
	{/if}
</footer>
