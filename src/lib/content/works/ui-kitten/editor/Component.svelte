<script lang="ts" module>
	// Component definition
	export type ComponentFlat = {
		name: string
		discriminator?: number
		sets: AxesManager
	}

	// Instance of a Component / Kit
	export type ComponentView = {
		source_index: number
		params: AxesSet
		// Alias of Component
		name?: string
		rootPosition?: { x: number; y: number }
		selected?: 'primary' | 'secondary'
		children?: ComponentView[]
	}

	export type { ComponentFlat, ComponentView }
</script>

<script lang="ts">
	import {
		resolve,
		type AxesManager,
		type AxesSet
	} from '$lib/content/works/ui-kitten/cascadeAxesMap'

	type KitProps = {
		offsetX: number
		offsetY: number
		newPositionX: number
		newPositionY: number
		name: string
		sets: AxesManager
		params: AxesSet
		selected?: 'primary' | 'secondary'
	}

	const { newPositionX, newPositionY, name, sets, selected }: KitProps = $props()

	import { add } from '$lib/content/works/ui-kitten/cascadeAxesMap'

	/*
	add(
		sets,
		{ theme: 'dark' },
		{
			backgroundColor: '#222',
			color: '#eee'
		}
	)

	add(
		sets,
		{},
		{
			backgroundColor: '#eee',
			color: '#222',
			borderRadius: '0rem',
			padding: '1.15rem 3rem'
		}
	)

	add(
		sets,
		{ theme: 'light', hierarchy: 'primary' },
		{
			backgroundColor: 'green',
			color: '#eee'
		}
	)

	add(
		sets,
		{ theme: 'light', hierarchy: 'secondary' },
		{
			backgroundColor: 'rgba(255,255,255, 0.85)',
			border: '2px solid green',
			color: '#111'
		}
	)

	add(
		sets,
		{ theme: 'light', hierarchy: 'primary', negative: 'true' },
		{
			backgroundColor: 'rgb(185, 10, 20)'
		}
	)

	add(
		sets,
		{ theme: 'light', hierarchy: 'secondary', negative: 'true' },
		{
			backgroundColor: 'rgba(255,255,255, 0.85)',
			border: '2px solid red',
			color: '#111'
		}
	)

	add(
		sets,
		{ rounded: 'false' },
		{
			borderRadius: '0rem'
		}
	)

	add(
		sets,
		{ rounded: 'true' },
		{
			borderRadius: '0.45rem'
		}
	)
  */

	let offsetX = $state()
	let offsetY = $state()

	let params: AxesSet = $state({})

	const { finalStyle, trace } = $derived.by(() => {
		return resolve(sets, params)
	})

	const cssVariables: string = $derived.by(() => {
		const entries = [
			['--border', finalStyle.border],
			['--background-color', finalStyle.backgroundColor],
			['--border-radius', finalStyle.borderRadius],
			['--color', finalStyle.color],
			['--padding', finalStyle.padding],
			['--margin', finalStyle.margin]
		]

		return entries
			.filter(([, value]) => value !== undefined)
			.map(([key, value]) => `${key}: ${value};`)
			.join('')
	})
</script>

<div
	class="canvas__component"
	class:canvas__component--selected={selected !== undefined}
	style="--calculated-width: '{offsetX}px ↔'; --calculated-height: '{offsetY}px ↕'; --x: {newPositionX}px; --y: {newPositionY}px;"
