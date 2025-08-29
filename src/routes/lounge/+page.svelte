<script lang="ts">
	import A11y from '$lib/A11y.svelte'

	import { navLinks as loungeNav, keyboardNav } from '$lib/navLinks'
	import gsap from 'gsap'
	import { SplitText, ScrollTrigger, ScrollSmoother } from 'gsap/all'

	import '@material-symbols/font-400'

	import DrawSVGPlugin from 'gsap/DrawSVGPlugin'

	const duration = 0.5

	const smoothDesktop = 2
	const smoothTouch = 0.5

	$effect(() => {
		gsap.registerPlugin(SplitText)
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

		gsap.registerPlugin(DrawSVGPlugin)

		gsap.from('.draw-me', { duration: 1, drawSVG: 0 })

		// create the smooth scroller FIRST!
		let smoother = ScrollSmoother.create({
			smooth: smoothDesktop,
			smoothTouch: smoothTouch,
			effects: true
		})

		let tl = gsap.timeline({
			// yes, we can add it to an entire timeline!
			// scrollTrigger: {}
		})

		let splitLinks = SplitText.create('.nav__link', {
			type: 'chars,words',
			mask: 'chars' // <-- this can be "lines" or "words" or "chars"
		})

		tl.from(
			splitLinks.chars,
			{
				duration,
				y: 100,
				stagger: 0.015,
				transformOrigin: '50% 50% -20',
				ease: 'back.out(1.7)'
			},
			`<`
		)

		gsap.utils.toArray<HTMLElement>('.section--slide').forEach((section) => {
			const header = section.querySelector('.section__header--3d')
			if (!header) return

			gsap.from(header, {
				y: 50,
				opacity: 0,
				duration: 0.4,
				ease: 'sine.in',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					toggleActions: 'restart none none reverse'
				}
			})
		})
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

		<h1 class="section__header section__header--3d" data-lag="0.1">
			{heading}
		</h1>
	</div>
{/snippet}

<!-- Smooth Scroll Wrapper -->
<div id="smooth-wrapper" class="landing base">
	<div id="smooth-content" class="landing__content" use:keyboardNav>
		<!-- Hero Section -->
		<section class="section section--hero">
			<div class="hero__content">
				<div class="hero__branding">
					<span class="hero__title box">Y<span>or</span> Q<span>at</span></span>
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

			<div class="hero__backdrop draw-me" id="backdrop-nav"></div>
		</section>

		<!-- Secondary Hero -->
		<section class="section section--intro">
			{@render Heading3D('I design products that ship, scale, and serve real users')}
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
			<button class="cta__button">Review my work together?</button>
		</section>
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

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
				opacity: 0.75;
			}

			&--blue {
				color: #00f2ea;
				opacity: 0.75;
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
				font-size: $x-font-size-2xl;
			}

			@include layout-respond('2xl') {
				font-size: $x-font-size-4xl;
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
