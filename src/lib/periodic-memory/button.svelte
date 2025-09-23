<script lang="ts">
	import { type Writable } from 'svelte/store'
	import { goto } from '$app/navigation'

	export let label
</script>

<input
	onclick={() => {
		goto('/works/periodic-memory/quiz')
	}}
	type="button"
	value={label}
/>

<style lang="scss">
	@use 'periodic-memory/fonts';
	@use 'periodic-memory/colors';

	@use '_inputs.scss' as i;

	input {
		all: unset;
		font-family: 'Anonymous Pro', monospace;
		width: 100%;

		padding: 0.6rem 0.2rem;
		padding: 1rem 0.5rem;
		border: 1px solid var(--primary);
		border-radius: 12px;
		box-shadow: 0 2px 2.9px var(--secondary);
		font-size: 1.2rem;
		text-align: center;

		background: var(--primary);
		color: white;

		transition:
			box-shadow 0.2s,
			background 0.1s;

		box-sizing: border-box;
	}

	input:hover {
		box-shadow: 0 -0.5px 3.1px var(--secondary);
	}

	/* tab selected */
	input:focus-visible {
		outline: 2px dashed var(--secondary);
	}

	input:active,
	input.pressed {
		background: var(--secondary);
		box-shadow: 5px 4px 4px var(--secondary) inset;
	}
</style>
