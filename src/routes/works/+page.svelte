<script lang="ts">
	type SiteClass =
		| 'product-concept' // a clear idea that could be real tomorrow
		| 'ui-mockup' // clean, clickable design preview
		| 'utility-app' // solves a specific, useful problem
		| 'case-study' // shows thought process start to finish
		| 'success-story' // demonstrably increased conversion rates for business

	type ResponsiveTag =
		| 'mobile-ready' // works great on small screens
		| 'desktop-ready' // looks sharp on big screens
		| 'responsive-layout' // adapts smoothly between sizes
		| 'accessible' // thoughtful about different user needs

	type SiteTag = ResponsiveTag[]

	type Site = {
		class: SiteClass
		tags: SiteTag

		title: string
		path: string
	}

	const links: Site[] = [
		{
			title: 'Lemin Quench',
			path: 'lemin-quench',
			class: 'product-concept',
			tags: []
		},
		{
			title: 'UI Kitten',
			path: 'ui-kitten',
			class: 'utility-app',
			tags: []
		},
		{
			title: 'Periodic Memory',
			path: 'periodic-memory',
			class: 'utility-app',
			tags: []
		}
	]

	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import NavBar from '$lib/NavBar.svelte'
</script>

<div
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
	class="base scroll-scheme"
	id="works"
>
	<div id="nav" class="glass-card">
		<NavBar />
	</div>

	<div id="projects">
		<h1>
			Recruiters spend <span class="quiet-text"> only about </span>
			<span class="super-text">6</span> <span class="quiet-text"> seconds on </span> a portfolio
		</h1>

		<div class="">
			{#each links as link}
				<a href={'/works/' + link.path}>
					<h2>{link.title}</h2>
				</a>
			{/each}
		</div>
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

	#works {
		background: var(--color-bg);
		@include layout-flex-column();
		@include layout-viewport-full-height-lockdown();

		min-height: 200vh;

		@include fonts-stack('Satoshi', 'sans-serif');
		@include fonts-alternate-style();
	}

	#nav {
		view-transition-name: backdrop-nav;
		box-shadow: $x-bs-sketch-falloff;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	#projects {
		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}

	h1 {
		margin-top: $x-space-lg;
		margin-bottom: $x-space-lg;
		padding-inline: $x-space-sm;

		@include fonts-stack('Satoshi-Bold', sans-serif);
		@include fonts-alternate-style();

		.quiet-text {
			color: var(--color-text-muted);

			@include fonts-stack('Satoshi-Light', sans-serif);
			@include fonts-alternate-style();
		}

		@include layout-respond-max('md') {
			font-size: $x-font-size-2xl;
			line-height: 140%;

			.super-text {
				font-size: $x-font-size-4xl;
			}
		}

		@include layout-respond('md') {
			font-size: $x-font-size-4xl;
			line-height: 125%;

			.super-text {
				font-size: $x-font-size-6xl;
			}
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-6xl;
			line-height: 115%;

			.super-text {
				font-size: $x-font-size-8xl;
			}
		}

		@include layout-respond('xl') {
			line-height: 125%;
			max-width: 20ch;
		}

		.super-text {
			vertical-align: middle;
			@include fonts-stack('Satoshi-Light', sans-serif);
			@include fonts-alternate-style();
		}
	}

	h2 {
		font-size: $x-font-size-4xl;
	}
</style>
