import type { PageServerLoad } from './$types'
import { posts } from '$lib/content/blogs/indexPosts'
import type { Post } from '$lib/content/blogs/types'

export const load: PageServerLoad = async ({ params }): Post => {
	const post = posts.find((p) => p.slug === params.slug)

	if (!post) {
		throw new Error(`Post not found: ${params.slug}`)
	}

	return {
		slug: post.slug,
		metadata: post.metadata,
		chapters: post.metadata?.chapters ?? [],
		thumbnail: post.thumbnail
		// ❌ don’t return component here (not serializable)
	}
}
