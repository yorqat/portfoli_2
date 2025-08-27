<script lang="ts">
	import { writable, type Writable } from 'svelte/store'

	let { choices, selected }: { choices: string[]; selected: Writable<number> } = $props()

	function onclick(i: number) {
		selected.set(i)
	}
</script>

<div class="choices">
	{#each choices as choice, i}
		<!-- Track the selected state reactively -->
		<input
			class="choice"
			type="button"
			class:pressed={$selected === i}
			aria-pressed={$selected === i}
			value={choice}
			on:click={() => onclick(i)}
		/>
	{/each}
</div>

<style>
	.choices {
		display: flex;
		gap: 1rem;
	}

	.choice {
		flex-grow: 1;
	}
</style>