>
	<div class="canvas__component__meta name">
		{name}
	</div>
	<button class="canvas__component__meta width" aria-label="Always display width"
		>{offsetX}px ↔</button
	>
	<button class="canvas__component__meta height" aria-label="Always display height"
		>{offsetY}px ↕</button
	>
	<button class="canvas__component__drag top left" aria-label="Resize top and left"></button>
	<button class="canvas__component__drag top right" aria-label="Resize top and right"></button>
	<button class="canvas__component__drag bottom left" aria-label="Resize bottom and left"></button>
	<button class="canvas__component__drag bottom right" aria-label="Resize bottom and right"
	></button>
	<button class="canvas__component__move" aria-label="Resize bottom and right"
		><i class="fa-solid fa-grip-lines"></i></button
	>

	<div
		style={cssVariables}
		bind:offsetWidth={offsetX}
		bind:offsetHeight={offsetY}
		class="canvas__component__raw"
	>
		<!-- <div -->
		<!-- 	contenteditable="true" -->
		<!-- 	style="--text-length: {textLength};" -->
		<!-- 	class="canvas__component__raw__text" -->
		<!-- 	bind:innerHTML={textContent} -->
		<!-- ></div> -->
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	.canvas__component {
		position: absolute;
		translate: calc(var(--x) + var(--offsetX)) calc(var(--y) + var(--offsetY));
		transition: translate 150ms ease-out;
		padding: calc($x-space-sm / var(--scale-factor));
		cursor: pointer;

		&__meta {
			font-size: calc($x-font-size-sm / var(--scale-factor));
			letter-spacing: 1px;
			@include fonts-stack('Satoshi-Bold', sans);
			color: var(--color-text);
			mix-blend-mode: exclusion;
			border: unset;
			padding: 2px;
			border-radius: 2px;
			cursor: pointer;
			position: absolute;
			background: inherit;
			display: none;

			&.name {
				content: var(--name);
				bottom: calc(115%);
				left: 0;
				color: var(--color-primary);

				@include fonts-stack('Satoshi-Bold', sans);
				font-size: calc($x-font-size-md / var(--scale-factor));
			}

			&.width {
				top: 120%;
				left: calc(40% * var(--scale-factor) * 0.8);
			}

			&.height {
				top: calc(40% * var(--scale-factor) * 0.8);
				left: calc(-65% * 1 / var(--scale-factor));
			}
		}

		&__drag {
			display: none;
		}

		&:hover {
			box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-text-muted);

			.canvas__component__drag {
				box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-text-muted);
				background: var(--color-bg);
			}

			.canvas__component__meta,
			.canvas__component__drag,
			&::after,
			&::before {
				display: block;
			}
		}

		&--selected {
			box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-primary);

			.canvas__component__drag {
				box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-primary);
				background: var(--color-primary);
			}

			.canvas__component__move {
				display: grid;
			}
			.canvas__component__meta,
			.canvas__component__drag,
			&::after,
			&::before {
				display: block;
			}

			// weird override but aight
			&:hover {
				box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-primary);

				.canvas__component__drag {
					box-shadow: 0 0 0 calc(2px / var(--scale-factor)) var(--color-primary);
					background: var(--color-primary-hover);

					&:hover {
						background: white;
					}
				}
			}
		}

		&__move {
			i {
				font-size: calc($x-font-size-lg / var(--scale-factor));
			}

			padding: $x-space-xs;
			width: max-content;
			height: max-content;
			left: 88%;
			bottom: 110%;
			cursor: grab;
			background: unset;
			outline: unset;
			color: var(--color-primary);

			display: none;
			position: absolute;
			border: unset;

			place-items: center;

			&:active {
				cursor: grabbing;
			}
		}

		&__drag {
			position: absolute;
			border: unset;
			border-radius: calc($x-space-xs / var(--scale-factor) / 9);

			--size: #{$x-space-md};
			width: calc(var(--size) / var(--scale-factor) / 2);
			height: calc(var(--size) / var(--scale-factor) / 2);

			--offset: calc(var(--size) / -8);

			/* Top-left corner centering logic */
			&.top.left {
				top: calc(-0.6 * var(--size) / var(--scale-factor) / 2);
				left: calc(-0.6 * var(--size) / var(--scale-factor) / 2);

				cursor: nw-resize;
			}

			&.top.right {
				top: calc(-0.6 * var(--size) / var(--scale-factor) / 2);
				right: calc(-0.6 * var(--size) / var(--scale-factor) / 2);

				cursor: ne-resize;
			}

			&.bottom.left {
				bottom: calc(-0.6 * var(--size) / var(--scale-factor) / 2);
				left: calc(-0.6 * var(--size) / var(--scale-factor) / 2);

				cursor: sw-resize;
			}

			&.bottom.right {
				bottom: calc(-0.6 * var(--size) / var(--scale-factor) / 2);
				right: calc(-0.6 * var(--size) / var(--scale-factor) / 2);

				cursor: se-resize;
			}
		}

		&__raw {
			background-color: var(--background-color, green);
			border: var(--border);
			border-radius: var(--border-radius);
			color: var(--color);
			padding: var(--padding);

			&__text {
				// display: inline;
				//all: unset;
				border: unset;
				outline: unset;

				@include fonts-stack('Satoshi-Regular', sans);
				@include fonts-alternate-style();
				cursor: text;

				font-weight: 800;

				&:focus {
					backdrop-filter: brightness(0.8);
				}
			}
		}
	}
</style>
