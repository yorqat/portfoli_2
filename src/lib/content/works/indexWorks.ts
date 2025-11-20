// src/lib/content/works/utils.ts
import type { Site, Descriptor, Project } from './types'

// Eager glob = resolved at build
const modules = import.meta.glob('$lib/content/works/**/meta.ts', { eager: true })

export const projects: Project[] = Object.values(modules).map((mod: any) => ({
	site: mod.site as Site,
	descriptor: mod.descriptor as Descriptor
}))
// optional: sort by title or custom field
// .sort((a, b) => a.title.localeCompare(b.title))
