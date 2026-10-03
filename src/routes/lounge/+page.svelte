<script lang="ts">
	import A11y from '$lib/A11y.svelte'

	import { navLinks as loungeNav, keyboardNav } from '$lib/navLinks'

	import '@material-symbols/font-400'

	import { animateLoungeElements } from './animations'
	import { onMount, type Snippet } from 'svelte'
	import NavBar from '$lib/NavBar.svelte'
	import Footer from '$lib/content/Footer.svelte'
	import Marquee from '$lib/components/Marquee.svelte'
	import Seo from '$lib/components/Seo.svelte'
	import { OG, SITE, ROLE, absolute } from '$lib/site'

	import pfp from '$lib/content/blogs/posts/cropped-pfp.png'

	$effect(animateLoungeElements)

	import { gsap } from 'gsap/all'
	let scrolledPastLoungeNav = $state(false)

	$effect(() => {
		if (scrolledPastLoungeNav) {
			gsap.from('#nav', {
				y: -50,
				opacity: 0
			})

			gsap.to('.section--hero', {
				y: -400,
				opacity: 0
			})
		} else {
			gsap.to('.section--hero', {
				y: 0,
				opacity: 100,
				ease: 'ease.in',
				duration: 1
			})
		}
	})

	onMount(() => {
		const handleScroll = () => {
			scrolledPastLoungeNav = window.scrollY > window.innerHeight * 0.65 // 80vh
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})
</script>

<Seo
	title="Smile at Yor Qat"
	bareTitle
	description={SITE.description}
	path="/lounge"
	image={OG.lounge}
	imageAlt="Yor Qat, interface designer and front-end engineer"
	type="profile"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: SITE.name,
		url: absolute('/lounge'),
		image: absolute(OG.lounge),
		jobTitle: 'Interface designer & front-end engineer',
		description: SITE.tagline,
		sameAs: [
			SITE.social.linkedin,
			SITE.social.github,
			`https://x.com/${SITE.social.x.replace('@', '')}`
		]
	}}
/>

