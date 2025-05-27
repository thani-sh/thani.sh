<script lang="ts">
	import { ChevronLeft, SquarePen } from '@lucide/svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	export let title: string;
	export let parent: string;

	// Get the last path segment from the URL
	$: slug = browser
		? window.location.pathname.split('/').filter(Boolean).pop() || ''
		: page?.url?.pathname.split('/').filter(Boolean).pop() || '';
</script>

<a href="/blog/{parent}" class="btn btn-circle btn-ghost absolute top-4 left-4">
	<ChevronLeft class="h-4 w-4" />
</a>

<a
	href="https://github.com/thani-sh/thani.sh/edit/main/src/routes/blog/{parent}/{slug}/%2Bpage.svx"
	class="btn btn-circle btn-ghost absolute top-4 right-4 hidden lg:flex"
>
	<SquarePen class="h-4 w-4" />
</a>

<header class="mb-4 flex flex-col items-start gap-2 lg:mb-8">
	<h1 class="text-xl leading-tight font-medium lg:text-3xl">{title}</h1>
</header>

<main class="prose max-w-none">
	<slot />
</main>
