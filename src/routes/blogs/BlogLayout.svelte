<script lang="ts">
	import NavBar from '$lib/NavBar.svelte'

	import { onNavigate } from '$app/navigation'
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'
	import type { Snippet } from 'svelte'

	interface BlogLayoutProps {
		chapters?: Snippet
		content?: Snippet
	}

	const { chapters, content }: BlogLayoutProps = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div
	id="blogs"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<div id="nav">
		<NavBar />
	</div>

	<div class="scroll-scheme base" id="content">
		<aside>{@render chapters?.()}</aside>
		<main>{@render content?.()}</main>
	</div>
</div>

<style lang="scss" global>
	@use '_index' as *;

	@use 'blogs' as *;
</style>
