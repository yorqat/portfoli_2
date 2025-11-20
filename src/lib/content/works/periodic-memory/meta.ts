import { type Site, type Descriptor } from '$lib/content/works/types'

export const site: Site = {
	class: 'utility-app',
	tags: ['responsive-layout', 'accessible'],
	title: 'Periodic Memory',
	subtitle: 'Memorize the Periodic Table Already',
	path: 'periodic-memory'
}

export const descriptor: Descriptor = {
	projectOverview: 'A Scholar-friendly one and done tool for memorizing the Periodic Table',
	roles: ['ux interaction designer', 'web developer'],
	tools: ['figma'],
	technologies: ['svelte']
}
