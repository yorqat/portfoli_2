<script lang="ts">
	import Papa from 'papaparse'
	import raw from '$lib/periodic-table.csv?raw'

	import RangeSlider from '$lib/periodic-memory/range_slider.svelte'
	import QuizOptions from '$lib/periodic-memory/quiz-options.svelte'

	const result = Papa.parse(raw, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true
	})

	const elements = result.data

	import PeriodicTable from '$lib/periodic-memory/periodic-table.svelte'

	const legendItems = [
		{ class: 'alkali_metal', label: 'Alkali Metal' },
		{ class: 'alkaline_earth_metal', label: 'Alkaline Earth Metal' },
		{ class: 'transition_metal', label: 'Transition Metal' },
		{ class: 'post-transition_metal', label: 'Post-Transition Metal' },
		{ class: 'metalloid', label: 'Metalloid' },
		{ class: 'non-metal', label: 'Non-Metal' },
		{ class: 'halogen', label: 'Halogen' },
		{ class: 'noble_gas', label: 'Noble Gas' },
		{ class: 'lanthanide', label: 'Lanthanide' },
		{ class: 'actinide', label: 'Actinide' }
	]

	let displayElement = $state(0)
	let lockedElement = $state(0)

	function onHover(e, atomicNumber: number) {
		let index = atomicNumber - 1
		displayElement = index

		console.log(`display element set to ${index}`)
	}

	// function onClick(e, atomicNumber) {}
</script>

<div class="periodic-reviewer">
	<main class="quiz-options">
		<QuizOptions />
	</main>

	<aside class="periodic-table-container">
		<PeriodicTable {elements} elementEvent={onHover} />

		<div class="legend">
			{#each legendItems as item}
				<div class="legend-item {item.class}">
					<span class="legend-item__label">
						{item.label}
					</span>
				</div>
			{/each}
		</div>

		{#key elements[displayElement].AtomicNumber}
			<div
				class="element-display {elements[displayElement].Symbol.toLowerCase()} {elements[
					displayElement
				].Type.toLowerCase().replace(/\s+/g, '_')} "
			>
				<span class="atomic-symbol">{elements[displayElement].Symbol}</span>
				<span class="atomic-name">{elements[displayElement].Element}</span>
				<span
					class="atomic-number {elements[displayElement].AtomicNumber > 99 ? 'three-digit' : ''}"
					>{elements[displayElement].AtomicNumber}</span
				>
			</div>
		{/key}
	</aside>
</div>

<style lang="scss">
  @use 'style' as *;

	.element-display .atomic-number {
		font-size: 3rem;
		padding: 0.5rem;
		background: white;
		color: var(--bg);
		top: 0;
		left: 0;
		width: 3ch;
		text-align: right;
		aspect-ratio: 1;

		border-radius: 0 0 1rem 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.element-display .atomic-name {
		font-size: 2rem;
		bottom: 0rem;
		left: 0;
		right: 0;
		position: absolute;

		background: white;
		border: 1rem solid var(--bg);
		color: var(--bg);
		text-align: center;
		font-weight: 700;

		border-radius: 1rem;
	}

	.element-display .atomic-symbol {
		font-size: 6rem;
		font-weight: 800;
	}

	.element-display {
		view-transition-name: element-display;
		color: white;
		aspect-ratio: 4 / 3;
		background: var(--bg);
		width: 100%;

		border-radius: 1rem;

		display: grid;
		place-items: center;
		position: relative;
		transition: background 5s;

		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		border-radius: 1rem;
	}

	.periodic-reviewer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;

		background-color: var(--color-primary);
	}

	.periodic-table-container {
		display: grid;
		place-items: center;

		flex-grow: 1;
		gap: 1rem;

		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		border-radius: 1rem;
		padding: 1rem 0.5rem;
	}

	.quiz-options {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;

		flex-grow: 1;
	}

	.quiz-options-sequence {
		display: flex;
		justify-content: space-between;

		gap: 1rem;
	}

	.button-toggle {
		all: unset;
		position: relative;
		top: 0;
		height: 2rem;
		aspect-ratio: 1;
		border-radius: 1rem;

		display: grid;
		place-items: center;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08rem;
		padding: 1rem 1.6rem;

		background: var(--color-primary);
		color: white;

		box-shadow: 0 16px 5px 0px navy;

		transition:
			top 0.1s,
			box-shadow 0.06s;
	}

	.button-toggle:hover {
		background: #7740e8;
	}

	.element {
		all: unset;
		border: 1px solid #eee;
		box-sizing: border-box;
		display: grid;
		place-items: center;

		position: relative;

		&:hover {
			background: #f6f6f6;
		}

		&:focus {
			border: 4px solid #ddd;
		}
	}

	.atomic-element {
		all: unset;
		inset: 0;
	}

	.atomic-number {
		position: absolute;
		left: 0.2rem;
		top: 0.2rem;
	}

	.atomic-symbol {
		font-size: 1rem;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem;
		font-size: 1rem;
	}

	.legend-item {
		font-family: 'Anonymous Pro';
		font-weight: 400;
		background: var(--bg);
		border-radius: 4px;
		color: white;
		padding: 0.5rem;
		flex-grow: 1;
		text-align: center;
	}

	.legend-item__label {
		flex-grow: 1;
	}
</style>
