<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl p-8 lg:mt-24 lg:mb-24">
	{@render children()}
</div>
