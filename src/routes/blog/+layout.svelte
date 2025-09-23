<script>
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	const { children } = $props()

	import { onNavigate } from '$app/navigation'
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

{@render children()}

<style lang="scss" global>
	@use 'blogs' as *;
</style>
