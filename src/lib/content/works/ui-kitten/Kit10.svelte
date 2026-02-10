<script lang="ts">
	import ContextMenu from '$lib/content/works/ui-kitten/editor/ContextMenu.svelte'

	import { writable } from 'svelte/store'

	import { getTheme } from '$lib/theming'
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte'
	import { contextMenu } from '$lib/content/works/ui-kitten/editor/contextMenu'
	import type {
		ComponentView,
		ComponentFlat,
		ComponentViewRoot
	} from '$lib/content/works/ui-kitten/editor/Component.svelte'
	import Colours from './libraries/colours'

	type Kit10Props = {
		debug?: boolean
	}

	const { debug = false } = $props()

	let offsetX = writable(0)
	let offsetY = writable(0)

	$effect(() => {
		const viewport = document.getElementById('canvas')

		if (viewport) {
			offsetX.set(viewport.clientWidth / 2)
			offsetY.set(viewport.clientHeight / 2)
		}
	})

	import { type TokenLibrary, type Token } from './editor/panels/Variables.svelte'

	let tokens: Token[] = $state([
		{
			name: 'x-space-xl',
			displayName: 'Space SM',
			value: { resolve: 'gaps-linear-4/space-1' }
		},
		{
			name: 'x-space-md',
			displayName: 'Space MD',
			value: { resolve: 'gaps-linear-4/space-2' }
		},
		{
			name: 'x-space-lg',
			displayName: 'Space LG',
			value: { resolve: 'gaps-linear-4/space-5' }
		}
		/*
		{
			name: 'color-primary',
			displayName: 'Primary',
			value: { resolve: 'colours-of-css/light-coral' }
		},
		{
			name: 'color-secondary',
			displayName: 'Secondary',
			value: { resolve: 'colours-of-css/alice-blue' }
		}
    */
	])

	let tokenLibraries: TokenLibrary = $state({
		'colours-of-css': {
			tokens: Colours.tokens
		},

		'gaps-linear-4': {
			tokens: [
				{ name: 'space-0', displayName: 'Space 0', value: '0' },
				{ name: 'space-1', displayName: 'Space 1', value: '0.25rem' }, // 4px
				{ name: 'space-2', displayName: 'Space 2', value: '0.5rem' }, // 8px
				{ name: 'space-3', displayName: 'Space 3', value: '0.75rem' }, // 12px
				{ name: 'space-4', displayName: 'Space 4', value: '1rem' }, // 16px
				{ name: 'space-5', displayName: 'Space 5', value: '1.25rem' }, // 20px
				{ name: 'space-6', displayName: 'Space 6', value: '1.5rem' }, // 24px
				{ name: 'space-8', displayName: 'Space 8', value: '2rem' }, // 32px
				{ name: 'space-10', displayName: 'Space 10', value: '2.5rem' }, // 40px
				{ name: 'space-12', displayName: 'Space 12', value: '3rem' }, // 48px
				{ name: 'space-16', displayName: 'Space 16', value: '4rem' }, // 64px
				{ name: 'space-20', displayName: 'Space 20', value: '5rem' }, // 80px
				{ name: 'space-24', displayName: 'Space 24', value: '6rem' }, // 96px
				{ name: 'space-28', displayName: 'Space 28', value: '7rem' }, // 112px
				{ name: 'space-32', displayName: 'Space 32', value: '8rem' }, // 128px
				{ name: 'space-36', displayName: 'Space 36', value: '9rem' }, // 144px
				{ name: 'space-40', displayName: 'Space 40', value: '10rem' }, // 160px
				{ name: 'space-44', displayName: 'Space 44', value: '11rem' }, // 176px
				{ name: 'space-48', displayName: 'Space 48', value: '12rem' }, // 192px
				{ name: 'space-52', displayName: 'Space 52', value: '13rem' }, // 208px
				{ name: 'space-56', displayName: 'Space 56', value: '14rem' }, // 224px
				{ name: 'space-60', displayName: 'Space 60', value: '15rem' }, // 240px
				{ name: 'space-64', displayName: 'Space 64', value: '16rem' }, // 256px
				{ name: 'space-72', displayName: 'Space 72', value: '18rem' }, // 288px
				{ name: 'space-80', displayName: 'Space 80', value: '20rem' }, // 320px
				{ name: 'space-96', displayName: 'Space 96', value: '24rem' } // 384px
			]
		}
	})

	import { builtinAxes } from './axesBuiltIn'

	let kits: ComponentFlat[] = $state([
		{
			name: 'Button',
			discriminator: 0,
			sets: {
				axisRank: [0, 1, 5, 6].map((i) => {
					const axis = builtinAxes[i]
					if (!axis) throw new Error(`Missing builtin axis ${i}`)
					return axis
				}),
				layers: [
					{
						axes: {},
						style: {
							padding: '1rem 2rem',
							color: '#222',
							width: 'max-content',
							height: 'max-content',
							'border-radius': '0.5rem',
							'font-size': '1rem',
							translate: '50% 50%',

							background: 'inherit'
						},
						specificity: 0
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'primary',
							'@builtin-btn-tone': 'neutral',
							'@builtin-darkmode': 'light'
						},
						style: {
							background: '#EEE',
							color: '#222'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'neutral',
							'@builtin-darkmode': 'light'
						},
						style: {
							border: '2px solid #222',
							color: '#222'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'destructive',
							'@builtin-darkmode': 'light'
						},
						style: {
							border: '2px solid #E33',
							color: '#E33'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'confirmative',
							'@builtin-darkmode': 'light'
						},
						style: {
							border: '2px solid #3E3',
							color: '#3E3'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'primary',
							'@builtin-btn-tone': 'neutral',
							'@builtin-darkmode': 'dark'
						},
						style: {
							background: '#222',
							color: '#EEE'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'neutral',
							'@builtin-darkmode': 'dark'
						},
						style: {
							border: '2px solid #EEE',
							color: '#EEE'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'destructive',
							'@builtin-darkmode': 'dark'
						},
						style: {
							border: '2px solid #E22',
							color: '#E22'
						},
						specificity: 1
					},

					{
						axes: {
							'@builtin-btn-emphasis': 'secondary',
							'@builtin-btn-tone': 'confirmative',
							'@builtin-darkmode': 'dark'
						},
						style: {
							border: '2px solid #2E2',
							color: '#2E2'
						},
						specificity: 1
					}
				]
			}
		},
		{
			name: 'Laptop',
			discriminator: 1,
			sets: {
				axisRank: [builtinAxes[0]],
				layers: [
					{
						axes: {},
						style: {
							width: '1366px',
							height: '768px',
							'overflow-y': 'auto'
						},
						specificity: 0
					},
					{
						axes: { '@builtin-darkmode': 'light' },
						style: {
							background: '#FFF'
						},
						specificity: 1
					},
					{
						axes: { '@builtin-darkmode': 'dark' },
						style: {
							background: '#333'
						},
						specificity: 1
					}
				]
			}
		},
		{
			name: 'Page Section',
			discriminator: 1,
			sets: {
				axisRank: [builtinAxes[0]],
				layers: [
					{
						axes: {},
						style: {
							width: '100%',
							height: '20rem',
							'overflow-y': 'auto',
							border: '2px solid #111'
						},
						specificity: 0
					},
					{
						axes: { '@builtin-darkmode': 'light' },
						style: {
							background: '#FFF'
						},
						specificity: 1
					},
					{
						axes: { '@builtin-darkmode': 'dark' },
						style: {
							background: '#333'
						},
						specificity: 2
					},
					{
						axes: { sticky: 'true' },
						style: {
							position: 'sticky',
							top: '0'
						},
						specificity: 3
					}
				]
			}
		}
	])

	let kitViews: ComponentViewRoot[] = $state([
		{
			source_index: 0,
			rootPosition: { x: -300, y: 20 },
			name: 'CTA - Primary',
			params: { '@builtin-darkmode': 'dark', '@builtin-btn-emphasis': 'secondary' },
			discriminator: 1
		},
		{
			source_index: 0,
			rootPosition: { x: 100, y: 20 },
			params: { '@builtin-darkmode': 'light', '@builtin-btn-emphasis': 'secondary' },
			name: 'CTA - Secondary',
			discriminator: 0
		},
		{
			source_index: 1,
			rootPosition: { x: 100, y: 220 },
			params: { '@builtin-darkmode': 'dark' },
			name: 'Responsive Screen',
			discriminator: 1,
			children: [
				{
					source_index: 2,
					params: {
						'@builtin-darkmode': 'light',
						'@builtin-btn-emphasis': 'secondary',
						'@builtin-btn-tone': 'confirmative',
						sticky: 'true'
					},
					name: 'Nav',
					discriminator: 3
				},
				{
					source_index: 2,
					params: {
						'@builtin-darkmode': 'dark',
						'@builtin-btn-emphasis': 'secondary',
						'@builtin-btn-tone': 'confirmative'
					},
					name: 'Hero',
					discriminator: 3
				},
				{
					source_index: 2,
					params: {
						'@builtin-darkmode': 'dark',
						'@builtin-btn-emphasis': 'secondary',
						'@builtin-btn-tone': 'confirmative'
					},
					name: 'First section',
					discriminator: 4
				},
				{
					source_index: 2,
					params: {
						'@builtin-darkmode': 'dark',
						'@builtin-btn-emphasis': 'secondary',
						'@builtin-btn-tone': 'confirmative'
					},
					name: 'Second section',
					discriminator: 5
				},
				{
					source_index: 2,
					params: {
						'@builtin-darkmode': 'dark',
						'@builtin-btn-emphasis': 'secondary',
						'@builtin-btn-tone': 'confirmative'
					},
					name: 'Third section',
					discriminator: 6
				}
			]
		}
	])

	const selectedKit: ComponentView | undefined = $derived.by(() => {
		// Recursive helper to find a ComponentView with selected = 'primary'
		function findPrimary(view: ComponentView): ComponentView | null {
			if (view.selected === 'primary') return view

			if (view.children) {
				for (const child of view.children) {
					const found = findPrimary(child)
					if (found) return found
				}
			}

			return null
		}

		for (const view of kitViews) {
			const found = findPrimary(view)
			if (found) return found
		}

		return undefined // if nothing found
	})

	import Viewport from './editor/Viewport.svelte'

	const navContextMenu = [
		{
			name: 'donation',
			displayText: 'Donate',
			icon: 'fa-solid fa-gift',
			onClick: () => ({
				link: 'https://ko-fi.com/yorqat',
				tab: '_blank'
			})
		}
	]

	import KitsPanel from './editor/panels/Components.svelte'
	import StylesPanel from './editor/panels/Styles.svelte'
	import TokensPanel from './editor/panels/Variables.svelte'
	import AxesPanel from './editor/panels/Axes.svelte'
	import ProjectPanel from './editor/panels/Project.svelte'
	import { onMount } from 'svelte'
	import colours from './libraries/colours'
