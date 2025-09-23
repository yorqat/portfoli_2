<script lang="ts">
	import NavBar from '$lib/NavBar.svelte'

	import { onNavigate } from '$app/navigation'
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'
	import type { Snippet } from 'svelte'

	interface WorkLayoutProps {
		prototype: Snippet
		brandIdentity?: Snippet
		designOutline?: Snippet
	}

	const { prototype, brandIdentity, designOutline }: WorkLayoutProps = $props()
</script>

<div
	id="works"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<aside id="nav">
		<NavBar />
	</aside>

	<div class="scroll-scheme base" id="content">
		<article>
			{@render prototype()}
		</article>

		<section>
			{@render brandIdentity?.()}
		</section>

		<section>
			{@render designOutline?.()}
		</section>
	</div>
</div>

<style lang="scss" global>
	@use '_index' as *;
</style>
