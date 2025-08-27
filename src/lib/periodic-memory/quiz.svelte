<script lang="ts">
	import Papa from 'papaparse'
	import raw from '$lib/periodic-table.csv?raw'

	const result = Papa.parse(raw, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true
	})

	const elements = result.data

	import PeriodicTable from '$lib/periodic-memory/periodic-table.svelte'

	import ToggleButton from './toggle-button.svelte'
	import ToggleButtonSelect from './toggle-button-selected.svelte'
	import Button from './button.svelte'

	type QuizConfig = {
		isRandom: bool
		timer?: number
		isElementSymbol: bool
		isAtomicNumber: bool
		isElementName: bool
		range: {
			start: number
			end: number
		}
	}

	let { isRandom, timer, isElementSymbol, isAtomicNumber, isElementName, range }: QuizConfig =
		$props()

	type QuizItem = {
		symbols: string[] // 4 items
		atomicNumber: string[] // 4 items
		elementName: string[] // 4 items
	}

	function generateQuizItem(): QuizItem {
		const { start, end } = range
		const pool = elements.filter((el) => el.AtomicNumber >= start && el.AtomicNumber <= end)

		if (pool.length < 4) {
			throw new Error('Not enough elements in the specified range to generate a quiz item.')
		}

		// Pick 4 unique random elements
		const choices = isRandom
			? [...pool].sort(() => 0.5 - Math.random()).slice(0, 4)
			: pool.slice(0, 4)

		return {
			symbols: choices.map((e) => (isElementSymbol ? e.Symbol : '')),
			atomicNumber: choices.map((e) => (isAtomicNumber ? e.AtomicNumber.toString() : '')),
			elementName: choices.map((e) => (isElementName ? e.Element : ''))
		}
	}

	let currentQuizItem = generateQuizItem()

	console.dir(currentQuizItem)

	import { writable } from 'svelte/store'

	let symbolSelected = writable(0)
	let atomicNumberSelected = writable(0)
</script>

<div id="quiz">
	<div class="periodic-table-container">
		<PeriodicTable hideSymbols {elements} />
	</div>
	<h1>Guess the element!</h1>
	{#if isElementSymbol}
		<section>
			<h2>Symbol</h2>
			<ToggleButtonSelect choices={currentQuizItem.symbols} selected={symbolSelected} />
		</section>
	{/if}

	{#if isAtomicNumber}
		<section>
			<h2>Atomic number</h2>
			<ToggleButtonSelect choices={currentQuizItem.atomicNumber} selected={atomicNumberSelected} />
		</section>
	{/if}

	{#if isElementName}
		<section>
			<h2>Element</h2>
			<div class="choices element">
				<ToggleButton label="Hydrogen" />
				<ToggleButton label="Helium" />
				<ToggleButton label="Lithum" />
				<ToggleButton label="Berylium" />
			</div>
		</section>
	{/if}

	<section class="confirm">
		<Button label="Check" />
		<label>
			<input type="checkbox" />
			<span>Auto-confirm on last choice click</span>
		</label>
		<section></section>
	</section>
</div>

<style lang="scss">
	@use 'periodic-memory/fonts' as f;
	@use 'periodic-memory/colors' as c;

	.confirm {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: space-around;
	}

	#quiz {
		font-family: f.$monospace;

		padding: 1rem;
		box-shadow: c.$box-shadow;
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	h1 {
		font-size: 1.7rem;
		color: #888;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: 400;
	}

	.choices {
		display: flex;
		gap: 1rem;
	}

	.choices.element {
		flex-wrap: wrap;
	}

	.checkbox {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	input[type='checkbox'] {
		all: unset;
		height: 0.8rem;
		aspect-ratio: 1;
		border: 4px solid var(--primary);
	}

	.periodic-table-container {
		filter: saturate(0.8);
	}
</style>
