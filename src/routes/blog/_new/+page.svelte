<script lang="ts">
	import { applyAction } from '$app/forms';
	import type { NewPost } from '$lib/types';
	import Editor from '$lib/ui/Editor.svelte';

	export let form;

	async function handleSubmit(formData: NewPost) {
		const body = new FormData();
		body.append('heading', formData.heading);
		body.append('slug', formData.slug);
		body.append('summary', formData.summary);
		body.append('content', formData.content);
		body.append('tags', JSON.stringify(formData.tags));

		const res = await fetch('?/insert', { method: 'POST', body });
		await applyAction(await res.json());
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-2xl font-bold">New Post</h1>

	{#if form?.error}
		<div class="alert alert-error mb-4">
			<span>{form.error}</span>
		</div>
	{/if}

	<Editor onSubmit={handleSubmit} />
</div>
