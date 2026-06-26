<script lang="ts">
	import { onMount } from 'svelte';
	import { BackgroundCanvas } from './background';

	let { class: className = '' }: { class?: string } = $props();
	let canvas: HTMLCanvasElement;
	let instance: BackgroundCanvas | null = null;

	onMount(() => {
		instance = new BackgroundCanvas(canvas);
		instance.start();
		return () => instance?.stop();
	});
</script>

<canvas bind:this={canvas} class={className} aria-hidden="true"></canvas>

<style>
	canvas {
		display: block;
	}
</style>