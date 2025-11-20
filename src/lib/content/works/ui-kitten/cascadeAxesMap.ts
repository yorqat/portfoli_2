// ------------------------------------------
// 🧠 KIT•10 AxesCascade
// ------------------------------------------
// This class models a deterministic "axes-based" styling cascade.
// Think of it like CSS, but instead of selectors, you have AxesSets
// that define when a particular style block applies.
// ------------------------------------------

// TODO: Some functions are overengineered. Simplify to fit design intentions

/** A single axis can contain one or multiple variant values */
export type Axis = string | string[]

/** An AxesSet represents the active combination of axis states */
export type AxesSet = {
	[axisName: string]: Axis
}

/** Basic CSS-style rule dictionary */
export type Style = {
	[property: string]: string | number
}

/** Debugging info for a single style entry */
export type StyleSource = {
	axesSignature: string
	axes: AxesSet
	style: Style
	specificity: number
}

/** Trace entry returned after cascade resolution */
export type TraceEntry = {
	source: AxesSet // The AxesSet that defined this layer
	applied: Style // The style values that were merged
	overridden: string[] // List of properties that were overridden later
	specificity: number // Numeric precedence score
}

/** Final resolved result */
export type CascadeResult = {
	finalStyle: Style
	trace: TraceEntry[]
}

// ------------------------------------------
// 🎨 Axes Visualization Helpers
// ------------------------------------------
// These utilities describe relationships between AxesSets,
// allowing the UI to group or color-code them consistently.
// ------------------------------------------

/**
 * Generate a canonical "shape" signature from an AxesSet.
 * Two AxesSets are considered to belong to the same family if
 * their signature strings are equal.
 *
 * Example:
 *   { theme: 'dark', density: 'compact' } → "density+theme"
 */
export function getAxesSignature(axes: AxesSet): string {
	return Object.keys(axes).sort().join('+')
}

/**
 * Determine whether two AxesSets are orthogonal, coinciding, or overlapping.
 * - "coincide" → exactly same keys
 * - "overlap" → share at least one key
 * - "orthogonal" → share no keys
 *
 * Example:
 *   getAxesRelationship({theme:'light'}, {theme:'dark'}) → "coincide"
 *   getAxesRelationship({theme:'light'}, {density:'compact'}) → "orthogonal"
 */
export function getAxesRelationship(a: AxesSet, b: AxesSet): 'coincide' | 'overlap' | 'orthogonal' {
	const keysA = new Set(Object.keys(a))
	const keysB = new Set(Object.keys(b))
	const intersection = [...keysA].filter((k) => keysB.has(k))

	if (intersection.length === keysA.size && keysA.size === keysB.size) return 'coincide'
	if (intersection.length > 0) return 'overlap'
	return 'orthogonal'
}

export type AxesManager = {
	layers: StyleSource[]
	axisRank: AxisDefinition[]
}

export const calculateSpecificity = (axesManager: axesManager, axes: AxesSet): number => {
	let score = Object.keys(axes).length * 100

	for (const [i, name] of axesManager.axisRank.entries()) {
		if (name in axes) {
			// Give more weight to axes appearing earlier in the rank list
			score += axesManager.axisRank.length - i
		}
	}

	return score
}

export const areAxesSetsEquivalent = (a: AxesSet, b: AxesSet): boolean => {
	const keysA = Object.keys(a).sort()
	const keysB = Object.keys(b).sort()
	if (keysA.length !== keysB.length) {
		console.log('Length is very different')
		console.dir(keysA)
		console.dir(keysB)
		console.log('-------------------------')
		return false
	}
	if (!keysA.every((k, i) => k === keysB[i])) {
		console.log('Keys are not exactly the same')
		return false
	}

	for (const key of keysA) {
		const aVals = Array.isArray(a[key]) ? [...a[key]].sort() : [a[key]]
		const bVals = Array.isArray(b[key]) ? [...b[key]].sort() : [b[key]]
		if (aVals.length !== bVals.length) return false
		for (let i = 0; i < aVals.length; i++) {
			if (aVals[i] !== bVals[i]) return false
		}
	}

	return true
}

export const add = (axesManager: axesManager, axes: AxesSet, style: Style) => {
	// Step 1: Try to find an existing layer with an equivalent AxesSet
	const existing = axesManager.layers.find((layer) => areAxesSetsEquivalent(layer.axes, axes))

	if (existing) {
		// Step 2: Override the existing layer's style
		// Optionally merge — but overwrite takes priority for same keys
		existing.style = { ...existing.style, ...style }

		// Recalculate specificity in case axisRank changed or expanded
		existing.specificity = calculateSpecificity(axesManager, axes)
		console.log(`Exists, adding to set ${JSON.stringify(existing)}`)
	} else {
		// Step 3: Create a new layer if no match was found
		axesManager.layers.push({
			axes,
			style,
			specificity: calculateSpecificity(axesManager, axes)
		})

		console.log(`Spawned new layer ${JSON.stringify(axes)}`)
	}
}

