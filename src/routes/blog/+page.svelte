<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto p-4 pt-32">
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
