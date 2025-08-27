import { SvelteMap } from 'svelte/reactivity'

type AttributeMap = SvelteMap<string, any>
type KitMap = SvelteMap<string, AttributeMap>

export const makeKit = (): KitMap => {
	const map = new SvelteMap()

	return map
}

export const makeAttribute = () => {
	const map: AttributeMap = new SvelteMap()

	return map
}
