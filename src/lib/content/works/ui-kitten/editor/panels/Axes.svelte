<script lang="ts">
	import type { ComponentFlat, ComponentView } from '../Component.svelte'
	import Panel from '../Panel.svelte'
	import { type AxesSet } from '../../cascadeAxesMap'
	import { stringSetToHSV } from './AxisTracker.svelte'

	type AxesPanel = {
		selectedKit?: ComponentView
		kits: ComponentFlat[]
		kitViews: ComponentView[]
	}

	const { selectedKit, kits = $bindable(), kitViews = $bindable() }: AxesPanel = $props()

	const axesAddContextMenu: ContextMenuContent = $derived.by(() => {
		return [
			{
				name: 'custom axis',
				description: 'Add custom axis',
				displayText: 'Custom Axis',
				icon: 'fa-solid fa-plus',
				onClick: () => {}
			},

			'hr',

			...builtinAxes.map((axis) => {
				if (axis) {
					let disabled = false

					if (selectedKit) {
						const axisExistsAlready = kits[selectedKit.source_index].sets.axisRank.find((a) => {
							console.log(`Comparing '${a.id}' to '${axis.id}'`)
							return true
						})

						if (axisExistsAlready) {
							console.log('Axis indeed exists')
							disabled = true
						}
					}

					return {
						name: axis.name,
						description: axis.description,
						displayText: axis.name,
						icon: `fa-solid ${axis.category === 'Static' ? 'fa-cubes' : 'fa-dice-d6'}`,
						onClick: addAxis(axis),
						disabled: disabled
					}
				} else {
					return 'hr'
				}
			})
		]
	})

	function addAxis(axis: AxisDefinition) {
		return () => {
			if (selectedKit) {
				// select the target
				const source = kits[selectedKit.source_index]

				if (source) {
					source.sets.axisRank.push(axis)

					// add(source.sets, selectedKit.params, {})

					/*
					recalcParams(
						axis.id ?? axis.name.toLowerCase(),
						axis.variants[0].id ?? axis.variants[0].name
					)
          */
				}
			}
		}
	}

	import { type TrackerExclusiveVariant, type AxisDefinition, builtinAxes } from '../../axesBuiltIn'
	import type { ContextMenuContent } from '../contextMenuStore'
	import Axis from './Axis.svelte'
	import type { AxisVariantLayerTrace } from '../../cascadeAxesMap'

	// Basically backtracks kit Definitions to find respective
	// Layers for each axis variant
	const layers: AxisVariantLayerTrace | undefined = $derived.by(() => {
		if (selectedKit) {
			// select the target
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

				// Exclude unfounded layers
				return thing
					.flat(1)
					.filter((l) => l.layers.length > 0)
					.reduce((acc, item) => {
						acc[item.axis] = item.layers
						return acc
					}, {})
			}
		}
	})

	const layersCollapsed: AxesSet[] | undefined = $derived.by(() => {
		if (layers) {
			const collapsed = Object.values(layers)
				.flat() // flatten all layer arrays
				.map((o) => JSON.stringify(o)) // convert to string to dedupe
				.filter((v, i, arr) => arr.indexOf(v) === i)
				.map((v) => JSON.parse(v))

			return collapsed
		}
	})

	const layerWidgets = $derived.by(() => {
		if (layersCollapsed) {
			// Step 1: get key arrays, sorted
			const keyArrays = layersCollapsed.map((layer) => Object.keys(layer).sort())

			// Step 2: group by length and remove duplicates
			const grouped = keyArrays.reduce((acc: { [name: string]: {} }, keys) => {
				const len = keys.length
				const serialized = keys.join(',')
				acc[len] = acc[len] || new Set()
				acc[len].add(serialized)
				return acc
			}, {})

			// Step 3: convert sets back to array of arrays
			const axisShapes = Object.values(grouped).map((set) =>
				Array.from(set).map((s) => s.split(','))
			)

			return axisShapes
		}
	})

	let selectedLayer: string = $state('')

	/*
	$effect(() => {
		console.log('Selected layer: ' + JSON.stringify(selectedLayer, null, 2))
	})
  */
</script>

