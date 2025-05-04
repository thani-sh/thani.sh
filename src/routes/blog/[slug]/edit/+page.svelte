<script lang="ts">
	import { applyAction } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { NewPost } from '$lib/types';
	import { PostEditor } from '$lib/ui';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;

	const currentData: NewPost = {
		slug: data.post.slug || '',
		tags: data.post.tags ? [...data.post.tags] : [],
		heading: data.post.heading || '',
		summary: data.post.summary || '',
		content: data.post.content || ''
	};

	async function handleSubmit(formData: NewPost) {
		const body = new FormData();
		body.append('heading', formData.heading);
		body.append('slug', formData.slug);
		body.append('summary', formData.summary);
		body.append('content', JSON.stringify(formData.content));
		body.append('tags', JSON.stringify(formData.tags));

		const res = await fetch('?/update', { method: 'POST', body });
		await applyAction(await res.json());
		goto(`/blog/${formData.slug}`);
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-2xl font-bold">Edit Post</h1>

	{#if form?.error}
		<div class="alert alert-error mb-4">
			<span>{form.error}</span>
		</div>
	{/if}

	<PostEditor {currentData} onSubmit={handleSubmit} />
</div>
