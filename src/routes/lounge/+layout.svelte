<script>
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	// import "$lib/loungeFonts.css"

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

<div
	class="base"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	{@render children()}
</div>

<style lang="scss" global>
	@use '_index' as *;

	$custom-light-theme: (
		bg: $x-gray-100
	);

	$custom-dark-theme: ();

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	@include theming-impose-schemes-basic();
	@include animations-declare-motions-basic();
</style>
