import type { ComponentFlat, ComponentView } from './editor/Component.svelte'
import type { Token, TokenLibrary } from './editor/Variables.svelte'
import { SvelteMap } from 'svelte/reactivity'

export type Kit10ProjectMeta = {
	name: string
	description: string
	author: string
	license: string
}

export interface Kit10Project extends Kit10ProjectMeta {
	viewPortFocus: { x: number; y: number }
	tokens: Token[]
	tokenLibraries: TokenLibrary
	kits: ComponentFlat[]
	kitViews: ComponentView[]
}
