<script lang="ts">
	import { applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import type { NewPost } from '$lib/types';
	import { PostEditor } from '$lib/ui';

	export let form;

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

	<PostEditor onSubmit={handleSubmit} onCancel={handleCancel} />
</div>
