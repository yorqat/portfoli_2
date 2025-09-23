<script lang="ts">
	import { chapters, navLinks } from '$lib/navLinks'

	import A11y from '$lib/A11y.svelte'

	import { onNavigate } from '$app/navigation'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	import { page } from '$app/state'

	import { onUnfocus } from '$lib/actions'

	let toggle = $state(false)

	import '@material-symbols/font-400'

	import gsap from 'gsap'
	import { SplitText } from 'gsap/all'
	import type { Snippet } from 'svelte'

	const duration = 0.8

	type NavBarProps = {
		tagViewTransition?: boolean
		extraChapters?: Snippet
	}

	const { tagViewTransition = true, extraChapters }: NavBarProps = $props()

	$effect(() => {
		gsap.registerPlugin(SplitText)

		let tl = gsap.timeline()

		let splitLinks = SplitText.create('.nav__link', {
			type: 'chars,words',
			mask: 'lines', // <-- this can be "lines" or "words" or "chars"
			autoSplit: true
		})

		tl.from(splitLinks.chars, {
			duration,
			x: 40,
			stagger: 0.008,
			transformOrigin: '50% 50% -20',
			ease: 'back.out(1.7)'
		})
	})
</script>

{#key page.url.pathname}
	<header
		data-extra-chapters={extraChapters !== undefined}
		class="nav-bar no-default"
		use:onUnfocus={() => (toggle = false)}
		onclick={() => (toggle = false)}
	>
		<div class="logo">
			<a class="logo__icon" href="/lounge">
				{#snippet TransitionLetter(letter: string)}
					<span style="--vt:{letter.toString()};" class:vt={tagViewTransition}>{letter}</span>
				{/snippet}

				{@render TransitionLetter('Y')}{@render TransitionLetter('Q')}
			</a>

			<A11y />
		</div>

		<div class="nothing"></div>

		<details bind:open={toggle} style="display: contents;" class="nav-toggle-container expand">
			<summary class="nav-toggle">
				<span class="material-symbols-outlined"> </span>
			</summary>

			<ul class="nav-links">
				{#each navLinks as { path, name }}
					<li>
						<a
							href={'/' + path}
							style={tagViewTransition ? 'view-transition-name: nav-link-' + name : ''}>{name}</a
						>
					</li>
				{/each}
			</ul>

			<div class="nav-chapters scroll-scheme">
				{@render extraChapters?.()}
			</div>
		</details>

		<ul class="nav-links desktop">
			{#each navLinks as { path, name }}
				<li>
					<a
						class="nav__link vt"
						href={'/' + path}
						style={tagViewTransition ? '--vt: nav-link-' + name : ''}>{name}</a
					>
				</li>
			{/each}
		</ul>
	</header>
{/key}

<style lang="scss" global>
	@use '_layouts.scss' as layouts;
	@use '_semantics.scss' as semantics;
	@use '_theming.scss' as default-theming;
	@use '_variables.scss' as v;

	@use '_index' as *;

	$mobile-padding: $x-space-2;

	summary {
		position: relative;
		list-style: none;

		grid-area: 1 / 3 / 2 / 4;

		> * {
			pointer-events: none;
		}
	}

	.logo {
		padding-left: $mobile-padding;

		display: flex;
		align-items: center;

		gap: 1rem;

		&__icon {
			padding: $mobile-padding;
			font-size: $x-font-size-2xl;
			@include fonts-stack('Satoshi-Bold', 'sans-serif');
			@include fonts-alternate-style();
		}
	}

	.nav-toggle {
		@include default-theming.colored-svg-mask('/close.svg', var(--color-text), v.$font-size-4xl);
	}

	$nav-link-height: 20vh;
	$nav-chapter-height: 45vh;

	.nav-chapters {
		display: contents;

		.table-of-contents {
			max-height: $nav-chapter-height;

			grid-area: 3 / 1 / 4 / 4;
		}

		h3 {
			background: var(--color-surface);
			position: sticky;

			display: flex;
			align-items: center;
			gap: $x-space-md;

			padding-inline: $x-space-4;
			padding-block: $x-space-8;

			.material-symbols-outlined {
				font-size: $x-font-size-2xl;
			}
		}

		.content {
			@include layout-flex-column();
			justify-content: space-between;
			padding-inline: $x-space-8;
		}

		.chapter {
			a {
				display: block;
				padding-block: $x-space-sm;
			}
		}
	}

	.nav-links {
		list-style-type: none;
		grid-area: 2 / 1 / 3 / 4;
		display: flex;

		li {
			flex-grow: 1;
			padding: 0;
		}

		a {
			display: block;
			align-items: center;

			padding: $x-space-sm;
		}
	}

	.nav-bar {
		color: var(--color-text);
		padding-block: v.$space-3;

		@include fonts-stack('Satoshi-Regular', sans-serif);
		@include fonts-alternate-style();
		font-size: $x-font-size-lg;

		width: 100%;

		display: grid;

		$cell-unit: v.$space-16;

		grid-template-columns: minmax($cell-unit, 1fr) 1fr $cell-unit;
		grid-column-gap: v.$space-0;
		grid-row-gap: v.$space-0;

		transition:
			grid-template-rows 0.4s ease,
			grid-row-gap 0.4s ease;

		@include layouts.respond-max('md') {
			grid-row-gap: v.$space-6;
			.desktop {
				display: none;
			}

			.nothing {
				grid-area: 1 / 2 / 2 / 3;
			}

			// feels hacky but works for mobile jank
			// against details tags
			.nav-links,
			.table-of-contents {
				width: 95vw;
			}

			.nav-links {
				flex-direction: column;
				height: 100%;

				> * {
					text-align: left;
					flex-grow: 1;

					padding-inline: $mobile-padding;
					position: relative;

					a {
						padding-left: v.$space-6;
					}

					&:hover::after {
						content: '<-';
						color: var(--color-success);
						position: absolute;
						right: calc($mobile-padding * 6);
						top: 0;
						translate: 0 50%;
					}
				}
			}

			&:has(.nav-toggle-container[open]) {
				grid-template-rows: v.$space-12 $nav-link-height $nav-chapter-height;
				grid-row-gap: v.$space-4;

				&[data-extra-chapters='false'] {
					grid-template-rows: v.$space-12 $nav-link-height 0;
				}
			}

			/* closed toggle */
			&:has(.nav-toggle-container:not([open])) {
				grid-template-rows: v.$space-12 0 0;
				grid-row-gap: v.$space-0;

				.nav-toggle {
					@include default-theming.colored-svg-mask(
						'/menu.svg',
						var(--color-text),
						v.$font-size-4xl
					);
				}

				.nav-links {
					@include semantics.hide-animatable();

					gap: 0.2rem;
				}
			}
		}

		/* Wide desktop */
		@include layouts.respond('lg') {
			grid-template-rows: 1fr 0;

			.nav-toggle {
				display: none;
			}

			.nav-links {
				grid-area: 1 / 2 / 2 / 4;
				justify-content: flex-end;
				display: flex !important;
				align-items: center;
				height: 100%;
				flex-direction: row;
				gap: v.$space-4;
				padding-right: $x-space-lg;

				> * {
					text-align: right;
					flex-grow: unset;
				}
			}
		}

		@include layout-respond('lg') {
			.nav-links {
				a {
					padding-inline: $x-space-6;
				}
			}
		}

		/* Extra wide desktops*/
		@include layouts.respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}
</style>
