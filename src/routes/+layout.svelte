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
</script>

{#key page.url.pathname}
	{@render children()}
{/key}