export const addAxis = (axesManager: AxesManager, axis: AxisDefinition) => {
	axesManager.axisRank.push(axis)
}

export const matches = (context: AxesSet, ruleAxes: AxesSet): boolean => {
	for (const key in ruleAxes) {
		const ruleVal = Array.isArray(ruleAxes[key]) ? ruleAxes[key] : [ruleAxes[key]]
		const ctxVal = Array.isArray(context[key]) ? context[key] : [context[key]]
		if (!ruleVal.every((v) => ctxVal.includes(v))) return false
	}
	return true
}

export const resolve = (axesManager: AxesManager, context: AxesSet): CascadeResult => {
	const matched = axesManager.layers
		.filter(({ axes }) => matches(context, axes))
		.sort((a, b) => a.specificity - b.specificity)

	const trace: TraceEntry[] = []
	const finalStyle: Style = {}
	const appliedProps = new Set<string>()

	for (const { axes, style, specificity } of matched) {
		const overridden: string[] = []

		for (const prop in style) {
			if (appliedProps.has(prop)) overridden.push(prop)
			finalStyle[prop] = style[prop]
			appliedProps.add(prop)
		}

		trace.push({
			source: axes,
			applied: style,
			overridden,
			specificity
		})
	}

	return { finalStyle, trace }
}

// ------------------------------------------
// 🧩 AxesCascade
// ------------------------------------------

export class AxesCascade {
	private layers: StyleSource[] = [] // All added styles
	axisRank: AxisDefinition[] = [] // User-defined axis importance hierarchy

	constructor(axisRank: string[] = []) {
		this.axisRank = axisRank
	}

	addAxis(axis: AxisDefinition) {
		this.axisRank.push(axis)
	}

	// ------------------------------------------
	// ➕ Add or update a Style rule for an AxesSet
	// ------------------------------------------
	// This method registers a style layer associated with a given
	// combination of axes. If a matching AxesSet already exists,
	// it will be updated/overridden instead of duplicated.
	// ------------------------------------------
	add(axes: AxesSet, style: Style) {
		// Step 1: Try to find an existing layer with an equivalent AxesSet
		const existing = this.layers.find((layer) => this.areAxesSetsEquivalent(layer.axes, axes))

		if (existing) {
			// Step 2: Override the existing layer's style
			// Optionally merge — but overwrite takes priority for same keys
			existing.style = { ...existing.style, ...style }

			// Recalculate specificity in case axisRank changed or expanded
			existing.specificity = this.calculateSpecificity(axes)
		} else {
			// Step 3: Create a new layer if no match was found
			this.layers.push({
				axes,
				style,
				specificity: this.calculateSpecificity(axes)
			})
		}
	}

	// ------------------------------------------
	// 🧭 Axes-space equivalence check
	// ------------------------------------------
	// Determines whether two AxesSets represent the same position
	// in the conceptual "axes space" — meaning they define the same
	// combination of axis *keys* and *values*, ignoring object identity
	// or order. Useful for deduplication and editor visualization.
	// Example:
	//   A = { theme: 'light', highContrast: 'true' }
	//   B = { highContrast: 'true', theme: 'light' }
	//   areAxesSetsEquivalent(A, B) ✅ true
	// ------------------------------------------
	areAxesSetsEquivalent(a: AxesSet, b: AxesSet): boolean {
		const keysA = Object.keys(a).sort()
		const keysB = Object.keys(b).sort()
		if (keysA.length !== keysB.length) return false
		if (!keysA.every((k, i) => k === keysB[i])) return false

		for (const key of keysA) {
			const aVals = Array.isArray(a[key]) ? [...a[key]].sort() : [a[key]]
			const bVals = Array.isArray(b[key]) ? [...b[key]].sort() : [b[key]]
			if (aVals.length !== bVals.length) return false
			for (let i = 0; i < aVals.length; i++) {
				if (aVals[i] !== bVals[i]) return false
			}
		}

		return true
	}

