<script module lang="ts">
	export type SeoJsonLd = Record<string, unknown>

	export type SeoProps = {
		/** Page title. `SITE.titleSuffix` is appended unless `bareTitle` is set. */
		title: string
		description?: string
		/** Site-relative path, e.g. `/blog`. Omit to skip the canonical link. */
		path?: string
		/** Site-relative card path, e.g. `/og/blog.webp`. */
		image?: string
		imageAlt?: string
		type?: 'website' | 'article' | 'profile'
		/** Set on error/utility pages so they are not indexed. */
		noindex?: boolean
		bareTitle?: boolean
		/** Rendered as a JSON-LD block. Passed through verbatim. */
		jsonLd?: SeoJsonLd
	}

	/**
	 * `<` is escaped so a closing script tag inside any interpolated string
	 * cannot terminate the block early. JSON only needs that one escape, and it
	 * keeps the payload valid JSON.
	 */
	export const serialiseJsonLd = (data: SeoJsonLd): string =>
		JSON.stringify(data).replace(/</g, '\\u003c')
</script>

<script lang="ts">
	import { SITE, OG, absolute } from '$lib/site'

	/**
	 * Deliberately a component, not a snippet.
	 *
	 * Svelte's dev-mode `validate_snippet_args` rejects any snippet whose first
	 * argument is not a DOM `Node`. Inside `<svelte:head>` that argument is
	 * `undefined` during hydration, because `head()` only assigns an anchor in
	 * the non-hydrating branch. So a `{@render Seo(...)}` placed in
	 * `<svelte:head>` throws `invalid_snippet_arguments` in dev on every page.
	 * Validation is stripped from production builds, which is why it only shows
	 * up locally. Components never go through that code path.
	 */
	let {
		title,
		description,
		path,
		image,
		imageAlt,
		type = 'website',
		noindex = false,
		bareTitle = false,
		jsonLd
	}: SeoProps = $props()

	const resolvedTitle = $derived(bareTitle ? title : `${title} — ${SITE.titleSuffix}`)
	const resolvedDescription = $derived(description ?? SITE.description)
	const resolvedImage = $derived(absolute(image ?? OG.default))
	const canonical = $derived(path ? absolute(path) : undefined)
	const resolvedImageAlt = $derived(imageAlt ?? `${resolvedTitle} — ${SITE.name}`)
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:image" content={resolvedImage} />
	<meta property="og:image:type" content="image/webp" />
	<meta property="og:image:width" content={String(OG.width)} />
	<meta property="og:image:height" content={String(OG.height)} />
	<meta property="og:image:alt" content={resolvedImageAlt} />

	<!-- Twitter. `twitter:site` / `twitter:creator` are emitted once by the root
	     layout, since they are the same on every page. -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedImage} />
	<meta name="twitter:image:alt" content={resolvedImageAlt} />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${serialiseJsonLd(jsonLd)}</script>`}
	{/if}
</svelte:head>
