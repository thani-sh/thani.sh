<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto p-4">
	<!-- Hero Section -->
	<div class="hero py-32">
		<div class="hero-content text-center">
			<div>
				<h1 class="mb-4 text-6xl font-bold">thani.sh</h1>
				<p class="mb-6 text-lg">dd if=/dev/head of=/dev/blog</p>
			</div>
		</div>
	</div>

	<!-- Recent Posts Section -->
	<section class="py-16">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="card card-border transition-shadow duration-300 hover:shadow-lg"
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
