<script lang="ts">
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
	id="content-creation"
>
	<div id="nav">
		<NavBar />
	</div>

	<div id="projects">
		<!-- <h1>65% of people are visual learners.</h1> -->
		<h1>Upcoming Content soon!</h1>

		<!-- <iframe -->
		<!-- 	title="the cooked motorfest" -->
		<!-- 	width="420" -->
		<!-- 	height="315" -->
		<!-- 	src="https://www.youtube-nocookie.com/embed/RzjhZbc7UP0" -->
		<!-- > -->
		<!-- </iframe> -->
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	iframe {
		aspect-ratio: 16 / 9;
		width: 40rem;
		height: auto;
	}

	$custom-light-theme: (
		bg: $x-gray-50,
		surface: #ff9499
	);

	$custom-dark-theme: (
		bg: #0f0f0f,
		surface: #511723,
		surface-alt: #212121,
		text: #eaeaea
	);

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	@include theming-impose-schemes-basic();
	@include theming-impose-scroll-scheme();

	#content-creation {
		background: var(--color-bg);
		@include layout-flex-column();
		@include layout-viewport-full-height-lockdown();

		min-height: 200vh;
	}

	#nav {
		view-transition-name: backdrop-nav;
		background: var(--color-surface);
		box-shadow: $x-bs-sketch-falloff;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	#projects {
		width: 100%;

		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}
</style>
