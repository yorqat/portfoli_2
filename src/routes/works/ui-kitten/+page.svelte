<script lang="ts">
	const {} = $props()

	import { getTheme } from '$lib/theming'
	import { makeKit } from './attributes'
	import { createVariableLib } from './variables'

	let style = $state('')

	let kits = makeKit()

	$effect(() => {
		let variableKit = createVariableLib()
	})
</script>

<svelte:head>
	<title>UI Kitten for SCSS insanity</title>
	<meta
		name="description"
		content="Perfect Kit generator for bilingual developers who also make designs that have finally lost their minds over hellish designer to developer handoffs"
	/>
</svelte:head>

{#snippet category(
	name: string,
	tooltip: string = "If you're reading this the dumbass self-proclaimed UX developer forgot define a tooltip on this one. Mail them a rock"
)}
	<h3 title={tooltip}>{name}</h3>
	<hr />
{/snippet}

<div class="base" id="ui-kitten" data-prefers-color-scheme data-compels-color-scheme={getTheme()}>
	{@render category('Rendered', 'scss and html forms')}

	<button class="no-default" {style}> Content </button>

	<label class="attribute-compiled">
		Raw style
		<textarea bind:value={style}></textarea>
	</label>

	{@render category('States', 'Control kit state')}

	<label class="attribute">
		Hovered
		<input type="checkbox" />
	</label>

	{@render category('Accessibility', 'Check for semantic correctness')}

	{@render category('Responsiveness', 'Device specification awareness')}

	<label class="attribute">
		Padding
		<input type="text" />
	</label>

	<label class="attribute">
		Font size
		<input type="text" />
	</label>
</div>

<style lang="scss">
	@use '_index' as *;

	$light: ();
	$dark: (
		bg: '#111'
	);

	@include theming-declare-schemes-basic($light, $dark);
	@include theming-impose-schemes-basic();

	#ui-kitten {
		@include layout-flex-column();
		@include layout-viewport-full-height-lockdown();
	}

	label {
		@include layout-flex-column();
	}

	.attribute:has(input[type='checkbox']),
	.attribute:has(input[type='text']) {
		flex-direction: row;
		gap: 2rem;
	}
</style>
