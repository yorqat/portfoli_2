<script>
	import NavBar from '$lib/NavBar.svelte'

	import { onNavigate } from '$app/navigation'
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'
	import SpinButtonNumerical from '$lib/periodic-memory/spin-button-numerical.svelte'
</script>

<div
	id="error"
	class="base scroll-scheme"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<div id="nav">
		<NavBar />
	</div>

	<div id="content">
		<h1>404</h1>
		<h2>You won’t find that project here</h2>
		<h2>When the rest are even better</h2>
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	$custom-light-theme: (
		bg: $x-gray-50
	);

	$custom-dark-theme: (
		bg: #0f0f0f,
		surface: #0b0b0b,
		surface-alt: #212121,
		text: #eaeaea
	);

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	@include theming-impose-schemes-basic();
	@include theming-impose-scroll-scheme();

	#error {
		@include layout-flex-column();
		@include layout-viewport-full-height-lockdown();

		min-height: 200vh;

		@include fonts-alternate-style();
	}

	#nav {
		background-color: var(--color-surface);
		view-transition-name: backdrop-nav;
		box-shadow: $x-bs-sketch-falloff;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	#content {
		background: var(--color-bg);
	}

	h1 {
		@include fonts-stack('Satoshi-BlackItalic', 'sans-serif');
	}

	h2 {
		@include fonts-stack('Satoshi-Light', 'sans-serif');
	}

	h1,
	h2 {
		display: grid;
		place-items: center;

		padding-inline: $x-space-sm;
	}

	h2 {
		text-align: center;
		color: var(--color-text-muted);
	}

	h1 {
		@include layout-respond-max('md') {
			font-size: $x-font-size-6xl;
		}

		@include layout-respond('md') {
			font-size: $x-font-size-8xl;
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-10xl;
		}
	}

	h2 {
		@include layout-respond-max('md') {
			font-size: $x-font-size-lg;
		}

		@include layout-respond('md') {
			font-size: $x-font-size-xl;
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-2xl;
		}
	}
</style>
