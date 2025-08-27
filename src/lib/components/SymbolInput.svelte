<script lang="ts">
	import type { Snippet } from 'svelte'

	type SymbolInputProps = {
		label: string
		input: Snippet
	}

	const { label, input }: SymbolInputProps = $props()
</script>

<div class="symbol-input">
	<label>
		{label}
		{@render input()}
	</label>
</div>

<style lang="scss">
	.symbol-input {
		width: 100%;
		height: 100%;
	}
</style>
