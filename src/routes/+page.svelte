<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto p-4">
	<!-- Hero Section -->
	<div class="hero relative overflow-hidden pt-16 pb-4 lg:py-32">
		<div class="mesh-bg absolute inset-0 -z-10"></div>
		<div class="hero-content text-center relative">
			<div>
				<h1 class="gradient-text mb-4 text-6xl font-bold tracking-tight">thani.sh</h1>
				<p class="font-mono text-lg">
					<span class="text-base-content/50">$</span>
					<span class="text-base-content/80">dd if=/dev/head of=/dev/blog</span><span
						class="cursor-blink text-primary">█</span
					>
				</p>
			</div>
		</div>
	</div>

	<!-- Recent Posts Section -->
	<section>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="card card-border bg-base-200/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
				>
					<div class="card-body">
						<h2 class="card-title">{post.title}</h2>
						<p class="text-base-content/70 text-sm">
							Posted on {new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<p class="mt-2">{post.summary}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>