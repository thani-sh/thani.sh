<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Define props
	export let data: any = {};
	export let help: string = 'Write your content here...';
	export let onChange: (data: any) => void = () => {};
	export let className: string = '';
	export let readOnly: boolean = false;

	// Editor instance
	let editor: any = null;
	let editorElement: HTMLElement;

	// Initialize the editor when the component is mounted
	onMount(async () => {
		if (typeof window !== 'undefined') {
			const EditorJS = (await import('@editorjs/editorjs')).default;

			try {
				// Initialize Editor.js
				editor = new EditorJS({
					holder: editorElement,
					data: data,
					readOnly: readOnly,
					placeholder: help,
					autofocus: false,
					tools: {
						header: (await import('@editorjs/header')).default,
						list: (await import('@editorjs/list')).default,
						code: (await import('@calumk/editorjs-codecup')).default,
						delimiter: (await import('@editorjs/delimiter')).default,
						inlineCode: (await import('@editorjs/inline-code')).default
					},
					onChange: async () => {
						try {
							onChange(await editor.save());
						} catch (e) {
							console.error('Error saving editor content', e);
						}
					}
				});
			} catch (error) {
				console.error('Error initializing editor', error);
			}
		}
	});

	// Save content method that can be called externally
	export async function save() {
		if (editor) {
			try {
				const savedData = await editor.save();
				return savedData;
			} catch (e) {
				console.error('Error saving content', e);
				return null;
			}
		}
		return null;
	}

	// Cleanup when the component is destroyed
	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor = null;
		}
	});
</script>

<div class="text-editor-container">
	<div bind:this={editorElement} class="text-editor {className}"></div>
</div>

<style>
	.text-editor-container {
		width: 100%;
		border-radius: 0.375rem;
	}

	.text-editor {
		min-height: 200px;
	}

	:global(.ce-block__content) {
		max-width: none;
		width: 100%;
	}

	:global(.ce-toolbar__content) {
		max-width: none;
		width: 100%;
	}
</style>
