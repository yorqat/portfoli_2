<script>
	import { navLinks } from '$lib/navLinks'

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
</script>

{#key page.url.pathname}
	<header class="nav-bar no-default" use:onUnfocus={() => (toggle = false)}>
		<div class="logo">
			<a href="/lounge"> YQ </a>

			<A11y />
		</div>

		<div class="nothing"></div>

		<details style="display: contents;" class="nav-toggle-container expand">
			<summary class="nav-toggle">
				<span class="material-symbols-outlined"> </span>
			</summary>

			<ul class="nav-links">
				{#each navLinks as { path, name }}
					<li>
						<a href={'/' + path} style={'view-transition-name: nav-link-' + name}>{name}</a>
					</li>
				{/each}
			</ul>
		</details>

		<ul class="nav-links desktop">
			{#each navLinks as { path, name }}
				<li>
					<a href={'/' + path} style={'view-transition-name: nav-link-' + name}>{name}</a>
				</li>
			{/each}
		</ul>
	</header>
{/key}

<style lang="scss">
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

		a {
			padding: $mobile-padding;
			font-size: $x-font-size-2xl;
			font-weight: bold;
		}
	}

	.nav-toggle,
	.material-symbols-outlined {
		@include default-theming.colored-svg-mask('/close.svg', var(--color-text), v.$font-size-4xl);
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
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
		}
	}

	.nav-bar {
		color: var(--color-text);
		padding-block: v.$space-3;

		position: sticky;

		width: 100%;

		display: grid;

		$cell-unit: v.$space-16;

		grid-template-columns: minmax($cell-unit, 1fr) 1fr $cell-unit;
		grid-template-rows: $cell-unit v.$space-36;
		grid-column-gap: v.$space-0;
		grid-row-gap: v.$space-0;

		transition:
			grid-template-rows 0.4s ease,
			grid-row-gap 0.4s ease;

		@include layouts.respond-between('0', 'md') {
			grid-row-gap: v.$space-6;
			.desktop {
				display: none;
			}

			.nothing {
				grid-area: 1 / 2 / 2 / 3;
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
						padding-left: v.$space-6 !important;
					}

					&:hover::after {
						content: '<--';
						color: var(--color-success);
						position: absolute;
						right: calc($mobile-padding * 6);
						top: 0;
						translate: 0 50%;
					}
				}
			}

			&:has(.nav-toggle-container[open]) {
				grid-template-rows: v.$space-12 20vh;
				grid-row-gap: v.$space-4;
			}

			/* closed toggle */
			&:has(.nav-toggle-container:not([open])) {
				grid-template-rows: v.$space-12 0;
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

					overflow: clip;

					gap: 0.2rem;
				}
			}
		}

		/* Wide desktop */
		@include layouts.respond('md') {
			grid-template-rows: 1fr 0;

			.nav-toggle {
				display: none;
			}

			.nav-links {
				grid-area: 1 / 2 / 2 / 3;
				justify-content: flex-end;
				display: flex !important;
				height: 100%;
				flex-direction: row;
				gap: v.$space-8;

				> * {
					text-align: right;
					flex-grow: unset;

					a {
						padding-inline: $x-space-8;
					}
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
