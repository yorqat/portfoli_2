export type SiteClass =
	| 'product-concept' // a clear idea that could be real tomorrow
	| 'ui-mockup' // clean, clickable design preview
	| 'utility-app' // solves a specific, useful problem
	| 'case-study' // shows thought process start to finish
	| 'success-story' // demonstrably increased conversion rates for business

export type ResponsiveTag =
	| 'mobile-ready' // works great on small screens
	| 'desktop-ready' // looks sharp on big screens
	| 'responsive-layout' // adapts smoothly between sizes
	| 'accessible' // thoughtful about different user needs

export type SiteTag = ResponsiveTag[]

export type Site = {
	class: SiteClass
	tags: SiteTag
	title: string
	subtitle?: string
	path: string
}

export type Role =
	| 'visual brand designer'
	| 'art director'
	| 'illustrator'
	| 'product designer'
	| 'ui kit designer'
	| 'design systems designer'
	| 'ux researcher'
	| 'ux interaction designer'
	| 'ux motion designer'
	| 'web developer'
	| 'frontend prototyper'

export type Tool =
	| 'figma'
	| 'penpot'
	| 'relume'
	| 'after-effects'
	| 'illustrator'
	| 'photoshop'
	| 'ui-kitten'

type Technology =
	| 'scss'
	| 'svelte'
	| 'sveltekit'
	| 'react'
	| 'vue'
	| 'angular'
	| 'astro'
	| 'qwik'
	| 'typescript'
	| 'javascript'
	| 'css'
	| 'tailwind'
	| 'node'
	| 'rust'
	| 'gsap'
	| 'three'

export type Descriptor = {
	// Author's summarized POV on technical
	// and design decisions
	projectOverview: string
	roles: Role[]
	tools: Tool[]
	technologies: Technology[]
}

export interface Project {
	site: Site
	descriptor: Descriptor
}
