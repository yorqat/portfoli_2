import type { PostFrontmatter, Post, PostModule } from './types'

// Eager glob = include all posts in build
const modules = import.meta.glob('./posts/*.md', { eager: true })

// Eager glob thumbnails (make sure the extensions match your assets)
const thumbs = import.meta.glob('./posts/*.{avif,webp,png,jpg}', {
	eager: true,
	query: {
		enhanced: true
	}
}) as Record<string, { default: string }>

export const posts: Post[] = Object.entries(modules)
	.map(([path, mod]) => {
		const post = mod as PostModule
		const slug = path.split('/').pop()?.replace(/\.md$/, '') as string

		// try to find a thumbnail with the same slug
		const thumbPath = Object.entries(thumbs).find(([thumb]) => thumb.includes(`${slug}.webp`))?.[1]
			?.default

		return {
			slug,
			chapters: post.chapters || [],
			metadata: post.metadata,
			component: post.default,
			thumbnail: thumbPath ?? '' // fallback empty if not found
		}
	})
	// sort new to old
	.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
