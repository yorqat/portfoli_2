<script lang="ts">
	import WorkFlex from '$lib/components/WorkFlex.svelte'
	import { type Site } from '$lib/content/works/types'

	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	const { children } = $props()

	const colours: string[] = ['#346653', '#663453', '#533466']

	export const site: Site = {
		class: 'product-concept',
		tags: ['responsive-layout'], // adapts smoothly between sizes
		title: 'Lemin Quench and Exotic fruities product line',
		path: 'lemin-quench'
	}
</script>

<div
	style="display: contents;"
	data-prefers-color-scheme
	data-compels-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compels-reduced-motion={getReducedMotion()}
>
	<WorkFlex>
		{#snippet site()}
			{@render children()}
		{/snippet}

		{#snippet brandIdentity()}
			<div style="display: contents" id="brand-identity">
				<h1>Brand Identity</h1>
				<h2>Lemin Quench</h2>
				<h3>Guidelines</h3>

				<ul>
					<li>
						Lemin Quench Carbonated juice lineup follows an artstyle reminicent of the hit animated
						show `adventure time`.
					</li>

					<li>
						The style follows a curvy, solid lined characters with loose joints and simplified faces
						with eyes separated by big gaps
					</li>

					<li>
						Accompanied by 4 flavours shining the spotlight for products unheard of, creating
						novelty out of a simple reframe
					</li>
				</ul>
				<h3>Colours</h3>

				<ul class="no-default banner" style="display: flex;">
					{#each colours as colour}
						<li
							style="flex-grow: 1; height: 3rem; background-color: {colour}; display: grid; place-items: center;"
						>
							{colour}
						</li>
					{/each}
				</ul>
			</div>
		{/snippet}

		{#snippet designOutline()}
			<h1>Design Outline</h1>
		{/snippet}
	</WorkFlex>
</div>

<style lang="scss" global>
	@use '_index' as *;

	$light: ();
	$dark: (
		bg: #222,
		primary: $x-white,
		primary-hover: $x-gray-200,
		surface-alt: #334466,
		surface: #5588aa
	);

	@include theming-declare-schemes-basic($light, $dark);
	@include theming-impose-schemes-basic();

	#brand-identity > *:not(.banner) {
		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}
</style>