{#snippet Heading3D(heading: string)}
	<div class="section__header--3d corsette" aria-label={heading}>
		<div class="section__header section__header--3d--blue" aria-hidden="true" data-lag="0.05">
			{heading}
		</div>
		<div class="section__header section__header--3d--red" aria-hidden="true" data-lag="0.15">
			{heading}
		</div>

		<div
			class="section__header section__header--3d"
			aria-hidden="true"
			data-lag="0.1"
			style="--content: ''"
		>
			{heading}
		</div>
	</div>
{/snippet}

{#snippet smoothScroll(content: Snippet, outside: Snippet)}
	<!-- Smooth Scroll Wrapper -->
	<div id="smooth-wrapper" class="landing base">
		{@render outside()}

		<div id="smooth-content" class="landing__content" use:keyboardNav>
			{@render content()}
		</div>
	</div>
{/snippet}

{#snippet nav()}
	<div
		id="nav"
		style="visibility: {!scrolledPastLoungeNav ? 'hidden' : 'visible'};"
		inert={!scrolledPastLoungeNav || undefined}
	>
		<NavBar tagViewTransition={scrolledPastLoungeNav} />
	</div>
{/snippet}

{#snippet content()}
	<Marquee
		text="Hi, I'm Yor Qat ◦ Design Engineer ◦ Svelte ◦ SCSS Design Systems ◦ Accessibility ◦ Data-driven UI ◦ Currently seeking a junior role"
		separator="◦ "
		magnitude={1}
		duration="200s"
	/>
	<section class="section section--hero" inert={scrolledPastLoungeNav ?? undefined}>
		<div class="hero__content banner">
			<div class="hero__branding">
				<h1 class="hero__title box">
					{#snippet TransitionLetter(letter: string)}
						<span style="--vt:{letter.toString()};" class:vt={!scrolledPastLoungeNav}>{letter}</span
						>
					{/snippet}

					{@render TransitionLetter('Y')}<span class="span-collapse">or</span>
					{@render TransitionLetter('Q')}<span class="span-collapse">at</span>
				</h1>
				<div class="hero__subtitle">
					<A11y />
					<span> {ROLE.level} {ROLE.primary} </span>
				</div>
			</div>

			<div class="hero__showcase">
				<h2 class="hero__intro">
					I build interfaces and the design systems behind them. Now, looking for a new team to cook
					with
				</h2>

				<div class="profile-picture">
					<img class="profile-picture__img" sizes="400px" src={pfp} alt="yor's profile" />
				</div>
			</div>

			<nav class="hero__nav">
				<ul class="nav__list">
					{#each loungeNav as { path, name }}
						<li class="nav__item">
							<a
								href={path}
								class="nav__link"
								class:vt={!scrolledPastLoungeNav}
								style={'--vt: nav-link-' + name}
							>
								{name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</section>

	<!-- Slides.

	     The section headers and the CTA have been rewritten: the old ones claimed
	     outcomes this work cannot support (metrics, user research, a team), which
	     contradicted SITE.workContext on the same site. Three fabricated notes were
	     cut for the same reason — "Tracking impact with funnel data", "Bug report
	     from a usability session", and a pair of invented Slack handoff snippets.
	     What remains on slide 4 still leans on team process language; see there.

	     The artwork is undesigned. Two rules for it:

	     - Nothing invented. No dashboards, no fake charts, no user avatars, no
	       chat UI, no analytics. Slide 2 is the trap: a gauge or a percentage
	       would need a number, and any number would be made up. A before/after
	       self-evidences without one.
	     - Balance. Only slide 3 has art today, so the rhythm reads text / text /
	       graphic / text, and the graphic looks like an interruption rather than
	       a peak. Small marks on 1, 2 and 4; keep 3 as the centrepiece.

	     Reuse the blue/red offset trick from the 3D headings so artwork and type
	     read as one system. Graphics sit in the right ~700px, matching the OG
	     text budget, with heading and notes on the left. -->
	<section class="section section--slide">
		<!-- GRAPHIC BRIEF — undesigned.
	     Notes are accurate as they stand; no change needed.
	     One component at three widths — mobile, tablet highlighted, desktop —
	     over breakpoint gridlines. Interpolate the frames on scroll instead
	     of cutting between them. One object covers both notes.
	     Alt: a button exploded into tokens (padding, radius, type scale). -->
		{@render Heading3D('I Design with Delivery in Mind')}
		<p class="section__note">Scoped for tablet breakpoints</p>
		<p class="section__note">Componentized for reuse</p>
	</section>

	<!-- GRAPHIC BRIEF — undesigned.
	     NOTES STILL PENDING: "Fewer form fields", "Clearer primary action".
	     Draw a form collapsing: nine fields grey out and strike through, three
	     survive, the count ticks 9 to 3, and the primary button gains weight as
	     the rest fade. Before and after, no metric.
	     Alt: a cursor path that used to zigzag through nine stops settling into
	     three. -->
	<section class="section section--slide">
		{@render Heading3D('I Cut the Work a User Has To Do')}
		<p class="section__note">Reduced form fields</p>
		<p class="section__note">Increased CTA visibility</p>
	</section>

	<!-- GRAPHIC BRIEF — undesigned. Keep the morpher; it is the strongest asset on
	     the page and an honest metaphor, rough resolving into structure.
	     NOTES STILL PENDING: "Userflow first", "Personas, still rough".
	     Let the blob become the diagram: morph into three labelled nodes with the
	     connectors drawn on via DrawSVG as the labels settle. One object,
	     structure out of nothing.
	     Lean into "still rough" — show the draft state (heavier stroke, slight
	     rotation, a visible draft tag) rather than hiding it. Roughness is the
	     honest part of a persona, so it should look deliberate, not sloppy. -->
	<section class="section section--slide">
		{@render Heading3D('I Plan Before I Open Figma')}
		<p class="section__note">Userflow from Miro or Figjam</p>
		<p class="section__note">Persona Drafts</p>

		<div class="morpher-container" aria-hidden="true">
			<svg
				width="200"
				height="200"
				viewBox="0 0 200 200"
				fill="none"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="morpher"
					stroke="none"
					transform="translate(-10,-10)"
					d="M73.8 139.715 60.932 100.11c5.542 8.148 10.38 14.17 14.597 18.04 2.856 2.621 5.548 4.37 8.093 5.043 2.642.698 5.07.214 7.138-1.477 1.981-1.619 3.528-4.256 4.773-7.668 1.255-3.436 2.26-7.815 3.06-13.09.59-3.9 1.074-8.32 1.46-13.252.507 5.305 1.102 10.038 1.798 14.192.902 5.381 1.982 9.84 3.285 13.331 1.292 3.464 2.859 6.132 4.832 7.759 2.068 1.705 4.483 2.179 7.094 1.416 2.5-.731 5.113-2.571 7.86-5.297 3.836-3.806 8.18-9.592 13.104-17.338l-12.329 37.946H73.8Z"
				/><path
					id="morpher__baby"
					d="M73.8 139.715 60.932 100.11c5.542 8.148 10.38 14.17 14.597 18.04 2.856 2.621 5.548 4.37 8.093 5.043 2.642.698 5.07.214 7.138-1.477 1.981-1.619 3.528-4.256 4.773-7.668 1.255-3.436 2.26-7.815 3.06-13.09.59-3.9 1.074-8.32 1.46-13.252.507 5.305 1.102 10.038 1.798 14.192.902 5.381 1.982 9.84 3.285 13.331 1.292 3.464 2.859 6.132 4.832 7.759 2.068 1.705 4.483 2.179 7.094 1.416 2.5-.731 5.113-2.571 7.86-5.297 3.836-3.806 8.18-9.592 13.104-17.338l-12.329 37.946H73.8Z"
				/>
			</svg>
		</div>
	</section>

	<!-- GRAPHIC BRIEF — undesigned.
	     Proposed header: "I Leave the Work Readable".
	     NOTES STILL PENDING: "Component docs", "Written rationale in the README",
	     "Issues I filed and fixed".
	     Cut "Userflow from Miro or Figjam" (verbatim duplicate of slide 3) and
	     "Timeline or roadmap alignment doc" (implies stakeholders who are not
	     there). "Jira ticket with latest iteration design attached" is left in
	     place: solo use of Jira is plausible, but "latest iteration" reads as a
	     team cycle, so it needs your call.
	     Draw a git trail as a vertical timeline of real commit messages, with one
	     token change rippling out to N call sites: one dot lights, eleven update.
	     That is the actual argument for a design system and it can be
	     screenshotted from the real repo.
	     Alt: a component table where editing one row live-updates a rendered
	     preview beside it.
	     This is the one section that can show genuine artifacts. Make it the proof
	     section. -->
	<section class="section section--slide">
		{@render Heading3D('I Leave the Work Readable')}
		<p class="section__note">Jira ticket with latest iteration design attached</p>
		<p class="section__note">Userflow from Miro or Figjam</p>
		<p class="section__note">Timeline or roadmap alignment doc</p>
	</section>

	<!-- GRAPHIC BRIEF — none recommended.
	     Let the email be the visual, set large. An illustration would fight the
	     button, and the portrait already carries the OG card, so the face does not
	     need to repeat here. -->
	<!-- Call to Action -->
	<section class="section section--cta">
		{@render Heading3D('Want to see more?')}
		<a class="cta__button corsette" href="/contact">Get in touch</a>
		<p class="cta__status">
			Looking for a {ROLE.level}
			{ROLE.primary} role. {SITE.availability}.
		</p>
	</section>

	<section class="section section--footer">
		<Footer />
	</section>
{/snippet}

{@render smoothScroll(content, nav)}

<style lang="scss">
	@use '_index' as *;

	.section__note {
		display: none;
	}

	.span-collapse {
		// display: none;

		@include fonts-stack('Satoshi-Bold', sans);
		@include fonts-alternate-style();

		color: var(--color-text-muted);
	}

	.profile-picture {
		overflow: hidden;

		aspect-ratio: 1;
		position: relative;
		border-radius: 50%;
		margin-bottom: $x-space-md;

		&__img {
			position: absolute;
			width: 100%;
		}

		@include layout-respond-max('lg') {
			width: 16rem;
		}

		@include layout-respond('lg') {
			width: 22rem;
		}

		@include layout-respond('2xl') {
			width: 28rem;
		}
	}

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
		z-index: 999;
	}

	#morpher {
		stroke: var(--color-text);
		fill: var(--color-bg);
		stroke-width: 3px;

		position: absolute;
		margin-inline: auto;

		&__baby {
			fill: var(--color-secondary-accent);
		}
	}

	#backdrop-nav {
		background: var(--color-bg);
		view-transition-name: backdrop-nav;
	}
	.vt {
		@include animations-declare-view-transition();
	}

	.section {
		@include fonts-stack('Satoshi', sans);
		@include fonts-alternate-style();

		min-height: 100vh;

		@include layout-respond-max('sm') {
			> *:not(.banner) {
				padding-inline: $x-space-md;
			}
		}

		@include layout-respond('sm') {
			> *:not(.banner) {
				padding-inline: $x-space-lg;
			}
		}

		@include layout-respond('xl') {
			> *:not(.banner) {
				padding-inline: $x-space-xxl;
			}
		}
	}

	/* The footer is shorter than a viewport, so the shared 100vh minimum on
	   .section left a screen of dead space beneath it. */
	.section--footer {
		min-height: 0;
	}

	.nav__list {
		@include layout-flex-column();
		@include fonts-stack('Satoshi-Regular', sans);
		@include fonts-alternate-style();
		list-style-type: none;

		@include layout-respond-max('md') {
			gap: $x-space-md;

			a {
				font-size: $x-font-size-xl;
				padding-inline: $x-space-md;
			}
		}

		@include layout-respond('md') {
			gap: $x-space-md;

			a {
				font-size: $x-font-size-2xl;
				padding-inline: $x-space-xl;
			}
		}

		@include layout-respond('lg') {
			gap: $x-space-lg;

			a {
				font-size: $x-font-size-4xl;
			}
		}

		/* No `xl` step: it set gap back to $x-space-md, the only value in this
		   file that shrank as the viewport grew. Font-size also holds at 4xl from
		   lg through to 2xl, so a gap change here had nothing to track. Restore
		   this block with $x-space-xl if the nav should keep opening up. */
		@include layout-respond('2xl') {
			a {
				font-size: $x-font-size-6xl;
			}
		}
	}

	/* h1 reset — the name was a <span> before it became the page heading, so it
	   must not pick up UA heading margins or font-weight. `display: inline`
	   keeps the original inline flow of the per-letter transition spans. */
	.hero__title {
		@include fonts-stack('Satoshi-Black', sans);
		@include fonts-alternate-style();

		display: inline;
		margin: 0;
		font-weight: inherit;

		@include layout-respond-max('lg') {
			font-size: $x-font-size-4xl;
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-6xl;
			letter-spacing: -2px;
		}

		@include layout-respond('2xl') {
			font-size: $x-font-size-8xl;
		}
	}

	.hero__subtitle {
		display: flex;
		align-items: center;

		@include layout-respond-max('md') {
			gap: $x-space-xs;
		}

		@include layout-respond('md') {
			gap: $x-space-sm;
		}

		> * {
			text-transform: uppercase;
			@include fonts-stack('Satoshi-Light', sans);
			@include fonts-alternate-style();

			@include layout-respond-max('md') {
				font-size: $x-font-size-lg;
			}

			@include layout-respond('md') {
				font-size: $x-font-size-xl;
			}

			@include layout-respond('2xl') {
				font-size: $x-font-size-2xl;
			}
		}
	}

	.hero__intro {
		@include fonts-stack('Satoshi-Light', sans);
		@include fonts-alternate-style();

		line-height: 110%;

		max-width: 18ch;

		@include layout-respond('lg') {
			font-size: $x-font-size-xl;
		}

		@include layout-respond('xl') {
			font-size: $x-font-size-2xl;
		}

		@include layout-respond('2xl') {
			font-size: $x-font-size-4xl;
		}
	}

	.hero__showcase {
		@include layout-flex-column();
		flex-direction: column-reverse;

		align-items: center;
	}

	.hero__content {
		display: flex;
		min-height: 72vh;

		@include layout-respond-max('md') {
			flex-direction: column;
			justify-content: space-between;

			padding-inline: $x-space-sm;
			gap: $x-space-lg;
		}

		@include layout-respond('md') {
			> * {
				flex-grow: 1;
			}
		}

		@include layout-respond('md') {
			flex-direction: row;
			align-items: center;

			// pad instead
			// max-width: $x-breakpoint-md-content;
			padding-inline: $x-space-md;
			width: 100%;
			margin-inline: auto;
		}

		@include layout-respond('lg') {
			max-width: $x-breakpoint-lg-content;
			width: 100%;
			margin-inline: auto;
		}

		@include layout-respond('xl') {
			max-width: $x-breakpoint-xl-content;
			width: 100%;
			margin-inline: auto;
		}

		@include layout-respond('2xl') {
			max-width: $x-breakpoint-2xl-content;
			width: 100%;
			margin-inline: auto;
		}
	}

	.section__header {
		@include fonts-stack('Satoshi-Bold', sans);
		@include fonts-alternate-style();
		line-height: 115%;

		@include layout-respond-max('lg') {
			font-size: $x-font-size-4xl;
		}

		@include layout-respond('2xl') {
			font-size: $x-font-size-6xl;
		}

		&--3d {
			position: relative;

			&--red {
				color: var(--color-secondary-accent);
				opacity: 0.75;
			}

			&--blue {
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

	.corsette {
		@include layout-corsette();
	}
</style>
