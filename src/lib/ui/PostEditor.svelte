<script lang="ts">
	import type { NewPost } from '$lib/types';
	import { PanelRight } from '@lucide/svelte';
	import slugify from '@sindresorhus/slugify';
	import TextEditor from './TextEditor.svelte';

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
	let tagInput = {
		_value: formData.tags.join(', '),
		get tags() {
			return this._value;
		},
		set tags(value) {
			this._value = value;
			formData.tags = value
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);
		}
	};

	// Local state for slug input
	let slugInput = {
		get slug() {
			return formData.slug || slugify(formData.heading);
		},
		set slug(value) {
			formData.slug = value;
		}
	};

	// Handle form submission
	function handleSubmit() {
		if (!formData.slug) {
			formData.slug = slugify(formData.heading);
		}
		onSubmit(formData);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<div class="drawer drawer-end">
		<input id="editor-drawer" type="checkbox" class="drawer-toggle" />

		<div class="drawer-content">
			<label for="editor-drawer" class="btn btn-square btn-ghost fixed top-4 right-4">
				<PanelRight class="h-6 w-6" />
			</label>

			<!-- Main content area -->
			<div class="flex items-center justify-between">
				<input
					type="text"
					id="heading"
					bind:value={formData.heading}
					required
					placeholder="Post title"
					class="input input-xl input-ghost h-24 w-full bg-transparent text-6xl font-medium focus:outline-none"
				/>
			</div>

			<div class="form-control w-full px-4">
				<TextEditor
					data={formData.content}
					help="Post content"
					className="text-xl"
					onChange={(data) => {
						formData.content = data;
					}}
				/>
			</div>
		</div>

		<div class="drawer-side">
			<label for="editor-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<div class="menu bg-base-200 mr-4 min-h-full w-80 p-4">
				<h3 class="mb-4 text-lg font-bold">Post Settings</h3>

				<div class="form-control mb-4 w-full">
					<label for="summary" class="label">
						<span class="label">Summary</span>
					</label>
					<textarea
						id="summary"
						bind:value={formData.summary}
						placeholder="Brief description of the post"
						class="textarea textarea-bordered w-full resize-none focus:outline-none"
						rows="3"
					></textarea>
				</div>

				<div class="form-control mb-4 w-full">
					<label for="slug" class="label">
						<span class="label">URL Slug</span>
					</label>
					<input
						type="text"
						id="slug"
						bind:value={slugInput.slug}
						required
						placeholder="post-url-slug"
						class="input input-bordered w-full focus:outline-none"
					/>
				</div>

				<div class="form-control w-full">
					<label for="tags" class="label font-bold">
						<span class="label">Tags</span>
					</label>
					<input
						type="text"
						id="tags"
						bind:value={tagInput.tags}
						placeholder="tag1, tag2, tag3"
						class="input input-bordered w-full focus:outline-none"
					/>

					{#if formData.tags.length > 0}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each formData.tags as tag}
								<span class="badge badge-primary">{tag}</span>
							{/each}
						</div>
					{/if}
				</div>

				<div class="mt-6">
					<button type="button" on:click={onCancel} class="btn btn-ghost btn-sm"> Cancel </button>
					<button type="submit" class="btn btn-primary btn-sm"> Save </button>
				</div>
			</div>
		</div>
	</div>
</form>
