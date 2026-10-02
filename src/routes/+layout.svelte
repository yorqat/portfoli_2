<script>
	import { page } from '$app/state'

	import { initializeTheme } from '$lib/theming'
	import { initializeReducedMotion } from '$lib/reduced-motion'
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import { SITE } from '$lib/site'

	let { children } = $props()

	$effect(() => {
		initializeTheme(page.data.theme)
		initializeReducedMotion(page.data.reducedMotion)

		injectSpeedInsights()
		injectAnalytics()
	})

	/* Normalize normalize */
	// import 'normalize.css'

	/* Paragraph body font */
	import '$fonts/Satoshi/Satoshi.css'

	/* Heading font */
	import '$fonts/Cantarell/Cantarell.css'

	/* Based styling opinions */
	// import '$styles/opinionated.scss'
</script>

<!--
	Site-wide tags only — deliberately no title, description, canonical or image.

	The root layout's <svelte:head> is flushed *before* the page's, and both
	browsers and crawlers read the first occurrence of a title. Emitting a
	fallback here would therefore shadow every page's own metadata, so each route
	renders its own Seo instead.
-->
<svelte:head>
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:locale" content={SITE.locale} />
	<meta name="twitter:site" content={SITE.social.x} />
	<meta name="twitter:creator" content={SITE.social.x} />
</svelte:head>

{#key page.url.pathname}
	{@render children()}
{/key}

<style lang="scss" global>
	@use 'opinionated' as op;
	@use '_index' as i;

	@include op.html-body();

	@include i.input-links();
</style>
