<script lang="ts">
	import A11y from '$lib/A11y.svelte'

	import { navLinks as loungeNav, keyboardNav } from '$lib/navLinks'

	import '@material-symbols/font-400'

	import { animateLoungeElements } from './animations'
	import { onMount } from 'svelte'
	import NavBar from '$lib/NavBar.svelte'
	import { Flip } from 'gsap/all'

	$effect(animateLoungeElements)

	let scrolledPastLoungeNav = $state(false)
	let showLoungeNav = $state(false)

	let nav = $state<Flip.FlipState>()

	onMount(() => {
		const handleScroll = () => {
			scrolledPastLoungeNav = window.scrollY > window.innerHeight * 0.75 // 80vh
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})
</script>

<svelte:head>
	<title>Smile at Yor Qat</title>
	<meta
		name="description"
		content="I make UX you can feel in your bones and back up with numbers. Hi, I’m Yor Qat."
	/>
</svelte:head>

{#snippet Heading3D(heading: string)}
	<div class="section__header--3d corsette">
		<div class="section__header section__header--3d--blue" aria-hidden="true" data-lag="0.05">
			{heading}
		</div>
		<div class="section__header section__header--3d--red" aria-hidden="true" data-lag="0.15">
			{heading}
		</div>

		<h1 class="section__header section__header--3d" data-lag="0.1" style="--content: ''">
			{heading}
		</h1>
	</div>
{/snippet}

<!-- Smooth Scroll Wrapper -->
<div id="smooth-wrapper" class="landing base">
	<div
		id="nav"
		style="visibility: {!scrolledPastLoungeNav ? 'hidden' : 'visible'};"
		inert={!scrolledPastLoungeNav || undefined}
	>
		<NavBar />
	</div>
	<div id="smooth-content" class="landing__content" use:keyboardNav>
		<!-- Hero Section -->
		<section class="section section--hero" inert={scrolledPastLoungeNav ?? undefined}>
			<div class="hero__content">
				<div class="hero__branding">
					<span class="hero__title box"
						>Y<span class="span-collapse">or</span>Q<span class="span-collapse">at</span></span
					>
					<div class="hero__subtitle">
						<span> ux dev </span>

						<A11y />
					</div>
				</div>
			</div>

			<nav class="hero__nav">
				<ul class="nav__list">
					{#each loungeNav as { path, name }}
						<li class="nav__item">
							<a href={path} class="nav__link" style={'view-transition-name: nav-link-' + name}>
								{name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</section>

		<!-- Secondary Hero -->
		<section class="section section--intro">
			{@render Heading3D('I design products that ship, scale, and serve real users')}

			<div class="morpher-container" aria-hidden="true">
				<svg
					width="400"
					height="400"
					viewBox="0 0 400 400"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						id="morpher"
						d="M21.4998 227.5C-6.1161 176.145 -20.4999 32.5002 77.0001 4.00016C156.076 -19.1143 388 77 318 219C253.258 350.334 50 280.5 21.4998 227.5Z"
						stroke="black"
					/>
				</svg>
			</div>
		</section>

		<!-- Slides -->
		<section class="section section--slide">
			{@render Heading3D('I Design with Delivery in Mind')}
			<p class="section__note">Scoped for tablet breakpoints</p>
			<p class="section__note">Componentized for reuse</p>
		</section>

		<section class="section section--slide">
			{@render Heading3D('Design That Moves Metrics')}
			<p class="section__note">Reduced form fields</p>
			<p class="section__note">Increased CTA visibility</p>
			<p class="section__note">Tracking impact with funnel data</p>
		</section>

		<section class="section section--slide">
			{@render Heading3D('Built with User Insight')}
			<p class="section__note">Userflow from Miro or Figjam</p>
			<p class="section__note">Persona Drafts</p>
			<p class="section__note">Bug report from a usability session</p>
		</section>

		<section class="section section--slide">
			{@render Heading3D('Design is a Team Sport')}
			<p class="section__note">Jira ticket with latest iteration design attached</p>
			<p class="section__note">
				Slack Handoff snippets: "Final assets uploaded", "Spec clarified here"
			</p>
			<p class="section__note">Userflow from Miro or Figjam</p>
			<p class="section__note">Timeline or roadmap alignment doc</p>
		</section>

		<!-- Call to Action -->
		<section class="section section--cta">
			{@render Heading3D('Curious of what I bring to the table?')}
			<button class="cta__button corsette">Review my work together?</button>
		</section>
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	#nav {
		view-transition-name: backdrop-nav;
		background: var(--color-surface);
		box-shadow: $x-bs-sketch-falloff;
		z-index: 999;

		position: sticky;
		inset: 0;
		bottom: unset;
	}

	.morpher-container {
		width: 100%;
		display: grid;
		place-items: center;
	}

	#morpher {
		stroke: var(--color-primary-accent);
		fill: var(--color-primary-accent);

		position: fixed;
		margin-inline: auto;
	}

	#backdrop-nav {
		background: var(--color-bg);
		view-transition-name: backdrop-nav;
	}

	.section {
		height: 100vh;
		font-family: 'Satoshi-Regular', sans-serif;
		transition: font-size 0.2s ease-in;

		@include layout-respond-between('0', 'sm') {
			padding-inline: $x-space-md;
		}
	}

	.section__note {
		display: none;
	}

	.section__header {
		font-size: $x-font-size-6xl;
		font-family: 'Satoshi-Bold', sans-serif;
		line-height: 115%;

		@include layout-respond-between('0', 'sm') {
			font-size: $x-font-size-4xl;
		}

		&--3d {
			position: relative;

			&--red {
				color: #ff0050;
				color: var(--color-secondary-accent);
				opacity: 0.75;
			}

			&--blue {
				color: #00f2ea;
				color: var(--color-primary-accent);
				opacity: 0.75;
			}

			&::after,
			&::before {
				position: fixed;

				content: var(--content);
				opacity: 0.75;
			}

			&::after {
				color: var(--color-primary-accent);
			}

			&::before {
				color: var(--color-secondary-accent);
			}

			> * {
				position: absolute;
			}
		}
	}

	.section--hero {
		display: flex;
		$padding: $x-space-4 $x-space-6;
		align-items: center;

		@include layout-respond('lg') {
			max-width: $x-breakpoint-lg-content;
			margin-inline: auto;
		}

		> * {
			flex-grow: 1;
		}

		@include layout-respond-between('0', 'sm') {
			flex-direction: column;
			align-items: flex-start;
			padding: $padding;
		}

		.hero__title {
			font-family: 'Satoshi-Black', sans-serif;
			display: inline-flex;
			width: 6ch;

			@include layout-respond-between('0', '2xl') {
				font-size: $x-font-size-6xl;
			}

			@include layout-respond('2xl') {
				font-size: $x-font-size-8xl;
			}
		}

		.hero__subtitle {
			display: flex;
			gap: $x-space-md;
			align-items: center;

			@include layout-respond-between('0', '2xl') {
				font-size: $x-font-size-xl;
			}

			@include layout-respond('2xl') {
				font-size: $x-font-size-2xl;
			}
		}

		.nav__list {
			@include layout-flex-column();
			gap: $x-space-md;
			list-style: none;

			@include layout-respond-between('0', 'md') {
				font-size: $x-font-size-2xl;
			}

			@include layout-respond-between('md', '2xl') {
				font-size: $x-font-size-4xl;
			}

			@include layout-respond('2xl') {
				gap: 3.25rem;
				translate: 0 -3%;
				font-size: $x-font-size-6xl;
			}

			.nav__item {
				flex-grow: 1;
			}

			.nav__link {
				padding: $x-space-4 $x-space-6;
				display: inline-block;
				width: 100%;
				font-family: 'Satoshi-Light', sans-serif;
			}
		}
	}

	.corsette {
		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}

	#smooth-content-old {
		overflow: visible;
		width: 100%;
		/* set a height because the contents are position: absolute, thus natively there's no height */
		height: 4000px;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.07) 2px, transparent 2px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.07) 2px, transparent 2px),
			linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
		background-size:
			100px 100px,
			100px 100px,
			20px 20px,
			20px 20px;
		background-position:
			-2px -2px,
			-2px -2px,
			-1px -1px,
			-1px -1px;
	}
</style>