</script>

<svelte:head>
	<title>KIT•10 Scale your UX</title>
	<meta
		name="description"
		content="Axes-based data-driven UI + UX editor that actually scales with seemless developer handoff"
	/>

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
	/>
</svelte:head>

<div id="ui-kitten" data-prefers-color-scheme data-compel-color-scheme={getTheme()}>
	<ContextMenu />
	<div use:contextMenu={navContextMenu} id="nav">
		<heading>
			<a class="branding" href="#s">KIT•1●</a>
		</heading>

		<div class="quick-preferences">
			<div class="pfp">
				<img
					src="https://cdn.discordapp.com/emojis/1184281983791136778.webp?size=96"
					alt="user profile"
				/>
			</div>

			<DarkModeToggle />
		</div>
	</div>

	<Viewport {offsetX} {offsetY} bind:kits bind:kitViews />

	<aside class="management scroll-scheme">
		<!-- <ProjectPanel /> -->
		<KitsPanel bind:kits bind:kitViews {selectedKit} />
		<AxesPanel bind:kits bind:kitViews {selectedKit} />
	</aside>

	<aside class="logical-mapper scroll-scheme"></aside>

	<aside class="configurable scroll-scheme">
		<StylesPanel bind:kits bind:kitViews {selectedKit} />
		<TokensPanel bind:kits bind:kitViews {selectedKit} bind:tokens bind:tokenLibraries />
	</aside>
