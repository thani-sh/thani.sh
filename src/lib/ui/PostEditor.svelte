<script lang="ts">
	import type { NewPost } from '$lib/types';
	import { PanelRight } from '@lucide/svelte';
	import slugify from '@sindresorhus/slugify';
	import TextEditor from './TextEditor.svelte';
	import { uniq } from 'lodash-es';

	// Define props for current data and submission handlers
	export let post: NewPost;

	// Function props for submission and cancellation
	export let onChange: (data: NewPost) => void = () => {};
	export let onSubmit: (data: NewPost) => void = () => {};
	export let onCancel: () => void = () => {};

	/**
	 * Helper function to parse the tags string into an array of unique tags.
	 */
	function parseTags(tagsString: string): string[] {
		return uniq(
			tagsString
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0)
		);
	}

	/**
	 * Create a proxy object to handle the tags property and keep the post object in
	 * sync, handle default value for slug, and trigger onChange when properties change.
	 */
	let postProxy = {
		_tags: post.tags.join(', '),
		get tags() {
			return this._tags;
		},
		set tags(value) {
			this._tags = value;
			post.tags = parseTags(value);
			onChange(post);
		},
		get heading() {
			return post.heading;
		},
		set heading(value) {
			post.heading = value;
			onChange(post);
		},
		get slug() {
			return post.slug || slugify(post.heading);
		},
		set slug(value) {
			post.slug = value;
			onChange(post);
		},
		get summary() {
			return post.summary;
		},
		set summary(value) {
			post.summary = value;
			onChange(post);
		},
		get content() {
			return post.content;
		},
		set content(value) {
			post.content = value;
			onChange(post);
		}
	};

	// Handle form submission
	function handleSubmit() {
		if (!post.slug) {
			post.slug = slugify(post.heading);
		}
		onSubmit(post);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="drawer drawer-end">
		<input id="editor-drawer" type="checkbox" class="drawer-toggle" />

		<div class="drawer-content">
			<label for="editor-drawer" class="btn btn-square btn-ghost fixed top-4 right-4">
				<PanelRight class="h-6 w-6" />
			</label>

			<!-- Main content area -->
			<h1
				contenteditable
				class="h-24 w-full p-4 text-6xl font-medium focus:outline-none"
				bind:textContent={postProxy.heading}
			></h1>

			<div class="form-control w-full px-4">
				<TextEditor
					data={postProxy.content}
					help="Post content"
					className="text-xl"
					onChange={(data) => {
						postProxy.content = data;
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
						bind:value={postProxy.summary}
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
						bind:value={postProxy.slug}
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
						bind:value={postProxy.tags}
						placeholder="tag1, tag2, tag3"
						class="input input-bordered w-full focus:outline-none"
					/>

					{#if post.tags.length > 0}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each post.tags as tag}
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
