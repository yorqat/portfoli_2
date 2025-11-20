<script lang="ts">
	import { type ComponentView } from '../Component.svelte'

	type StyleFieldValue124 =
		| string
		| {
				scalar1: string
				scalar2: string
		  }
		| {
				scalar1: string
				scalar2: string
				scalar3: string
				scalar4: string
		  }
		| {
				[name: string]: string
		  }

	type StyleFieldProps = {
		name: string
		selectedKit?: ComponentView
		value?: StyleFieldValue124
	}

	const { name, selectedKit, value = $bindable() }: StyleFieldProps = $props()
	import { contextMenu } from '../contextMenu'

	const menu = [
		{
			name: 'custom axis',
			description: 'Add custom axis',
			displayText: 'Custom Axis',
			icon: 'fa-solid fa-plus'
		}
	]
</script>

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
		<button
			title="Attach Variable"
			class="option124__input--text"
			onclick={() => {
				console.log('Tried token to style')
			}}
			use:contextMenu={menu}
			disabled={selectedKit}
		>
			value?.toString() ?? '+'
		</button>
		<input disabled={selectedKit} class="option124__input--expand" type="button" value="›" />
	</span>
</label>

<style lang="scss">
	@use '_index' as *;

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
				width: $x-space-md;
				font-size: $x-font-size-lg;

				&:focus {
					color: var(--color-accent);
				}
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