</div>

<style lang="scss">
	@use '_index' as *;

	$light: (
		bg: '#ddd',
		text: '#3f3a3a',
		text-muted: '#606a78',
		surface: '#f1f1f1',
		surface-alt: '#dedede',

		add-var-bg: '#f1f1f1',
		add-var-border: 1px solid #dedede,
		add-var-text: '#3f3a3a',

		diamond-border--tracked: '#3f3a3a',
		diamond-border--tracked--empty: '#3f3a3a',
		diamond-color--tracked--empty: '#f1f1f1',

		diamond-border--untracked: '#3f3a3a',
		diamond-color--untracked: '#dedede',

		panel-border: 'lightgray'
	);

	$dark: (
		bg: '#111',
		surface: '#1f1f1f',
		surface-alt: '#2f2f2f',
		text: '#dcdcdc',

		add-var-bg: '#111',
		add-var-border: 1px solid #000,
		add-var-text: '#f1f1f1',

		panel-border: '#333',

		diamond-border--tracked: '#000',
		diamond-color--tracked--empty: '#f1f1f1',
		diamond-border--tracked--empty: '#2f2f2f',

		diamond-border--untracked: '#f1f1f1',
		diamond-color--untracked: '#3f3a3a'
	);

	@include theming-declare-schemes-basic($light, $dark);
	@include theming-impose-schemes-basic();
	@include theming-impose-scroll-scheme();

	#ui-kitten {
		cursor:
			url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>\
