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
		bg: $x-gray-100,

		primary-accent: #fff430,
		// yellow
		secondary-accent: #9c59d1 // purple
	);

	$custom-dark-theme: (
		primary-accent: #9c59d1,
		// purple
		secondary-accent: #fff430 // yellow
	);

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	// @include theming-impose-schemes-basic();
	@include theming-define-base();
	@include animations-declare-motions-basic();
</style>
