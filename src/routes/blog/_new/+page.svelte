<script lang="ts">
	import { onMount } from 'svelte';
	import { applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import type { NewPost } from '$lib/types';
	import { PostEditor } from '$lib/ui';

	const LS_KEY = 'blog:post-editor-data';

	export let form;

	// Local state for form
	let post: NewPost = {
		heading: 'Post Title',
		slug: '',
		tags: [],
		summary: '',
		content: {}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			const savedData = localStorage.getItem(LS_KEY);
			if (savedData) {
				post = JSON.parse(savedData);
			}
		}
	});

	function handleChange(_post: NewPost) {
		const savedData = JSON.stringify(_post);
		localStorage.setItem(LS_KEY, savedData);
	}

	async function handleSubmit(formData: NewPost) {
		const body = new FormData();
		body.append('heading', formData.heading);
		body.append('slug', formData.slug);
		body.append('summary', formData.summary);
		body.append('content', JSON.stringify(formData.content));
		body.append('tags', JSON.stringify(formData.tags));
		const res = await fetch('?/insert', { method: 'POST', body });
		await applyAction(await res.json());
		await invalidateAll();
		localStorage.removeItem(LS_KEY);
		goto(`/blog/${formData.slug}`);
	}

	async function handleCancel() {
		goto('/blog');
	}
</script>

<div class="container mx-auto p-4 pt-32">
	{#if form?.error}
		<div class="alert alert-error mb-4">
			<span>{form.error}</span>
		</div>
	{/if}

	<PostEditor bind:post onChange={handleChange} onSubmit={handleSubmit} onCancel={handleCancel} />
</div>
