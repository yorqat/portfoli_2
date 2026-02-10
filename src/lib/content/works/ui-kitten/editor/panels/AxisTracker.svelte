<!-- 
  This Axis Tracker is intended to be coloured based on whether there is an entry of the variant in the kit definition 
  with its accompanying colour heuristic; when no entry: NO colours.

  Note:
  When the variant with the tracker is NOT selected AKA NOT the current parameter of the Kit, then colour is desaturated and darkened

  TODO: Facilitate syncing with the current state

  Interaction

  Note:
  When interacting with a Tracker, 
-->

<script lang="ts" module>
	export type HSV = { h: number; s: number; v: number }

	export const stringSetToHSV = (() => {
		const cache = new Map<string, HSV>()

		const hash = (str: string): number => {
			let h = 0
			for (let i = 0; i < str.length; i++) {
				h = (h * 131 + str.charCodeAt(i)) >>> 0
			}
			return h
		}

		return function (parts: string[]): HSV {
			// Normalize + canonicalize
			const cleaned = Array.from(
				new Set(parts.map((s) => s.trim()).filter((s) => s.length > 0))
			).sort()

			const key = cleaned.join(';') // canonical memo key

			if (cache.has(key)) return cache.get(key)!

			// Hash whole set for hue
			const hWhole = hash(key)

			// Hash each element for value variation
			let elementHashTotal = 0
			for (const p of cleaned) elementHashTotal += hash(p)

			const len = cleaned.length

			// Saturation: specificity-based (smooth 50–100)
			const s = 50 + Math.tanh(len / 3) * 50

			// Value: 40–100 based on hashed composition
			const v = 60 + ((elementHashTotal % 1000) / 1000) * 40

			// Hue: 0–360
			const h = hWhole % 360

			const result = { h, s, v }
			cache.set(key, result)
			return result
		}
	})()
</script>

<script lang="ts">
	import { type AxesSet } from '../../cascadeAxesMap'

	type AxisTrackerProps = {
		axisVariant: string
		layers?: AxesSet
		focused?: boolean
	}

	const { layers = $bindable({}), axisVariant, focused }: AxisTrackerProps = $props()

	const color = $derived.by(() => {
		let layerExists = layers[axisVariant]

		if (layerExists) {
			const hsv = stringSetToHSV(Object.keys(layerExists[layerExists.length - 1]))
			return `hsl(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
		}

		return `var(--color-diamond-color--untracked)`
	})

	const ticked = $derived.by(() => {
		return true
	})

	const track = (axisVariant: string) => {}
</script>

<button
	class="axis-tracker"
	class:focused
	class:ticked
	disabled={!focused}
	style="--color: {color}"
	aria-label="Pipette Axes Params"
	onclick={() => track(axisVariant)}
>
	<i class="fa-solid fa-diamond"></i>
</button>

<!-- <pre>{JSON.stringify(layers, null, 2)}</pre> -->
<!-- <pre>{axisVariant}</pre> -->

<style lang="scss">
	@use '_index' as *;

	button {
		all: unset;
	}

	.axis-tracker {
		background: unset;
		font-size: $x-font-size-md;

		@include layout-respond-max('lg') {
			font-size: $x-font-size-md;
		}
		color: var(--color-diamond-color--tracked);
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: var(--color-diamond-border--untracked);

		&:hover {
			transform-origin: center center;
			scale: 1.6;
		}

		&.ticked {
			color: var(--color);
			-webkit-text-stroke-color: var(--color-diamond-border--tracked);
		}

		&:focus {
			scale: 1;
		}

		&:not(.focused) {
			filter: brightness(0.85) saturate(0.75);
			cursor: not-allowed;
			rotate: 45deg;
			transition: 50ms linear;
		}
	}
</style>
