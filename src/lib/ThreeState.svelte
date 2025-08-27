<script lang="ts">
	import { type AriaChecked } from '$lib/types/aria'

	type ThreeStateProps = {
		onTrue?: () => void
		onFalse?: () => void
		onMixed?: () => void
		decideMode?: (ariaChecked: AriaChecked) => AriaChecked
		ariaChecked: AriaChecked
	}

	const defaultDecideMode = (ariaChecked: AriaChecked): AriaChecked => {
		if (ariaChecked === 'true') {
			return 'false'
		} else if (ariaChecked === 'false') {
			return 'mixed'
		} else {
			return 'true'
		}
	}

	const {
		onTrue,
		onFalse,
		onMixed,
		decideMode = defaultDecideMode,
		ariaChecked
	}: ThreeStateProps = $props()

	const onclick = () => {
		const newChecked = decideMode(ariaChecked)

		if (newChecked === 'true') {
			onFalse?.()
		} else if (newChecked === 'false') {
			onMixed?.()
		} else {
			onTrue?.()
		}
	}

	let dataNoJs = $state(true)

	$effect(() => {
		dataNoJs = false
	})

	const disabledJavascriptNotice = 'Your Javascript may be disabled. Enable JS for functionality'
</script>

<button
	tabindex="0"
	class="three-state"
	role="switch"
	aria-label="label"
	aria-disabled="false"
	aria-checked={ariaChecked}
	data-no-js={dataNoJs}
	title={dataNoJs ? disabledJavascriptNotice : undefined}
	{onclick}
>
	<div class="toggle">
		<div class="toggle__indicator"></div>
	</div>
</button>

<style lang="scss">
	@use '_variables' as v;
	@use '_index' as *;

	$indicator-dimensions: v.$font-size-xl;

	.three-state {
		background: var(--color-bg);
		border-radius: 1.2rem;
		height: max-content;
		width: max-content;
		overflow: clip;

		border: 2px solid var(--color-text-muted);

		&[data-no-js='false'] {
			.toggle__indicator {
				&::after {
					color: var(--color-surface);
				}
			}
		}

		&[aria-checked='true'] {
			border-color: var(--color-text);

			.toggle__indicator {
				translate: calc(200% - 10%) 0;
				&::after {
					content: '';
					opacity: 0;
				}
			}
		}

		&[aria-checked='false'] .toggle__indicator {
			translate: 25% 0;
			background: var(--color-text-muted);
			width: calc($indicator-dimensions * 0.8);
			height: calc($indicator-dimensions * 0.8);

			&::after {
				content: '';
				opacity: 0;
			}
		}

		&[aria-checked='mixed'] .toggle__indicator {
			translate: 5% 0;
			width: calc(v.$font-size-6xl - 0.45rem);
		}
	}

	.toggle {
		width: v.$font-size-6xl;
		height: v.$font-size-2xl;
		display: flex;
		align-items: center;
		position: relative;
	}

	.toggle__indicator {
		border-radius: 1.2rem;
		background: var(--color-text);

		position: absolute;

		width: $indicator-dimensions;
		height: $indicator-dimensions;
		transform-origin: center;

		display: grid;
		place-items: center;

		@include animations-reduced-motion-aware() {
			transition:
				width 0.2s 0.1s ease,
				height 0.2s 0.1s ease,
				translate 0.2s ease;
		}

		overflow: hidden;

		&::after {
			content: 'auto';
			font-size: v.$font-size-xs;
			font-weight: v.$font-weight-bold;

			color: var(--color-danger);
			position: absolute;
			opacity: 1;
			letter-spacing: 1px;

			transition: opacity 100ms 400ms ease-in;
		}
	}
</style>
