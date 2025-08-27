<script>
	const { children } = $props()

	import WorkMenu from '$lib/components/WorkMenu.svelte'
</script>

<div style="display: contents">
	<WorkMenu />
	{@render children()}
</div>