<Panel contextMenuContent={axesAddContextMenu} name="Axes" tooltip="Adjust the axes set">
	{#snippet content()}
		<!-- <p>{JSON.stringify(selectedLayer)}</p> -->
		<div class="layers">
			<label class="layer layer--base" aria-label="&lcub; &rcub;" title="No Axes layer">
				<i class="layer--new__icon fa-solid fa-diamond"></i>
				<input type="radio" name="same" disabled />
			</label>

			{#if layerWidgets}
				{#each layerWidgets as layer}
					<div class="layer__specificity">
						{#each layer as l}
							{@const hsv = stringSetToHSV(l)}

							<label
								style="--colour:hsl({hsv.h}, {hsv.s}%, {hsv.v}%);"
								title={JSON.stringify(l, null, 2)}
								class="layer layer--valued"
								aria-label="&lcub; &rcub;"
							>
								<i class="layer--new__icon fa-solid fa-diamond"></i>
								<input
									type="radio"
									value={JSON.stringify(l)}
									name="layers"
									disabled
									bind:group={selectedLayer}
								/>
							</label>
						{/each}
					</div>
				{/each}
			{/if}

			<label class="layer layer--new layer--last" aria-label="&lcub; &rcub;">
				<i class="layer--new__icon fa-solid fa-diamond"></i>
				<input type="radio" name="some" disabled />
				<i class="layer--new__icon fa-solid fa-plus"></i>
			</label>
		</div>

		{#if !selectedKit}
			<p>Select a <strong>Kit</strong></p>
		{:else if kits[selectedKit.source_index]}

      <!-- Add Axis to Selected Kit -->
			{#if kits[selectedKit.source_index].sets.axisRank.length === 0}
				<p>
					<i class="fa-solid fa-up-long"></i> Add Axis to
					<strong>{selectedKit.name ?? kits[selectedKit.source_index].name}</strong>
				</p>
			{/if}

      <!-- Use key to rerender selected variant properly -->
      {#key kits[selectedKit.source_index]}
			  {#each kits[selectedKit.source_index].sets.axisRank as axis}
				  <Axis {selectedKit} {axis} {kits} {kitViews} />
			  {/each}
      {/key}
		{/if}
	{/snippet}
</Panel>

<style lang="scss">
	@use '_index' as *;

	input[type='text'] {
		border-radius: $x-space-lg;
		text-align: center;
	}

	.layer__specificity {
		@include layout-flex-column();
		gap: $x-space-xs;
	}

	.layers {
		display: flex;
		gap: $x-space-xs;
		overflow-x: auto;
		padding-block: $x-space-xs;
		user-select: none;

		.layer {
			padding: 0 $x-space-xs;
			font-size: $x-font-size-md;

			@include layout-respond-max('lg') {
				font-size: $x-font-size-sm;
				padding: 0 calc($x-space-xs / 2);
			}

			-webkit-text-stroke-width: 2px;
			height: max-content;

			@keyframes rainbow {
				0%,
				100% {
					--colour: rgb(220, 150, 150);
				} /* soft dark red */
				10% {
					--colour: rgb(220, 165, 140);
				} /* soft dark orange */
				20% {
					--colour: rgb(160, 200, 160);
				} /* muted darker green */
				35% {
					--colour: rgb(160, 200, 200);
				} /* muted cyan */
				50% {
					--colour: rgb(160, 175, 210);
				} /* muted sky */
				60% {
					--colour: rgb(150, 150, 210);
				} /* muted blue */
				75% {
					--colour: rgb(185, 160, 210);
				} /* softened violet */
				85% {
					--colour: rgb(220, 160, 220);
				} /* muted magenta */
				95% {
					--colour: rgb(220, 160, 180);
				} /* muted rose */
			}

			&--valued {
				border: 2px solid var(--color-panel-border);
				box-shadow: 0rem 0.3rem var(--color-panel-border);
				color: var(--colour);
				-webkit-text-stroke-color: black;

				&:hover {
					background: var(--color-bg);
				}
			}

			&--new {
				box-shadow: 0rem 0.25rem var(--colour);
				border: 2px solid var(--colour);
				color: var(--colour);

				animation: rainbow 5s linear;
				animation-iteration-count: infinite;

				-webkit-text-stroke-width: unset;
			}

			border-radius: $x-space-xs;
			background: var(--color-surface);

			// hide the radios
			input[type='radio'] {
				position: absolute;
				opacity: 0;
			}

			&:has(input[type='radio']:checked) {
				translate: 0 calc($x-space-xs * -0.25);
				box-shadow: 0 0.15rem var(--color-surface-alt);
				translate: 0 calc($x-space-xs * 0.55);
				border: 2px solid var(--colour, --color-primary);
				background: var(--color-surface-alt);
				filter: brightness(1.1) saturate(1.1);
			}

			&:has(input[type='radio']:disabled) {
				border: 2px dashed var(--color-bg);
				background: var(--color-bg);
				color: var(--color-surface);
				-webkit-text-stroke-color: var(--color-text);
			}
		}
	}

	.axis {
		position: relative;
		user-select: none;

		&[open] .axis__heading__collapse-icon {
			rotate: -180deg;
		}

		&__heading {
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

		&__content {
			// padding-inline: $x-space-xs;
			transition:
				max-height 100ms ease-out,
				translate 200ms ease-out;
		}
	}

	.tracker {
		display: flex;
		flex-direction: column;

		--gap: $x-space-md;
	}

	.tracker__element {
		display: flex;
		flex-grow: 1;
		cursor: pointer;
		// border-left: 2px solid var(--color-surface);
		padding-left: $x-space-xs;
		flex-direction: row-reverse;
		align-items: center;
		border-radius: $x-space-md;

		gap: $x-space-xs;

		label {
			cursor: pointer;
			display: flex;
			flex-grow: 1;
			padding-inline: $x-space-xs;
			@include fonts-stack('Satoshi-Regular', sans);
			font-size: $x-font-size-md;
			font-weight: 600;

			&:hover {
				color: var(--color-primary);
			}

			// TODO: rewrite this illegal written
			&:has(input[type='radio']:checked) + * {
				color: var(--color-warning);
				-webkit-text-stroke-color: black;
			}
		}

		&__track {
			width: $x-space-md;
			font-size: $x-font-size-md;
			border: unset;
			background: unset;
			cursor: pointer;
			position: relative;
			color: var(--color-surface);
			-webkit-text-stroke-width: 2px;
			-webkit-text-stroke-color: var(--color-text);

			&:focus {
				color: var(--color-text);
			}
		}

		&:has(input[type='radio']:checked) {
			// border-left: 2px solid var(--color-primary);
			background-color: var(--color-surface-alt);

			label {
				color: var(--color-primary);
			}
		}

		&__input {
			opacity: 0;
		}
	}

	.option124 {
		display: flex;
		justify-content: space-between;
		// gap: $x-space-md;

		@include layout-respond('2xl') {
			// gap: $x-space-lg;
		}

		&__label {
			font-size: $x-font-size-md;
		}

		&__input {
			&--text {
				width: $x-space-xxl;

				font-size: $x-font-size-lg;

				@include layout-respond('2xl') {
					width: $x-space-xxxl;
					font-size: $x-font-size-2xl;
				}
			}

			&--expand {
				width: $x-space-md;
				font-size: $x-font-size-lg;

				@include layout-respond('2xl') {
					width: $x-space-lg;
					// font-size: $x-font-size-xl;
				}
			}
		}
	}

	.ranged-list {
		@include layout-flex-column();
		gap: $x-space-xs;
		list-style: none;

		&__element {
			position: relative;

			&__button {
				position: absolute;
				color: var(--color-text);
				text-align: center;
				vertical-align: middle;

				border-style: none;
				right: calc($x-space-md * 1.35);
				@include fonts-stack('Satoshi-Regular', sans);
				@include fonts-alternate-style();
				border-style: none;
				right: calc($x-space-md * 1.35);

				width: $x-space-md;
				height: $x-space-lg;
				overflow: hidden;

				color: var(--color-text-muted);
				font-size: $x-font-size-xs;

				background: unset;
				cursor: pointer;

				&.active {
					background: var(--color-bg);

					&.first,
					&.last {
						border-radius: 50%;
						width: $x-space-lg;
						height: $x-space-lg;
						color: var(--color-text);
						@include fonts-stack('Satoshi-Black', sans);
						@include fonts-alternate-style();

						right: $x-space-md;
						// font-size: $x-font-size-lg;
						background-color: var(--color-bg);
					}
				}
			}
		}
	}
</style>
