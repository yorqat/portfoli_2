<script>
	import { page } from '$app/state'

	import { initializeTheme } from '$lib/theming'
	import { initializeReducedMotion } from '$lib/reduced-motion'

	let { children } = $props()

	$effect(() => {
		initializeTheme(page.data.theme)
		initializeReducedMotion(page.data.reducedMotion)
	})

	/* Normalize normalize */
	// import 'normalize.css'

	/* Paragraph body font */
	import '$fonts/Satoshi/Satoshi.css'

	/* Heading font */
	import '$fonts/Cantarell/Cantarell.css'

	/* Based styling opinions */
	// import '$styles/opinionated.scss'

	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'

	injectSpeedInsights()
</script>

{#key page.url.pathname}
	{@render children()}
{/key}

<style lang="scss" global>
	@use 'opinionated' as op;
	@use '_index' as i;

	@include op.html-body();

	@include i.input-links();
</style>
