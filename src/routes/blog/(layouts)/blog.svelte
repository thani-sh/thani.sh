<script lang="ts">
	export let title: string;
	export let description: string;
	export let date: string;
	export let tags: string[];

	const props = {
		title,
		description,
		date,
		tags
	};
</script>

<slot />
<br /><br />
<pre>{JSON.stringify(props, null, 2)}</pre>
