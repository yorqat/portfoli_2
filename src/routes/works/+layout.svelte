<script>
	const { children } = $props()

	import WorkMenu from '$lib/components/WorkMenu.svelte'
</script>

<div style="display: contents">
	{@render children()}
</div>

<style lang="scss">
	@use '_index' as *;
</style>
