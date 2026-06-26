<script lang="ts">
	import type { PageData } from './$types';
	import BackgroundCanvas from '$lib/ui/BackgroundCanvas.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto p-4">
	<!-- Hero Section -->
	<div class="pt-20 pb-4 lg:pt-32 lg:pb-6">
		<div class="max-w-3xl">
			<h1 class="text-5xl font-light tracking-tight lg:text-7xl">thani<span class="text-primary">.</span>sh</h1>
			<p class="mt-6 font-mono text-base text-base-content/70 lg:text-lg">
				<span class="text-primary">$</span> dd if=/dev/head of=/dev/blog
			</p>
			<div class="mt-8 flex items-center gap-3">
				<span class="h-px w-12 bg-base-content/20"></span>
				<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
				<span class="h-px flex-1 bg-base-content/10"></span>
			</div>
		</div>
	</div>
</div>

<!-- Recent Posts Section — Conway's Game of Life renders behind the cards.
     Lives outside the container so the canvas spans the full viewport width. -->
<section class="relative isolate overflow-hidden pt-4 pb-16 lg:pt-6 lg:pb-20">
	<BackgroundCanvas class="absolute inset-0 -z-10 h-full w-full" />
	<div class="container mx-auto p-4">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
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
	</div>
</section>