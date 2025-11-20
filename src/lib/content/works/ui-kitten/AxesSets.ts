import { SvelteMap } from 'svelte/reactivity'

// An individual axis can be a single variant or multiple active variants
export type Axis = string | string[]

// AxesSet: a collection of axis names mapped to their variants
export type AxesSet = {
	[axisName: string]: Axis
}

// Style: typical CSS properties or design values
export type Style = {
	[property: string]: string | number
}

// -------------------------------
// 2️⃣ Queryable AxesMap
// -------------------------------

// Internally we store keys as serialized strings for lookup
export class AxesMap {
	private map: Map<string, Style> = new Map()

	// Serialize an AxesSet into a stable key string94px
	private serialize(axes: AxesSet): string {
		const entries = Object.entries(axes)
			.map(([k, v]) => (Array.isArray(v) ? `${k}=${v.sort().join('|')}` : `${k}=${v}`))
			.sort() // sort keys to make key order-independent
		return entries.join(';')
	}

	// Add a style for a given AxesSet
	set(axes: AxesSet, style: Style) {
		const key = this.serialize(axes)
		this.map.set(key, style)
	}

	// Get style for exact match
	get(axes: AxesSet): Style | undefined {
		const key = this.serialize(axes)
		return this.map.get(key)
	}

	// Query by partial axes match
	query(partialAxes: Partial<AxesSet>): Style[] {
		const results: Style[] = []

		for (const [key, style] of this.map.entries()) {
			const entryAxes: AxesSet = Object.fromEntries(
				key.split(';').map((kv) => {
					const [axis, value] = kv.split('=')
					return [axis, value.includes('|') ? value.split('|') : value]
				})
			)

			let match = true
			for (const axis in partialAxes) {
				const partialValue = partialAxes[axis]
				const entryValue = entryAxes[axis]

				if (!entryValue) {
					match = false
					break
				}

				const entryArray = Array.isArray(entryValue) ? entryValue : [entryValue]
				const partialArray = Array.isArray(partialValue) ? partialValue : [partialValue]

				if (!partialArray.every((v) => entryArray.includes(v))) {
					match = false
					break
				}
			}

			if (match) results.push(style)
		}

		return results
	}
}