<path fill='lightskyblue' stroke='%23000' stroke-width='1' \
d='M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z'/>\
</svg>")
				4 4,
			auto;

		.pfp {
			height: $x-font-size-2xl;
			width: $x-font-size-2xl;

			img {
				border-radius: 50%;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		@include layout-viewport-full-height-lockdown();
		/*
    :not(.canvas-container) {
      transition: 
      background 1500ms ease-out,
      color 1200ms ease-out,
      border-color 800ms ease-out,
      ;
    }
    */
		color: var(--color-text);

		@include layout-respond-max('lg') {
			display: grid;
			grid-template-columns: 3fr 4fr;
			grid-template-rows: max-content 3fr 3fr;

			.logical-mapper {
				display: none;
			}
		}

		@include layout-respond('lg') {
			display: grid;
			grid-template-columns: 1.5fr 3fr 1.6fr;
			grid-template-rows: 1fr 16fr $x-space-md;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
			// padding: $x-space-sm;
		}

		@include layout-respond('xl') {
			grid-template-columns: 1fr 3fr 1.2fr;
		}
	}

	#nav {
		background-color: var(--color-surface);

		display: flex;
		align-items: center;
		justify-content: space-between;

		.branding {
			@include fonts-stack('Satoshi-Bold', sans);
			@include fonts-alternate-style();
			font-size: $x-font-size-lg;
			letter-spacing: 1px;

			@include layout-respond-max('lg') {
				font-size: $x-font-size-md;
				padding-left: $x-font-size-md;
			}
		}

		.quick-preferences {
			display: flex;
			align-items: center;
			gap: $x-space-sm;
		}

		@include layout-respond-max('lg') {
			grid-area: 1 / 1 / 2 / 3;
			padding: $x-space-sm;
		}

		@include layout-respond('lg') {
			grid-area: 1 / 1 / 2 / 4;
			padding: $x-space-sm $x-space-lg;
		}
	}

	.logical-mapper,
	.management,
	.configurable {
		overflow-y: auto;
		scrollbar-width: none;
		background-color: var(--color-bg);
		border-top: 2px solid var(--color-bg);
		@include fonts-stack('Satoshi-Regular', sans);
		@include fonts-alternate-style();
		letter-spacing: 0.5px;
	}

	.management,
	.configurable {
		@include layout-flex-column();
		@include layout-respond('lg') {
			padding: $x-space-sm;
			gap: $x-space-xs;
		}

		@include layout-respond-max('lg') {
			padding: $x-space-xs;
			padding-bottom: $x-space-md;

			gap: calc($x-space-xs / 2);
		}
	}

	.management {
		padding-right: calc($x-space-xs / 4);
	}
	.configurable {
		padding-left: calc($x-space-xs / 4);
	}

	.configurable {
		overflow-y: scroll;
	}

	.logical-mapper {
		@include layout-respond('lg') {
			grid-area: 3 / 2 / 3 / 3;
		}

		border-top: 2px solid var(--color-bg);
		border-left: 2px solid var(--color-bg);
		border-right: 2px solid var(--color-bg);
	}

	.management {
		@include layout-respond-max('lg') {
			grid-area: 3 / 1 / 4 / 2;
		}

		@include layout-respond('lg') {
			grid-area: 2 / 1 / 4 / 2;
		}
	}

	.configurable {
		@include layout-respond-max('lg') {
			grid-area: 3 / 2 / 4 / 3;
		}

		@include layout-respond('lg') {
			grid-area: 2 / 3 / 4 / 4;
		}
	}

	label {
		@include layout-flex-column();
	}

	.attribute:has(input[type='checkbox']),
	.attribute:has(input[type='text']) {
		flex-direction: row;
		justify-content: space-between;
	}
</style>
