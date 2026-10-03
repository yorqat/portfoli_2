<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import NavBar from '$lib/NavBar.svelte'
	import Footer from '$lib/content/Footer.svelte'
	import { Seo } from '$lib/components/Seo.svelte'
	import { SITE, ROLE, OG } from '$lib/site'
</script>

<svelte:head>
	{@render Seo({
		title: 'Contact',
		description: `Get in touch with ${SITE.name} about ${ROLE.level} ${ROLE.primary} work.`,
		path: '/contact',
		image: OG.default
	})}
</svelte:head>

<div
	class="base scroll-scheme"
	id="contact"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<div id="nav">
		<NavBar />
	</div>

	<main class="contact">
		<h1>Contact</h1>

		<p class="contact__status">
			Looking for a <strong>{ROLE.level} {ROLE.primary}</strong> role.
			{SITE.availability}.
		</p>

		<section class="contact__block">
			<h2>Email</h2>
			<p>
				<a class="contact__email" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
			</p>
		</section>

		<section class="contact__block">
			<h2>Elsewhere</h2>
			<ul class="contact__links">
				<li>
					<a href={SITE.social.linkedin} rel="me noopener" target="_blank">LinkedIn</a>
					<span>— profile and history</span>
				</li>
				<li>
					<a href={SITE.social.github} rel="me noopener" target="_blank">GitHub</a>
					<span>— code</span>
				</li>
				<li>
					<a href={SITE.social.dribbble} rel="me noopener" target="_blank">Dribbble</a>
					<span>— visual work</span>
				</li>
				<li>
					<a
						href={`https://x.com/${SITE.social.x.replace('@', '')}`}
						rel="me noopener"
						target="_blank">X</a
					>
					<span>— {SITE.social.x}</span>
				</li>
			</ul>
		</section>

		<section class="contact__block">
			<h2>What I am looking for</h2>
			<ul>
				<li>{ROLE.level} {ROLE.primary} or {ROLE.secondary} role, in a team that ships.</li>
				<li>
					Someone to mentor me on the parts I cannot learn alone: collaboration, scope, and
					production.
				</li>
			</ul>
			<p class="contact__note">
				Everything on this site is self-initiated work. I would rather tell you that up front than
				have you find out in an interview.
			</p>
		</section>
	</main>

	<Footer />
</div>

<style lang="scss">
	@use '_index' as *;

	.contact {
		max-width: 75rem;
		margin-inline: auto;
		padding: $x-space-xxl $x-space-lg $x-space-xxxl;

		@include layout-respond-max('md') {
			padding: $x-space-xxl $x-space-md $x-space-xxl;
		}

		h1 {
			@include fonts-stack('Satoshi-Black', sans);
			@include layout-respond-max('md') {
				font-size: $x-font-size-3xl;
			}

			@include layout-respond('md') {
				font-size: $x-font-size-4xl;
			}
		}

		h2 {
			@include fonts-stack('Satoshi-Bold', sans);
			margin-block-end: $x-space-xs;
		}
	}

	.contact__status {
		@include fonts-stack('Satoshi-Bold', sans);
		color: var(--color-primary);
		margin-block: $x-space-sm $x-space-lg;
	}

	.contact__block {
		margin-block-end: $x-space-xxl;

		p,
		li {
			@include fonts-stack('Satoshi-Regular', sans);
		}
	}

	.contact__email {
		@include fonts-stack('Satoshi-Bold', sans);
		font-size: $x-font-size-xl;
		overflow-wrap: anywhere;
	}

	.contact__links {
		list-style: none;
		display: grid;
		gap: $x-space-xs;

		span {
			color: var(--color-text-muted);
		}
	}

	.contact__note {
		color: var(--color-text-muted);
		max-width: 60ch;
		margin-block-start: $x-space-sm;
	}
</style>
