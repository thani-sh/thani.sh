<script lang="ts">
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[];

	const props = {
		title,
		description,
		date,
		tags
	};

	// Format date to only show the date part (YYYY-MM-DD or locale string)
	$: formattedDate = date
		? new Date(date).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: '';
</script>

<header class="mb-4 flex flex-col items-start gap-2 lg:mb-8">
	<h1 class="text-xl leading-tight font-medium lg:text-4xl">{title}</h1>
	<span class="text-sm text-neutral-500">Posted on: {formattedDate}</span>
</header>

<main class="prose max-w-none">
	<slot />
</main>

<footer class="mt-8">
	<div class="flex flex-wrap items-center gap-2">
		<span class="font-semibold">Tags:</span>
		{#each tags as tag}
			<span class="rounded bg-white/10 px-2 py-1 text-xs font-medium">{tag}</span>
		{/each}
	</div>
</footer>
