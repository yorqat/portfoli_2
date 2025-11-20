import type { Project } from '$lib/content/works/types'
import { projects } from '$lib/content/works/indexWorks'

export function load() {
	return { projects }
}
