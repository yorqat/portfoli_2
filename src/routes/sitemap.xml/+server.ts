import { absolute } from '$lib/site'
import { posts } from '$lib/content/blogs/indexPosts'
import { projects } from '$lib/content/works/indexWorks'

/** Paths worth indexing, with a hand-set priority. */
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
	{ path: '/lounge', priority: '1.0', changefreq: 'monthly' },
	{ path: '/works', priority: '0.9', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/content', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.7', changefreq: 'monthly' }
]

/**
 * Playable experiments are deliberately left out: they are demos, not the work
 * being sold, and `/works/live/lemin-quench` only exists to redirect.
 */
const PRIVACY: { path: string; priority: string; changefreq: string }[] = [
	{ path: '/privacy', priority: '0.2', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.2', changefreq: 'yearly' }
]

const escape = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

interface Entry {
	loc: string
	lastmod?: string
	priority: string
	changefreq: string
}

export const GET = (): Response => {
	const entries: Entry[] = [
		...STATIC_ROUTES.map(({ path, priority, changefreq }) => ({
			loc: absolute(path),
			priority,
			changefreq
		})),
		...PRIVACY.map(({ path, priority, changefreq }) => ({
			loc: absolute(path),
			priority,
			changefreq
		})),
		...posts.map((post) => ({
			loc: absolute(`/blog/${post.slug}`),
			lastmod: new Date(post.metadata.date).toISOString().slice(0, 10),
			priority: '0.6',
			changefreq: 'yearly'
		})),
		...projects.map((project) => ({
			loc: absolute(`/works/describe/${project.site.path}`),
			priority: '0.7',
			changefreq: 'monthly'
		}))
	]

	const urls = entries
		.map(
			(entry) => `	<url>
		<loc>${escape(entry.loc)}</loc>${
			entry.lastmod
				? `
		<lastmod>${entry.lastmod}</lastmod>`
				: ''
		}
		<changefreq>${entry.changefreq}</changefreq>
		<priority>${entry.priority}</priority>
	</url>`
		)
		.join('\n')

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	})
}
