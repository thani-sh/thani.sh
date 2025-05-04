<script lang="ts">
	import type { Post } from '$lib/types';
	import TextEditor from './TextEditor.svelte';

	export let post: Post;
</script>

<main>
	<h1 class="h-24 w-full p-4 text-6xl font-medium">{post.heading}</h1>

	<div class="form-control w-full px-4">
		<TextEditor data={post.content} help="Post content" className="text-xl" readOnly={true} />
	</div>
</main>
