<script module lang="ts">
	import { SITE, OG, absolute } from '$lib/site'

	export { Seo }

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

{#snippet Seo(props: SeoProps)}
	{@const title = props.bareTitle ? props.title : `${props.title} — ${SITE.titleSuffix}`}
	{@const description = props.description ?? SITE.description}
	{@const image = absolute(props.image ?? OG.default)}
	{@const canonical = props.path ? absolute(props.path) : undefined}
	{@const imageAlt = props.imageAlt ?? `${title} — ${SITE.name}`}

	<title>{title}</title>
	<meta name="description" content={description} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
	{#if props.noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={props.type ?? 'website'} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/webp" />
	<meta property="og:image:width" content={String(OG.width)} />
	<meta property="og:image:height" content={String(OG.height)} />
	<meta property="og:image:alt" content={imageAlt} />

	<!-- Twitter. `twitter:site` / `twitter:creator` are emitted once by the root
	     layout, since they are the same on every page. -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />

	{#if props.jsonLd}
		{@html `<script type="application/ld+json">${serialiseJsonLd(props.jsonLd)}</script>`}
	{/if}
{/snippet}
