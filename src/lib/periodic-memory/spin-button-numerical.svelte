<script lang="ts">
	import './fonts.css'
	import './colors.css'
	import './button.css'

	import { type Writable } from 'svelte/store'

	type SpinButtonDisplayProps = {
		value: Writable<number>
		steps?: number
		subtitle: Writable<string>
		max?: number
		min?: number
		overflow?: () => boolean
		underflow?: () => boolean
		disabled: boolean
	}

	let {
		value,
		steps = 1,
		subtitle,
		max,
		min,
		overflow = () => false,
		underflow = () => false,
		disabled
	}: SpinButtonDisplayProps = $props()

	function increment() {
		$value = $value + (max ? ($value >= max ? 0 : steps) : steps)
	}

	function decrement() {
		$value = $value - (min ? steps : $value <= min ? 0 : steps)
	}
</script>

<div class="spinbutton" aria-disabled={disabled}>
	<div class="spinbutton__display">
		<h1>{$value}</h1>
		<p>{subtitle}</p>
	</div>

	<div
		role="spinbutton"
		class="spinbutton__buttons"
		aria-valuenow={value}
		aria-valuemin="0"
		aria-valuemax="59"
		aria-label="Item count"
	>
		<input
			class="spinbutton__button"
			type="button"
			onclick={increment}
			aria-label="Increase value"
			value="▲"
			{disabled}
		/>
		<input
			class="spinbutton__button"
			type="button"
			onclick={decrement}
			aria-label="Decrease value"
			value="▼"
			{disabled}
		/>
	</div>
</div>

<style>
	.spinbutton {
		display: flex;
		align-items: center;
		gap: 1rem;

		position: relative;
	}

	.spinbutton[aria-disabled='true'] {
		color: #ccc;
	}

	.spinbutton__buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		color: var(--primary);
	}

	.spinbutton__display h1 {
		font-size: 3rem;
		line-height: 0;
		text-align: center;
		font-family: 'Anonymous Pro', monospace;
		width: 2ch;
		top: 0.5rem;
		position: relative;
	}

	.spinbutton__display p {
		position: relative;

		text-align: center;
	}

	button {
		border-radius: 4px;
	}

	button:active {
		color: white;
		background: var(--primary);
	}
</style>
