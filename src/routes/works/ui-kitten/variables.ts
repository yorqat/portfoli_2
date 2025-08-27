// TODO: architect a solution for making a dependency tree for variables

import { SvelteMap } from 'svelte/reactivity'

export type IdentKey = string
export type Value = any

export type Variable = {
	description: string
	value: Value
	derived: IdentKey | () => Value | undefined
}

// Exports all variables as SCSS variables
const exportVariables = () => {}

// Import SCSS variable declarations into variables
const parseVariables = () => {}

export const createVariableLib = (): SvelteMap<IdentKey, Variable> => {
	return new SvelteMap()
}
