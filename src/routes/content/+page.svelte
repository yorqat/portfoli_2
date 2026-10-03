<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import NavBar from '$lib/NavBar.svelte'
	import Seo from '$lib/components/Seo.svelte'
	import Footer from '$lib/content/Footer.svelte'
	import Cite from '$lib/components/Cite.svelte'
	import { OG } from '$lib/site'
</script>

<Seo
	title="Content"
	description="Writing on interface design, accessibility and the web — notes on building products people can actually use."
	path="/content"
	image={OG.content}
/>

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
		<h1>
			<span class="quiet-text">Viewers</span> retain <span class="super-text">95%</span>
			<span class="quiet-text">of a</span> video
			<span class="quiet-text">message</span>
			compared to <span class="super-text">10%</span>
			<span class="quiet-text">when</span> reading <span class="quiet-text">text</span><Cite
				n={0}
			/>
		</h1>

		<!-- <iframe -->
		<!-- 	title="the cooked motorfest" -->
		<!-- 	width="420" -->
		<!-- 	height="315" -->
		<!-- 	src="https://www.youtube-nocookie.com/embed/RzjhZbc7UP0" -->
		<!-- > -->
		<!-- </iframe> -->
	</div>

	<div class="page-footer">
		<Footer />
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	/* #content-creation is a height-locked flex column, so letting the wrapper take
	   the slack keeps the footer flush with the bottom instead of leaving a gap
	   beneath. The wrapper is needed because a child component's root is not scoped. */
	.page-footer {
		margin-top: auto;
	}

	h1 {
		margin-top: $x-space-lg;
		margin-bottom: $x-space-lg;
		padding-inline: $x-space-sm;
		line-height: 80%;

		@include fonts-stack('Satoshi-Light', sans);
		@include fonts-alternate-style();

		.quiet-text {
			color: var(--color-text-muted);
		}

		.super-text {
			@include fonts-stack('Satoshi-Bold', sans);
			@include fonts-alternate-style();
		}

		@include layout-respond-max('md') {
			font-size: $x-font-size-2xl;
		}

		@include layout-respond('md') {
			font-size: $x-font-size-4xl;
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-6xl;
		}

		@include layout-respond('xl') {
			max-width: 20ch;
		}
	}

	iframe {
		aspect-ratio: 16 / 9;
		width: 40rem;
		height: auto;
	}

	$custom-light-theme: (
		bg: $x-gray-50,
		surface: #26dcae
	);

	$custom-dark-theme: (
		bg: #0f0f0f,
		surface: #1b5d62,
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
