<script lang="ts">
	import type { ComponentView } from '../Component.svelte'
	import Panel from '../Panel.svelte'
	import { type Snippet } from 'svelte'

	type StylesPanel = {
		selectedKit?: ComponentView
		kitViews: ComponentView[]
	}

	const { selectedKit, kitViews = $bindable() }: StylesPanel = $props()

	const stylesContextMenu = [
		{
			name: 'custom rule',
			description: 'Add custom style rule',
			displayText: 'Custom Style Rule',
			icon: 'fa-solid fa-plus'
		}
	]
</script>

<Panel
	contextMenuContent={stylesContextMenu}
	name="Styles"
	tooltip="Applied styles on the current Axes set"
>
	{#snippet content()}
		<div style="display:contents" data-selected-kit={selectedKit}>
			{@render layout()}
			{@render boxModel()}
			<!-- {@render typography()} -->
		</div>
	{/snippet}
</Panel>

{#snippet layout()}
	{#snippet content()}
		{@render margin()}
		{@render padding()}
		{@render dimensions()}
		<br />
		{@render flow()}
	{/snippet}

	{@render styleSection('Layout', content)}
{/snippet}

{#snippet typography()}
	{#snippet content()}
		{@render fontFamily()}
		{@render fontSize()}
		{@render fontWeight()}
		{@render fill()}
		<br />
		{@render textAlignment()}
	{/snippet}

	{@render styleSection('Typography', content)}
{/snippet}

{#snippet boxModel()}
	{#snippet content()}
		{@render borderRadius()}
		{@render border()}
		<!-- {@render outline()} -->
		{@render fill()}
	{/snippet}

	{@render styleSection('Box Model', content)}
{/snippet}

{#snippet styleSection(name: string, content: Snippet)}
	<details class="style-section">
		<summary class="style-section__heading">
			<h3>
				{name}
			</h3>
		</summary>
		<div class="style-section__content">
			{@render content()}
		</div>
	</details>
{/snippet}

{#snippet borderRadius()}
	{@render option124('Border Radius', undefined, {
		scalar1: 'Top Left',
		scalar2: 'Top Right',
		scalar3: 'Bottom Left',
		scalar4: 'Bottom Right'
	})}
{/snippet}

{#snippet border()}
	{@render option124('Border', undefined, undefined)}
{/snippet}

{#snippet outline()}
	{@render option124('Outline', undefined, undefined)}
{/snippet}

{#snippet fontFamily()}
	{@render option124('Family', undefined, undefined)}
{/snippet}

{#snippet fontSize()}
	{@render option124('Size', undefined, undefined)}
{/snippet}

{#snippet fontWeight()}
	{@render option124('Weight', undefined, undefined)}
{/snippet}

{#snippet textAlignment()}
	{@render option124('Text Alignment', undefined, undefined)}
{/snippet}

{#snippet fill()}
	{@render option124('Fill', undefined, undefined)}
{/snippet}

{#snippet flow()}
	{@render option124('Content Flow', undefined, undefined)}
{/snippet}

{#snippet margin()}
	{@render option124(
		'Margin',
		{ scalar1: 'Inline', scalar2: 'Block' },
		{ scalar1: 'Top', scalar2: 'Right', scalar3: 'Bottom', scalar4: 'Left' }
	)}
{/snippet}

{#snippet dimensions()}
	{@render option124('Dimensions', { scalar1: 'Width', scalar2: 'Height' }, undefined)}
{/snippet}

{#snippet padding()}
	{@render option124(
		'Padding',
		{ scalar1: 'Inline', scalar2: 'Block' },
		{ scalar1: 'Top', scalar2: 'Right', scalar3: 'Bottom', scalar4: 'Left' }
	)}
{/snippet}

<!-- For style fields that may require 1 | 2 | 4 values -->
{#snippet option124(
	name: string,
	options2?: { scalar1: string; scalar2: string },
	options4?: { scalar1: string; scalar2: string; scalar3: string; scalar4: string }
)}
	<label class="option124">
		<span class="option124__label">
			<button
				class="option124__input--track"
				aria-label="Adds the style into the axes set"
				title="Track {name} on Axes set"
				type="button"
				onclick={() => {
					console.log('Tried to add style to set')
				}}
			>
				<i class="fa-solid fa-diamond"></i>
			</button>
			{name}</span
		>

		<span class="option124__input">
			<input
				title="Attach Variable"
				class="option124__input--text"
				type="button"
				value="+"
				onclick={() => {
					console.log('Tried token to style')
				}}
			/>
			<input class="option124__input--expand" type="button" value="›" />
		</span>
	</label>
{/snippet}

<style lang="scss">
	@use '_index' as *;

	input[type='text'] {
		border-radius: $x-space-lg;
		text-align: center;
	}

	.style-section {
		user-select: none;

		hr {
			border: unset;
			border: 1px solid var(--color-text-muted);
			margin-bottom: $x-space-xs;
		}

		&[open] {
			::after {
				rotate: 180deg;
				translate: 0 $x-space-xs;
			}
		}

		&__heading {
			list-style: none;

			cursor: pointer;
			padding-block: $x-space-xs;
			position: relative;
			display: flex;

			font-size: $x-font-size-xs;
			text-transform: uppercase;
			@include fonts-stack('Satoshi-Bold', sans-serif);
			letter-spacing: 1px;
			color: var(--color-text);

			&::after {
				content: '⌄';
				right: $x-space-md;
				position: absolute;
				transition: rotate 200ms ease-out;
			}
		}

		&__content {
			padding-left: $x-space-xs;
			margin-bottom: $x-space-sm;

			hr {
				margin-top: $x-space-md;
				margin-inline: $x-space-sm;
				border: 1px solid var(--color-bg);
			}
		}
	}

	.option124 {
		display: flex;
		justify-content: space-between;
		padding-left: $x-space-xs;
		align-items: center;

		&__label {
			user-select: none;
			letter-spacing: 1px;
			font-weight: 600;
			padding-block: calc($x-space-xs / 2);
			display: flex;
			gap: $x-space-sm;

			@include layout-respond-max('md') {
				font-size: $x-font-size-md;
			}

			&::after {
				aspect-ratio: 1;
				background: var(--color-bg);
				width: $x-space-xs;
			}
		}

		&__input {
			> * {
				color: var(--color-primary);
				color: var(--color-text);
			}

			&--track {
				color: black;
				font-size: $x-font-size-lg;
				color: var(--color-surface);
				-webkit-text-stroke-width: 2px;
				-webkit-text-stroke-color: var(--color-text);

				&:focus {
					color: var(--color-text);
				}
			}

			&--text {
				width: $x-space-xxl;
				font-size: $x-font-size-md;
				@include fonts-stack('Satoshi-Bold', sans-serif);
				border: unset;
				border: var(--color-add-var-border);
				background: var(--color-add-var-bg);

				padding: 2px;
				cursor: pointer;
				border-radius: 1px;
				color: var(--color-add-var-text);

				&:hover {
					background: var(--color-surface-alt);
					color: var(--color-text);
				}

				@include layout-respond('2xl') {
					width: $x-space-xxl;
					font-size: $x-font-size-md;
				}
			}

			&--track,
			&--expand {
				cursor: pointer;
				border: unset;
				background: unset;
			}

			&--track {
			}

			&--expand {
				width: $x-space-md;
				font-size: $x-font-size-md;

				@include layout-respond('2xl') {
					width: $x-space-lg;
					// font-size: $x-font-size-xl;
				}
			}
		}
	}
</style>
