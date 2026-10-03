<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import NavBar from '$lib/NavBar.svelte'
	import Seo from '$lib/components/Seo.svelte'
	import Footer from '$lib/content/Footer.svelte'
	import Cite from '$lib/components/Cite.svelte'
	import References from '$lib/components/References.svelte'
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
			<span class="quiet-text">Everyone</span> quotes <span class="super-text">95%</span>
			<span class="quiet-text">versus</span> <span class="super-text">10%</span>
			<span class="quiet-text">for</span> <span class="quiet-text">video</span>
			<span class="quiet-text">over</span> <span class="quiet-text">text.</span>
			<span class="quiet-text">I</span> <span class="quiet-text">couldn’t</span>
			<span class="super-text">find</span> <span class="quiet-text">the</span>
			<span class="quiet-text">source.</span>
		</h1>

		<p>
			The claim you have probably seen is that viewers retain 95% of a message from video but only
			10% from text. It traces to Insivia<Cite n={0} />, who later published their own account of
			it: an internal survey of roughly 200 business buyers, run in the late 2000s, reported as
			“directional” and explicitly “not a peer-reviewed neuroscience study”. It is also routinely
			pinned on Edgar Dale’s Cone of Experience<Cite n={1} />, a 1946 teaching aid whose author
			assigned it no percentages whatsoever. The numbers were added later, by others, and never
			traced back to a controlled study.
		</p>

		<p>
			What survives scrutiny is narrower and more interesting. Memory for pictorial material does
			tend to beat memory for verbal material — the picture superiority effect, first demonstrated
			experimentally in 1976<Cite n={2} />. That is a real finding about dual coding. It is not a
			9.5× advantage, it does not apply uniformly across topics, and it says nothing about video
			specifically. Poorly made video loses to clear text.
		</p>

		<p>
			So this page is where the receipts live. Anything here that makes a measurable claim gets a
			numbered source you can open, or it gets rewritten until it is something I can actually stand
			behind.
		</p>

		<References only={[0, 1, 2]} />

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

		@include fonts-stack('Satoshi-Bold', sans);
		@include fonts-alternate-style();

		.quiet-text {
			color: var(--color-text-muted);

			@include fonts-stack('Satoshi-Light', sans);
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
			@include fonts-stack('Satoshi-Light', sans);
			@include fonts-alternate-style();
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
