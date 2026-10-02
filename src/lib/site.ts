/**
 * Single source of truth for anything that appears in metadata.
 *
 * The origin used to be hardcoded in four places and disagreed with itself
 * (`www.yorqat.com` for canonicals, `yorqat.com` for the JSON-LD logo), so
 * everything now derives from here.
 */
export const SITE = {
	/** Canonical origin. No trailing slash. */
	origin: 'https://www.yorqat.com',

	name: 'Yor Qat',
	/** Appended as " — Yor Qat" to page titles that set their own. */
	titleSuffix: 'Yor Qat',
	tagline: 'I make UX you can feel in your bones and back up with numbers.',
	description:
		'I’m Yor Qat, an interface designer and front-end engineer building products that ship, scale, and serve real users.',

	locale: 'en_GB',
	lang: 'en',

	/**
	 * Fallback for routes that set no title of their own. Page-level titles win:
	 * Svelte renders the page's `<svelte:head>` before the layout's, and both
	 * browsers and crawlers read the first occurrence.
	 */
	defaultTitle: 'Yor Qat — interface designer & front-end engineer',

	social: {
		x: '@yorqat',
		linkedin: 'https://www.linkedin.com/in/yorqat/',
		github: 'https://github.com/yorqat'
	}
} as const

/** Every card is generated at this size by `scripts/generate-og.mjs`. */
export const OG = {
	width: 1200,
	height: 630,
	/** Site-wide fallback card. */
	default: '/og/default.webp',
	lounge: '/og/lounge.webp',
	blog: '/og/blog.webp',
	works: '/og/works.webp',
	content: '/og/content.webp'
} as const

/** Absolute URL for a site-relative path. */
export const absolute = (path: string): string =>
	`${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`

/** Per-post card path, e.g. `/og/blog/last-dark-mode-guide.webp`. */
export const postCard = (slug: string): string => `/og/blog/${slug}.webp`
