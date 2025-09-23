import type { PageServerLoad } from './$types'
import { posts } from '$lib/content/blogs/indexPosts'
import type { PostModule } from '$lib/content/blogs/types'

export const load: PageServerLoad = async (): PostModule => {
	return {
		posts: posts.map(({ slug, metadata, thumbnail }) => ({ slug, metadata, thumbnail }))
	}
}
