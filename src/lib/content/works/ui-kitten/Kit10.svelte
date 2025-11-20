<script lang="ts">
	import ContextMenu from '$lib/content/works/ui-kitten/editor/ContextMenu.svelte'

	import { type Writable, writable, get } from 'svelte/store'

	import { getTheme } from '$lib/theming'
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte'
	import { contextMenu } from '$lib/content/works/ui-kitten/editor/contextMenu'
	import type {
		ComponentView,
		ComponentFlat
	} from '$lib/content/works/ui-kitten/editor/Component.svelte'

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

		selectFirstKit()
	})

	import { type TokenLibrary, type Token } from './editor/panels/Variables.svelte'

	let tokens: Token[] = $state([
		{
			name: 'x-space-xl',
			displayName: 'Where',
			value: '21rem'
		},
		{
			name: 'x-space-xl',
			displayName: 'Nada',
			value: { resolve: 'basic-3-scale/x-space-4' }
		},
		{
			name: 'x-space-xl',
			displayName: 'Space LG',
			value: { resolve: 'basic-2-scale/x-space-4' }
		},
		{
			name: 'color-primary',
			displayName: 'Primary',
			value: { resolve: 'basic-colours/maroon' }
		},
		{
			name: 'color-secondary',
			displayName: 'Secondary',
			value: { resolve: 'basic-colours/alice-blue' }
		}
	])

	let tokenLibraries: TokenLibrary = $state({
		'basic-colours': [
			{
				name: 'alice-blue',
				displayName: 'Alice Blue',
				value: 'oklab(97.12% -0.00509 -0.00524)'
			},
			{
				name: 'maroon',
				displayName: 'Maroon',
				value: 'oklab(38% 0.15 0.03)'
			}
		],
		'basic-2-scale': [
			{
				name: 'x-space-1',
				displayName: 'Space 1',
				value: '1rem'
			},
			{
				name: 'x-space-2',
				displayName: 'Space 2',
				value: '1.4rem'
			},
			{
				name: 'x-space-3',
				displayName: 'Space 3',
				value: '1.6rem'
			},
			{
				name: 'x-space-4',
				displayName: 'Space 4',
				value: '2rem'
			}
		]
	})

	let kits: ComponentFlat[] = $state([
		{
			name: 'Button',
			sets: { layers: [], axisRank: [] }
		},
		{
			name: 'Shadow',
			sets: { layers: [], axisRank: [] }
		},
		{
			name: 'Throbber (Spinner)',
			sets: { layers: [], axisRank: [] }
		},
		{
			name: 'Pill Toggle',
			sets: { layers: [], axisRank: [] }
		}
	])

	let kitViews: ComponentView[] = $state([
		{
			source_index: 0,
			rootPosition: { x: -300, y: 20 },
			params: {},
			children: [
				{
					source_index: 1,
					params: {}
				}
			]
		},
		{
			rootPosition: { x: 0, y: 20 },
			source_index: 2,
			params: {}
		},
		{
			rootPosition: { x: 200, y: 20 },
			source_index: 3,
			params: {}
		}
	])

	const selectFirstKit = () => {
		const first = kitViews.at(0)
		if (first) {
			first.selected = 'primary'
		}
	}

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
			onclick: () => {
				window.open('https://https://ko-fi.com/yorqat', '_blank')
			}
		}
	]

	import KitsPanel from './editor/panels/Components.svelte'
	import StylesPanel from './editor/panels/Styles.svelte'
	import TokensPanel from './editor/panels/Variables.svelte'
	import AxesPanel from './editor/panels/Axes.svelte'
	import ProjectPanel from './editor/panels/Project.svelte'
</script>

<svelte:head>
	<title>UI Kitten for SCSS insanity</title>
	<meta
		name="description"
		content="Perfect Kit generator for bilingual developers who also make designs that have finally lost their minds over hellish designer to developer handoffs"
	/>

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
	/>
</svelte:head>

<div id="ui-kitten" data-prefers-color-scheme data-compel-color-scheme={getTheme()}>
	<ContextMenu />
	<div use:contextMenu={navContextMenu} id="nav">
		<heading>
			<a class="branding" href="#s">KIT•1●</a>
		</heading>

		<div class="quick-preferences">
			<DarkModeToggle />
		</div>
	</div>

	<Viewport {offsetX} {offsetY} bind:kits bind:kitViews />

	<aside class="management scroll-scheme">
		<ProjectPanel />
		<KitsPanel bind:kits bind:kitViews />
		<TokensPanel bind:tokens bind:tokenLibraries />
	</aside>

	<aside class="logical-mapper scroll-scheme"></aside>

	<aside class="configurable scroll-scheme">
		<StylesPanel bind:kitViews {selectedKit} />
		<AxesPanel bind:kits bind:kitViews {selectedKit} />
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

		panel-border: 'lightgray'
	);

	$dark: (
		bg: '#111',
		surface: '#1f1f1f',
		surface-alt: '#2f2f2f',
		text: '#dcdcdc',

		add-var-bg: '#111',
		add-var-border: 1px solid #111,
		add-var-text: '#f1f1f1',

		panel-border: '#333'
	);

	@include theming-declare-schemes-basic($light, $dark);
	@include theming-impose-schemes-basic();
	@include theming-impose-scroll-scheme();

	#ui-kitten {
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
			grid-template-columns: 1fr 1fr;
			grid-template-rows: max-content 3fr 2fr;

			.logical-mapper {
				display: none;
			}
		}

		@include layout-respond('lg') {
			display: grid;
			grid-template-columns: 1fr 3fr 1.1fr;
			grid-template-rows: 1fr 16fr $x-space-md;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
			// padding: $x-space-sm;
		}
	}

	#nav {
		background-color: var(--color-surface);
		padding: $x-space-sm $x-space-lg;

		display: flex;
		justify-content: space-between;

		.branding {
			@include fonts-stack('Satoshi-Bold', sans);
			@include fonts-alternate-style();
			font-size: $x-font-size-lg;
			letter-spacing: 1px;
		}

		.quick-preferences {
			display: flex;
			align-items: center;
		}
		@include layout-respond-max('lg') {
			grid-area: 1 / 1 / 2 / 3;
		}

		@include layout-respond('lg') {
			grid-area: 1 / 1 / 2 / 4;
		}
	}

	.logical-mapper,
	.management,
	.configurable {
		overflow-y: auto;
		scrollbar-width: thin;
		background-color: var(--color-surface);
		border-top: 2px solid var(--color-bg);
	}

	.management,
	.configurable {
		padding: $x-space-md $x-space-sm;
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
		@include fonts-stack('Satoshi-Light', sans);
		// @include fonts-alternate-style();
		letter-spacing: 1px;

		gap: $x-space-md;

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
