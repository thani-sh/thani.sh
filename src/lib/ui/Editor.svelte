<script lang="ts">
	import type { NewPost } from '$lib/types';

	// Define props for current data and submission handlers
	export let currentData: NewPost | null = null;

	// Function props for submission and cancellation
	export let onSubmit: (data: NewPost) => void;
	export let onCancel: () => void = () => {};

	// Local state for form
	let formData: NewPost = currentData
		? { ...currentData }
		: { heading: '', slug: '', tags: [], summary: '', content: '' };

	// Local state for tag input
	let tagInput = (formData.tags || []).join(', ');

	// Parse comma-separated tags into array
	function handleTagInput() {
		formData.tags = tagInput
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);
	}

	// Handle form submission
	function handleSubmit() {
		handleTagInput();
		onSubmit(formData);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div class="form-control w-full">
		<label for="heading" class="label">
			<span class="label">Heading</span>
		</label>
		<input
			type="text"
			id="heading"
			bind:value={formData.heading}
			required
			placeholder="Post title"
			class="input input-bordered w-full"
		/>
	</div>

	<div class="form-control w-full">
		<label for="slug" class="label">
			<span class="label">Slug</span>
		</label>
		<input
			type="text"
			id="slug"
			bind:value={formData.slug}
			required
			placeholder="post-url-slug"
			class="input input-bordered w-full"
		/>
	</div>

	<div class="form-control w-full">
		<label for="tags" class="label">
			<span class="label">Tags</span>
		</label>
		<input
			type="text"
			id="tags"
			bind:value={tagInput}
			on:blur={handleTagInput}
			placeholder="tag1, tag2, tag3"
			class="input input-bordered w-full"
		/>

		{#if formData.tags.length > 0}
			<div class="mt-2 flex flex-wrap gap-2">
				{#each formData.tags as tag}
					<span class="badge badge-primary">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="form-control w-full">
		<label for="summary" class="label">
			<span class="label">Summary</span>
		</label>
		<textarea
			id="summary"
			bind:value={formData.summary}
			required
			rows="3"
			placeholder="Brief description of the post"
			class="textarea textarea-bordered w-full"
		></textarea>
	</div>

	<div class="form-control w-full">
		<label for="content" class="label">
			<span class="label">Content</span>
		</label>
		<textarea
			id="content"
			bind:value={formData.content}
			required
			rows="12"
			placeholder="Post content goes here"
			class="textarea textarea-bordered w-full"
		></textarea>
	</div>

	<div class="card-actions border-base-300 mt-6 justify-end border-t pt-6">
		<button type="button" on:click={onCancel} class="btn btn-ghost"> Cancel </button>
		<button type="submit" class="btn btn-primary"> Save </button>
	</div>
</form>
