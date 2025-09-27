export type Post = {
	slug: string
	chapters: string[]
	metadata: PostFrontmatter
	component: unknown
	thumbnail?: string
}

export type PostModule = {
	metadata: PostIndexEntry
	thumbnail?: string
}

export interface PostFrontmatter {
	title: string
	date: string // ISO string
	readTimeMinutes: string // number

	seoTitle: string // keyword optimized title
	seoDescription: string // keyword optimized description
	colorAccent: string // color for embeds

	author: string
	description: string
	tags: BlogTag[]

	thumbnailHero?: string // defaults to slug
	thumbnailHeroCaption: string // defaults to slug
}

export interface PostIndexEntry extends PostFrontmatter {
	slug: string
}

// Types of tags grouped by axis
type BlogType =
	| 'case-study'
	| 'redesign'
	| 'tech-tip'
	| 'opinion'
	| 'guide'
	| 'tutorial'
	| 'deep-dive'
	| 'roundup'
	| 'analysis'
	| 'trend'

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

type Topic =
	| 'accessibility'
	| 'performance'
	| 'seo'
	| 'design-system'
	| 'ux'
	| 'ui'
	| 'animation'
	| 'workflow'
	| 'testing'
	| 'tooling'
	| 'state-management'
	| 'architecture'

type Audience =
	| 'beginner'
	| 'intermediate'
	| 'advanced'
	| 'for-clients'
	| 'for-developers'
	| 'for-designers'

// Namespaced tag type
export type BlogTag =
	| `type:${BlogType}`
	| `tech:${Technology}`
	| `topic:${Topic}`
	| `audience:${Audience}`
