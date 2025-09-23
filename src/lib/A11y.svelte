<script lang="ts">
	import ThreeState from '$lib/ThreeState.svelte'
	import { type Theme, theme, updateTheme } from '$lib/theming'
	import { type ReducedMotion, reducedMotion, updateReducedMotion } from '$lib/reduced-motion'

	import type { AriaChecked, AriaCheckedHandlers } from '$lib/types/aria'

	import { onUnfocus } from '$lib/actions'

	const themeHandler =
		(theme: Theme = 'auto') =>
		() => {
			updateTheme(theme)
			console.log(`[A11y] Theme → ${theme}`)
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
			updateReducedMotion(reducedMotion)
			console.log(`[A11y] Reduced motion → ${reducedMotion}`)
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

	$effect(() => {
		if (!toggle) {
			console.log('[A11y] Unfocused')
		}
	})
</script>

<div class="a11y no-default" use:onUnfocus={() => (toggle = false)}>
	<details bind:open={toggle}>
		<summary class="a11y-toggle"> Accessibility Preferences </summary>

		<div class="a11y-menu">
			<!-- Don't  forget label and input binding -->
			<h3 class="no-default">Preferences</h3>

			<div class="preferences">
				{#snippet A11yMenuItem(label: string, handlers: AriaCheckedHandlers, checked: AriaChecked)}
					<label class="a11y-menu__item">
						<span class="a11y-menu__item__label">{label}</span>
						<ThreeState {...handlers} ariaChecked={checked} />
					</label>
				{/snippet}

				{@render A11yMenuItem('Dark Mode', themeHandlers, themeChecked)}
				{@render A11yMenuItem('Reduced Motion', reducedMotionHandlers, reducedMotionChecked)}
			</div>

			<div class="legal">
				<a href="/privacy">Privacy Policy</a>
				<a href="/terms">Terms of Use</a>
			</div>
		</div>
	</details>
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

		@include fonts-stack('Satoshi-Regular', sans-serif);
		@include fonts-alternate-style();

		background: var(--color-surface);
		border-radius: 0.5rem;
		padding: $x-space-md $x-space-md;

		top: $x-space-xl;
		box-shadow: $x-bs-sketch-falloff;
		font-size: $x-font-size-md;

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
		gap: $x-space-sm;
		align-items: center;
	}

	.a11y-toggle {
		@include theming-colored-svg-mask('/lightbulb.svg', var(--color-text), $x-font-size-2xl);

		@include layout-grid-center();
	}
</style>