	// ------------------------------------------
	// 🔍 Resolve styles for a given context
	// ------------------------------------------
	// Given the currently active axes (e.g. { theme: "dark", highContrast: "true" }),
	// this will:
	//   1. Filter only matching style layers
	//   2. Sort them by calculated specificity
	//   3. Merge their styles in order (low → high)
	//   4. Record trace info, including overridden properties
	// ------------------------------------------
	resolve(context: AxesSet): CascadeResult {
		// Step 1: Select matching style sources
		const matched = this.layers
			.filter(({ axes }) => this.matches(context, axes))
			.sort((a, b) => a.specificity - b.specificity)

		const trace: TraceEntry[] = []
		const finalStyle: Style = {}
		const appliedProps = new Set<string>()

		// Step 2: Merge styles in increasing specificity order
		for (const { axes, style, specificity } of matched) {
			const overridden: string[] = []

			for (const prop in style) {
				// If property already applied earlier, mark as overridden
				if (appliedProps.has(prop)) overridden.push(prop)

				// Apply (or override) style property
				finalStyle[prop] = style[prop]

				// Track property existence for later layers
				appliedProps.add(prop)
			}

			trace.push({
				source: axes,
				applied: style,
				overridden,
				specificity
			})
		}

		return { finalStyle, trace }
	}

	// ------------------------------------------
	// 🧮 Calculate specificity
	// ------------------------------------------
	// Specificity combines:
	//   - Number of axes (more axes = more specific)
	//   - Rank order of each axis (defined by user)
	// This ensures that if two rules define the same number of axes,
	// the one using higher-ranked axes wins.
	// ------------------------------------------
	private calculateSpecificity(axes: AxesSet): number {
		let score = Object.keys(axes).length * 100

		for (const [i, name] of this.axisRank.entries()) {
			if (name in axes) {
				// Give more weight to axes appearing earlier in the rank list
				score += this.axisRank.length - i
			}
		}

		return score
	}

	// ------------------------------------------
	// ⚖️ Matching logic
	// ------------------------------------------
	// Determines whether a style layer's AxesSet matches the current context.
	// Rule: the layer's AxesSet must be a *subset* of the current context.
	// Example:
	//   context = { theme: "dark", density: "compact" }
	//   ruleAxes = { theme: "dark" } ✅ matches
	//   ruleAxes = { theme: "light" } ❌ no match
	// ------------------------------------------
	private matches(context: AxesSet, ruleAxes: AxesSet): boolean {
		for (const key in ruleAxes) {
			const ruleVal = Array.isArray(ruleAxes[key]) ? ruleAxes[key] : [ruleAxes[key]]
			const ctxVal = Array.isArray(context[key]) ? context[key] : [context[key]]
			if (!ruleVal.every((v) => ctxVal.includes(v))) return false
		}
		return true
	}

	// ------------------------------------------
	// 🧾 Debug utility
	// ------------------------------------------
	// Prints a readable summary of the cascade trace for inspection.
	// ------------------------------------------
	debugTrace(result: CascadeResult) {
		console.table(
			result.trace.map((t) => ({
				Axes: JSON.stringify(t.source),
				Specificity: t.specificity,
				Applied: Object.keys(t.applied).join(', '),
				Overridden: t.overridden.join(', ')
			}))
		)
	}
}

// ------------------------------------------
// 🧪 Example usage
// ------------------------------------------

const cascade = new AxesCascade(['theme', 'highContrast', 'density'])

cascade.add({}, { border: '1px solid gray', background: 'white' })
cascade.add({ theme: 'dark' }, { background: 'black', color: 'white' })
cascade.add({ theme: 'dark', highContrast: 'true' }, { border: '2px solid lime' })

const result = cascade.resolve({ theme: 'dark', highContrast: 'true' })

console.log('✅ Final style:', result.finalStyle)
cascade.debugTrace(result)

const cascade_ = new AxesCascade(['theme', 'density', 'highContrast'])

// Add a few rules
cascade_.add({ theme: 'dark', highContrast: 'true' }, { color: 'white' })
cascade_.add({ theme: 'dark', highContrast: 'true' }, { border: '2px solid lime' })
cascade_.add({ theme: 'light', highContrast: 'true' }, { color: 'black' })
cascade_.add({ theme: 'light', highContrast: 'false' }, { color: 'grey' })
cascade_.add({ theme: 'dark', density: 'compact' }, { padding: 4 })

// Now group layers that belong to the same "axes space"
const groups: AxesSet[][] = []

for (const layer of (cascade_ as any).layers) {
	let found = false

	for (const group of groups) {
		if (cascade_.areAxesSetsEquivalent(group[0], layer.axes)) {
			group.push(layer.axes)
			found = true
			break
		}
	}

	if (!found) groups.push([layer.axes])
}

console.log('🧭 Axes equivalence groups:', groups)
