<script lang="ts">
	import type { ComponentFlat, ComponentView } from '../Component.svelte'
	import Panel from '../Panel.svelte'
	import { type Snippet } from 'svelte'
	import AxisTracker from './AxisTracker.svelte'

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
				if (axis === null) {
					return 'hr'
				}
				return {
					name: axis.name,
					description: axis.description,
					displayText: axis.name,
					icon: `fa-solid ${axis.category === 'Static' ? 'fa-cubes' : 'fa-dice-d6'}`,
					onClick: () => {
						if (selectedKit) {
							addAxis(selectedKit, axis)
						}
					}
				}
			})
		]
	})

	function addAxis(target: ComponentView, axis: AxisDefinition) {
		// select the target
		const source = kits[target.source_index]

		if (source) {
			source.sets.axisRank.push(axis)
			add(source.sets, target.params, {})
		}
	}

	import { type TrackerExclusiveVariant, type AxisDefinition, builtinAxes } from '../../axesBuiltIn'
	import type { ContextMenuContent } from '../contextMenuStore'
	import { add } from '../../cascadeAxesMap'
</script>

{#snippet axisOption(axis_: AxisDefinition)}
	{#snippet options()}
		{@render trackerExclusive(axis_.name, axis_.variants)}
	{/snippet}

	{@render axis(axis_.name, options, axis_.description)}
{/snippet}

<!-- For axes that require exclusive values -->
{#snippet trackerExclusive(id: string, elements: TrackerExclusiveVariant[])}
	<ul class="tracker">
		{#each elements as element, i}
			<li class="tracker__element">
				<label title={element.tooltip}>
					<span class="tracker__element__label">{element.name}</span>
					<input class="tracker__element__input" type="radio" name={id} checked={i === 0} />
				</label>
				<button class="tracker__element__track" aria-label="Includes the axes into the set">
					<i class="fa-solid fa-diamond"></i>
				</button>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet axis(heading: string, content: Snippet, tooltip?: string)}
	<details class="axis" title={tooltip} open>
		<summary class="axis__heading">
			<h3>{heading}</h3>
			<i class="fa-solid fa-angle-down axis__heading__collapse-icon"></i>
		</summary>
		<div class="axis__content">
			{@render content()}
		</div>
	</details>
{/snippet}

<Panel contextMenuContent={axesAddContextMenu} name="Axes" tooltip="Adjust the axes set">
	{#snippet content()}
<AxisTracker axesSet={{theme: 'dark'}} />
<AxisTracker axesSet={{density: 'fluffy'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'high'}} />
<AxisTracker axesSet={{density: 'high', theme: 'dark'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'high', mode: 'compact'}} />
<AxisTracker axesSet={{mode: 'compact', theme: 'dark', density: 'high'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'high', mode: 'compact', fluffy: 'yes'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'high', mode: 'compact', fluffy: 'yes', accent: 'blue'}} />
<AxisTracker axesSet={{}} />
<AxisTracker axesSet={{theme: 'dark', density: 'high', mode: 'compact', fluffy: 'yes', accent: 'blue', region: 'eu', intent: 'primary', level: '3'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'super-ultra-mega-high'}} />
<AxisTracker axesSet={{theme: 'dark', level: '42'}} />
<AxisTracker axesSet={{fluffy: 'true', compact: 'false'}} />
<AxisTracker axesSet={{variant: 'v2', mode: 'beta'}} />
<AxisTracker axesSet={{theme: 'dark', density: 'low', spacing: 'tight', radius: 'rounded', motion: 'snappy'}} />
<AxisTracker axesSet={{radius: 'rounded', theme: 'dark', accent: 'blue', intent: 'primary', mode: 'compact', region: 'eu', fluffy: 'yes', density: 'high'}} />
		<!-- {JSON.stringify(selectedKit?.params, null, 2)} -->
		<div class="layers">
			<label class="layer layer--base" aria-label="&lcub; &rcub;">
				<i class="layer--new__icon fa-solid fa-diamond"></i>
				<input type="radio" name="same" disabled />
			</label>

			<label class="layer layer--new" aria-label="&lcub; &rcub;">
				<i class="layer--new__icon fa-solid fa-diamond"></i>
				<!-- <i class="layer--new__icon fa-solid fa-plus"></i> -->
				<input type="radio" name="same" checked />
			</label>
		</div>

		{#if selectedKit}
			{#if kits[selectedKit.source_index]}
				{#if kits[selectedKit.source_index].sets.axisRank.length === 0}
					<p>
						<i class="fa-solid fa-up-long"></i> Add Axis to
						<strong>{selectedKit.name ?? kits[selectedKit.source_index].name}</strong>
					</p>
				{/if}

				{#each kits[selectedKit.source_index].sets.axisRank as axis}
					{@render axisOption(axis)}
				{/each}
			{/if}
		{:else}
			<p>Select a <strong>Component</strong></p>
		{/if}
	{/snippet}
</Panel>

<style lang="scss">
	@use '_index' as *;

	input[type='text'] {
		border-radius: $x-space-lg;
		text-align: center;
	}

	.layers {
		display: flex;
		gap: $x-space-xs;

		.layer {
			padding: calc($x-space-xs / 2) $x-space-xs;

			&--base {
				border: 2px dashed var(--color-panel-border);
				background: var(--color-bg);
			}

			&--new {
				border: 2px solid var(--color-panel-border);
				translate: 0 calc($x-space-xs * -0.25);
				box-shadow: 0rem 0.35rem var(--color-bg);
				color: var(--color-warning);
				text-shadow:
					3px 0px black,
					-3px 0px black,
					0 3px black,
					0 -3px black;
			}

			border-radius: $x-space-xs;
			background: var(--color-surface);
			color: var(--color-text);

			> input[type='radio'] {
				position: absolute;
				opacity: 0;
			}

			&:hover {
				background: var(--color-surface-alt);
			}

			&:has(input[type='radio']:checked) {
				box-shadow: 0 0.15rem var(--color-surface-alt);
				translate: 0 calc($x-space-xs * 0.25);
				border: 2px solid var(--color-primary);
				background: var(--color-surface-alt);
			}

			div &__icon {
				mask-image: radial-gradient(
					circle,
					rgba(194, 134, 70, 1) 9%,
					rgba(188, 194, 70, 1) 25%,
					rgba(124, 194, 70, 1) 16%,
					rgba(70, 194, 171, 1) 33%,
					rgba(88, 138, 204, 1) 58%,
					rgba(158, 88, 204, 1) 3%,
					rgba(187, 88, 204, 1) 51%,
					rgba(204, 88, 173, 1) 84%
				);
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

			&__collapse-icon {
				transition: rotate 200ms ease-out;
				rotate: -360deg;
			}
		}

		&__content {
			padding-inline: $x-space-xs;
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
		border-left: 2px solid var(--color-surface);
		padding-left: $x-space-xs;
		flex-direction: row-reverse;
		align-items: center;

		gap: $x-space-xs;

		label {
			padding-block: calc($x-space-xs / 2);
			cursor: pointer;
			display: flex;
			flex-grow: 1;
			padding-inline: $x-space-xs;
			@include fonts-stack('Satoshi-Regular', sans);
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
			font-size: $x-font-size-lg;
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
			border-left: 2px solid var(--color-primary);
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
					letter-spacing: 1px;

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
