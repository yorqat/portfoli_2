<script lang="ts">
	import ThreeState from '$lib/ThreeState.svelte'
	import { type Theme, theme, updateTheme } from '$lib/theming'
	import { type ReducedMotion, reducedMotion, updateReducedMotion } from '$lib/reduced-motion'

	import { type AriaChecked } from '$lib/types/aria'
	import { onUnfocus } from '$lib/actions'

	const themeHandler =
		(theme: Theme = 'auto') =>
		() => {
			console.log(`set theme to ${theme}`)
			updateTheme(theme)
		}

	function getAriaChecked(theme: string | null): AriaChecked {
		switch (theme) {
			case null:
				return 'mixed'
			case 'dark':
				return 'true'
			case 'light':
				return 'false'
			case 'mixed':
			default:
				return 'mixed'
		}
	}

	const themeChecked = $derived.by(() => getAriaChecked($theme))

	const themeHandlers = {
		onTrue: themeHandler('dark'),
		onFalse: themeHandler('light'),
		onMixed: themeHandler()
	}

	// reduced motion
	const reducedMotionHandler =
		(reducedMotion: ReducedMotion = 'auto') =>
		() => {
			console.log(`set reduced-motion to ${reducedMotion}`)
			updateReducedMotion(reducedMotion)
		}

	function getReducedMotionChecked(reducedMotion: string | null): AriaChecked {
		switch (reducedMotion) {
			case null:
				return 'mixed'
			case 'reduce':
				return 'true'
			case 'no-reduce':
				return 'false'
			case 'auto':
			default:
				return 'mixed'
		}
	}

	const reducedMotionChecked = $derived.by(() => getReducedMotionChecked($reducedMotion))

	const reducedMotionHandlers = {
		onTrue: reducedMotionHandler('reduce'),
		onFalse: reducedMotionHandler('no-reduce'),
		onMixed: reducedMotionHandler()
	}

	let toggle = $state(false)
</script>

<div
	class="a11y no-default"
	use:onUnfocus={() => {
		console.log('I got unfocused. bye')
		toggle = false
	}}
>
	<label class="a11y-toggle">
		Preferences
		<input type="checkbox" bind:checked={toggle} />
	</label>

	<div class="a11y-menu">
		<!-- Don't  forget label and input binding -->
		<h3 class="no-default">Preferences</h3>

		<div class="preferences">
			<label class="a11y-menu__item">
				{'Dark Mode'}
				<ThreeState {...themeHandlers} ariaChecked={themeChecked} />
			</label>

			<label class="a11y-menu__item">
				{'Reduced Motion'}
				<ThreeState {...reducedMotionHandlers} ariaChecked={reducedMotionChecked} />
			</label>
		</div>

		<div class="legal">
			<a href="/privacy">Privacy Policy</a>
			<a href="/terms">Terms of Use</a>
		</div>
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	.a11y {
		position: relative;
	}

	.a11y-menu {
		position: absolute;
		width: max-content;
		z-index: 999;

		@include layout-flex-column();
		gap: $x-font-size-xl;

		font-family: 'Inter', sans-serif;

		background: var(--color-surface);
		border-radius: 0.5rem;
		padding: $x-space-md $x-space-md;

		top: $x-space-xl;
		box-shadow: $x-bs-sketch-falloff;
		font-size: $x-font-size-md;

		display: none;

		.preferences {
			@include layout-flex-column();
			gap: $x-space-xs;
		}

		.legal {
			font-size: $x-font-size-xs;
			display: flex;
			text-align: center;
			color: var(--color-text-muted);

			> * {
				flex-grow: 1;
			}
		}
	}

	.a11y-menu__item {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		align-items: center;
	}

	.a11y-toggle {
		@include theming-colored-svg-mask('/display_settings.svg', var(--color-text), $x-font-size-2xl);

		@include layout-grid-center();

		input {
			opacity: 0;
		}
	}

	.a11y:has(.a11y-toggle input:checked) .a11y-menu {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
