import { type Site, type Descriptor } from '$lib/content/works/types'

export const site: Site = {
	class: 'utility-app',
	tags: ['responsive-layout', 'accessible'],
	title: 'UI Kitten',
	subtitle: 'Build scalable styles from the start',
	path: 'ui-kitten'
}

export const descriptor: Descriptor = {
	projectOverview:
		'An SCSS framework that scales styles and interactions from the start — Breakpoint-First, Variant-First, with zero-friction handoff from designer to developer.',
	roles: ['ux interaction designer', 'web developer'],
	tools: ['figma', 'relume'],
	technologies: ['svelte']
}
