<script>
	export let src;
	export let title;
	export let height = '600px';
</script>

<div class="my-4 flex border border-gray-400" style="height: {height};">
	<iframe {title} {src} width="100%" height="100%" scrolling="no"></iframe>
</div>
