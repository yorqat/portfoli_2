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
	import type { AxisDefinition } from '../../axesBuiltIn'
	import type { ComponentView, ComponentFlat } from '../Component.svelte'
	import { contextMenu } from '../contextMenu'

	type AxisProps = {
		axis: AxisDefinition
		selectedKit: ComponentView

		kits: ComponentFlat[]
		kitViews: ComponentView[]
	}

	let { axis, selectedKit, kits = $bindable(), kitViews = $bindable() }: AxisProps = $props()

	function findComponentView(
		views: ComponentView[],
		predicate: (view: ComponentView) => boolean
	): ComponentView | undefined {
		for (const view of views) {
			if (predicate(view)) return view

			if (view.children && view.children.length > 0) {
				const found = findComponentView(view.children, predicate)
				if (found) return found
			}
		}

		return undefined
	}

	export const recalcParams = (axis: string, axisValue: string) => {
		return () => {
			if (!selectedKit) return

			const recalc = findComponentView(kitViews, (view) => {
				return view.name === selectedKit.name && view.discriminator === selectedKit.discriminator
			})

			if (recalc) {
				recalc.params[axis] = axisValue
			}
		}
	}

	import type { TrackerExclusiveVariant } from '../../axesBuiltIn'
	import type { AxisVariantLayerTrace } from '../../cascadeAxesMap'

	const layers: AxisVariantLayerTrace | undefined = $derived.by(() => {
		const source = kits[selectedKit.source_index]

		if (source) {
			// Start iterating per axis
			let thing = source.sets.axisRank.map((item) => {
				// Then per axis variant
				return item.variants.map((v: TrackerExclusiveVariant) => {
					// Filter if the variant exists in the set
					let layers = source.sets.layers.filter((l) => {
						return Object.values(l.axes).find((a) => a === (v.id ?? v.name.toLowerCase()))
					})

					return {
						axis: `${item.id}:${v.id ?? v.name.toLowerCase()}`,
						layers: layers.map((l) => l.axes)
					}
				})
			})

			return (
				thing
					.flat(1)
					// Exclude unfounded layers
					.filter((l) => l.layers.length > 0)
					.reduce((acc, item) => {
						acc[item.axis] = item.layers
						return acc
					}, {})
			)
		}
	})

	// Decider for what color to display on the layer indicator
	const layerColorDecider: (axisVariant: string) => string | undefined = (axisVariant) => {
		if (!layers) return undefined
		let layerExists = layers[axisVariant]

		if (layerExists) {
			let last = layerExists[layerExists.length - 1]

			const hsv = stringSetToHSV(Object.keys(last))
			const hsvCss = `hsl(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`

			console.log(`Colour found ${hsvCss}`)

			return hsvCss
		}

		return undefined
	}

	$effect(() => {
		console.log(JSON.stringify(layers, null, 2))
	})

	const axisContextMenu = [
		{
			name: 'custom axis',
			description: 'Connect state',
			displayText: 'Connect',
			icon: 'fa-solid fa-upload',
			onClick: () => {}
		},
		'hr',

		{
			name: 'custom axis',
			description: 'Mark as export',
			displayText: 'Expose',
			icon: 'fa-solid fa-tower-broadcast',
			onClick: () => {}
		}
	]
</script>

<!-- A collapsible widget for axis variant tracking and selection for the axes set parameter -->
{#snippet axisField(
	axis: AxisDefinition,
	id: string,
	name: string,
	focused?: boolean,
	layered?: string
)}
	<div class="axis-field">
		<!-- Activated axis variant -->
		<label class="axis-field__name" title={axis.description}>
			<span>{name}</span>
			<input
				class="axis-field__radio"
				type="radio"
				onclick={recalcParams(axis.id, id)}
				name="{selectedKit.discriminator}-{axis.id?.toLowerCase() ?? axis.name.toLowerCase()}"
				checked={id === selectedKit.params[axis.id]}
			/>
		</label>

		<!-- Layer of axis variant -->
		<button
			class="axis-field__layer"
			class:axis-field__layer--focused={focused}
			class:axis-field__layer--ticked={!!layered}
			style={layered ? '--axis-field__layer-color: ' + layered : ''}
			disabled={!focused}
			aria-label="Add variant to params"
			title="Add variant to params"
		>
			<i class="fa-solid fa-diamond"></i>
		</button>
	</div>
{/snippet}

<details class="axis" open>
	<summary title={axis.description} class="axis__name" use:contextMenu={axisContextMenu}>
		<h3>
			{axis.name}
		</h3>

		<i class="fa-solid fa-angle-down axis__name__collapse-icon"></i>
	</summary>

	<ul class="axis__variants">
		{#each axis.variants as variant, i}
			{@const variantId = variant.id ?? variant.name.toLowerCase().replace(' ', '-')}

			<!-- whether exact variant is activated -->
			{@const focused = selectedKit.params[axis.id] === variantId}
			<!-- {@const axisVariantColor = stringSetToHSV()} -->

			<!-- Get this man a layer finder -->
			{@const layered = layerColorDecider(axis.id + ':' + variantId)}

			<li>
				{@render axisField(axis, variantId, variant.name, focused, layered)}
			</li>
		{/each}
	</ul>
</details>

<style lang="scss">
	@use '_index' as *;

	.axis {
		position: relative;
		user-select: none;

		&[open] .axis__name__collapse-icon {
			rotate: -180deg;
		}

		&__name {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: $x-space-md;
			cursor: pointer;
			border-radius: $x-space-xs;
			padding-block: $x-space-xs;
			font-size: $x-font-size-xs;
			text-transform: uppercase;
			@include fonts-stack('Satoshi-Bold', sans);
			gap: $x-space-md;

			& h3 {
				flex-grow: 1;
			}

			&__collapse-icon {
				transition: rotate 200ms ease-out;
				rotate: -360deg;
			}
		}

		&__variants {
			list-style-type: none;
			@include layout-flex-column();
		}
	}

	.axis-field {
		display: flex;
		flex-direction: row-reverse;
		gap: $x-space-xs;
		font-weight: 600;
		padding-block: calc($x-space-xs / 4);
		padding-inline: $x-space-xs;
		border-radius: $x-space-md;

		&:has(&__name:hover) {
			.axis-field__name {
				color: var(--color-primary);
			}
		}

		&:has(&__radio:checked) {
			background: var(--color-surface-alt);

			.axis-field__name {
				color: var(--color-primary);
			}

			&:has(input[type='radio']:checked):hover {
				.axis-field__name {
					color: var(--color-primary-hover);
				}
			}
		}

		&__name {
			flex-grow: 1;
			cursor: pointer;

			input[type='radio'] {
				opacity: 0;
			}
		}

		// Diamond layer tracker
		&__layer {
			width: $x-space-md;
			font-size: $x-font-size-sm;
			border: unset;
			background: unset;
			cursor: pointer;
			position: relative;
			color: var(--axis-field__layer-color, --color-surface);
			-webkit-text-stroke-width: 2px;
			-webkit-text-stroke-color: black;

			rotate: 45deg;
			opacity: 0.9;
			filter: saturate(0.9) brightness(0.7);
			transition: rotate 100ms ease-out;

			&--focused {
				rotate: 0deg;
				opacity: 1;
				filter: initial;
			}

			&:not(&--ticked) {
				opacity: 0;
			}

			&:focus {
				color: var(--color-text);
			}
		}
	}
</style>
