<script lang="ts">
	import A11y from '$lib/A11y.svelte'
	import SymbolInput from '$lib/components/SymbolInput.svelte'

	import { navLinks as loungeNav, keyboardNav } from '$lib/navLinks'
	import gsap from 'gsap'
	import { SplitText, ScrollTrigger, ScrollSmoother } from 'gsap/all'
	import '@material-symbols/font-400'

	import Marquee from '$lib/components/Marquee.svelte'

	let node: HTMLElement
	const duration = 0.5

	$effect(() => {
		gsap.registerPlugin(SplitText)
		gsap.registerPlugin(ScrollTrigger)
		gsap.registerPlugin(ScrollSmoother)

		ScrollSmoother.create({
			smooth: 1,
			effects: true
		})

		let tl =
			gsap.timeline(/*{
			// yes, we can add it to an entire timeline!
			scrollTrigger: {
				trigger: '.slide',
				// pin: true, // pin the trigger element while active
				start: 'top top', // when the top of the trigger hits the top of the viewport
				end: '+=500', // end after scrolling 500px beyond the start
				scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
				snap: {
					snapTo: 'labels', // snap to the closest label in the timeline
					duration: { min: 5, max: 6 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
					delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
					ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
				},
			}
		}*/)

		let splitHeading = SplitText.create('h1', {
			type: 'chars,words',
			mask: 'words' // <-- this can be "lines" or "words" or "chars"
		})

		let split = SplitText.create('a', {
			type: 'chars,words',
			mask: 'chars' // <-- this can be "lines" or "words" or "chars"
		})

		tl.from(
			split.chars,
			{
				duration,
				y: 100,
				stagger: 0.01,
				transformOrigin: '50% 50% -20',
				ease: 'back.out(1.7)'
			},
			`+=${0}`
		).from(
			splitHeading.chars,
			{
				duration,
				stagger: 0.05,
				y: -20,
				opacity: 0,
				rotate: 20,
				transformOrigin: '50% 50% -20',
				ease: 'back.in(1.7)'
			},
			`+=${0}`
		)
	})
</script>

<svelte:head>
	<title>Smile at Yor Qat</title>
	<meta
		name="description"
		content="I make UX you can feel in your bones and back up with numbers. Hi, I’m Yor Qat."
	/>
</svelte:head>

<main class="base" data-theme="light" use:keyboardNav>
	<section id="hero">
		<div class="hero-text">
			<div>
				<span class="hero-text__title box">YQ</span>
				<div class="hero-text__subtitle">
					<!--
					<input id="theme-switch" type="checkbox" name="🞄" />
          -->
					<A11y />
					<span>ux dev <span class="material-symbols-outlined">Person</span> </span>
				</div>
			</div>
		</div>

		<nav>
			<ul class="nav-links">
				{#each loungeNav as { path, name }}
					<li>
						<a href={path} style={'view-transition-name: nav-link-' + name}>{name}</a>
					</li>
				{/each}
			</ul>
			<!--
			<div>
				<Marquee text="BLOGS MAKES PROBLEMS GO AWAY" separator='•' />
			</div>
      -->
		</nav>

		<div id="backdrop-nav"></div>
	</section>

	<section class="hero-secondary base">
		<h2 bind:this={node} class="slide-header">
			I design products that ship, scale, and serve <span>real</span> users
		</h2>
	</section>

	<section class="slide">
		<h1 class="slide-header">I Design with Delivery in Mind</h1>
		<p class="dev-comments">Scoped for tablet breakpoints</p>
		<p class="dev-comments">Componentized for reuse</p>
	</section>

	<section class="slide">
		<h1 class="slide-header">Design That Moves Metrics</h1>
		<p class="dev-comments">Reduced form fields</p>
		<p class="dev-comments">Increased CTA visibility</p>
		<p class="dev-comments">Tracking impact with funnel data</p>
	</section>

	<section class="slide">
		<h1 class="slide-header">Built with User Insight</h1>

		<p class="dev-comments">Userflow from Miro or Figjam</p>
		<p class="dev-comments">Persona Drafts</p>
		<p class="dev-comments">Bug report from a usability session</p>
	</section>

	<section class="slide">
		<h1 class="slide-header">Design is a Team Sport</h1>
		<p class="dev-comments">Jira ticket with latest iteration design attached</p>
		<p class="dev-comments">
			Slack Handoff snippets: "Final assets uploaded", "Spec clarified here"
		</p>
		<p class="dev-comments">Userflow from Miro or Figjam</p>
		<p class="dev-comments">Timeline or roadmap alignment doc</p>
	</section>

	<section class="slide">
		<h1 class="slide-header">Curious of what I bring to the table?</h1>

		<input type="button" value="Review my work together?" />
	</section>
</main>

<style lang="scss">
	@use '_index' as *;

	section {
		height: 105svh;

		font-family: 'Satoshi-Bold', sans-serif;
		position: relative;
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
	}

	h1 {
		font-size: clamp(4rem, 10vw, 8rem);
		padding: 1rem 2rem;
		letter-spacing: -0.1rem;
		// position: sticky;
		top: 0;
	}

	h2 {
		font-size: clamp(3rem, 10vw, 6rem);
		padding: 1rem 2rem;
		letter-spacing: -0.1rem;
	}

	section.slide {
	}

	#hero {
		/*padding-inline: clamp(1rem, 10vw, 8rem);
    */
		display: flex;
		flex-direction: row;
		position: relative;
		transition:
			color 0.3s,
			background 0.2s;

		height: 100vh;
		height: 100svh;

		background: var(--color-surface);

		> * {
			flex-grow: 1;

			display: grid;
			place-items: center;
		}

		@include layout-respond-between('0', 'md') {
			flex-direction: column;
		}
	}

	.hero-text__title {
		font-size: clamp(4.8rem, 10vw, 8rem);
		font-weight: 800;
		view-transition-name: logo;

		position: relative;
	}

	.hero-text__subtitle {
		font-size: clamp(2rem, 4vw, 4rem);
		// font-family: 'Kay Pho Du', serif;
		font-weight: 400;
	}

	.nav-links {
		font-family: Satoshi-Regular;
		font-size: clamp(1.25rem, 5vw, 4.5rem);
		font-weight: 400;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 5vw, 3rem);

		width: 40vw;
		text-align: left;

		li > a {
			display: inline-block;
			width: 100%;
			padding: 2rem;
		}
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	#backdrop-nav {
		z-index: -1;
		background: var(--color-bg);
		position: absolute;
		height: 100%;
		width: 100%;
		view-transition-name: backdrop-nav;
	}

	input[type='button'] {
		@include input-button(var(--color-primary), var(--color-button-text));
	}
</style>
