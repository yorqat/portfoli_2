import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { projects } from '$lib/content/works/indexWorks'

export const load: PageServerLoad = async ({ params }) => {
	const project = projects.find((p) => p.site.path === params.slug)

	if (!project) {
		error(404, `Project "${params.slug}" not found`)
	}

	return {
		slug: params.slug,
		project: project
	}
}
