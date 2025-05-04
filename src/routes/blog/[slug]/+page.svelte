<script lang="ts">
	import { PostViewer } from '$lib/ui';
	import { SquarePen } from '@lucide/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto p-4 lg:pt-32">
	<a href="/blog/{data.post.slug}/edit" class="btn btn-square btn-ghost fixed top-4 right-4">
		<SquarePen class="h-6 w-6" />
	</a>

	<PostViewer post={data.post} />
</div>
