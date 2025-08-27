<script lang="ts">
	import ToggleButton from './toggle-button.svelte'
	import ToggleButtonSelect from './toggle-button-selected.svelte'
	import Button from './button.svelte'
	import RangeSlider from './range_slider.svelte'
	import Collapsible from './collapsible.svelte'
	import SpinButtonNumeric from './spin-button-numerical.svelte'

	import { writable, type Writable, type State } from 'svelte/store'
	const starting_atomic_number = writable(1)
	const last_atomic_number = writable(118)

	let sequenceSelected = writable(0)

	let active = {
		symbol: writable(true),
		number: writable(true),
		element: writable(false)
	}

	let enableTimeLimit = $state(true)
	let minute = writable(0)
	let seconds = writable(0)
</script>

<div id="quiz-options">
	<Collapsible>
		<header slot="header">
			<h1>Periodic Memory</h1>
			<p>for your element cramming needs</p>
			<div class="ui-util"></div>
		</header>

		<div slot="content" class="options">
			<section>
				<h2>Sequence options</h2>
				<ToggleButtonSelect choices={['Sequential', 'Random']} selected={sequenceSelected} />
			</section>

			<section>
				<h2>Active properties</h2>
				<div class="choices">
					<ToggleButton label="Symbol" pressed={active.symbol} />
					<ToggleButton label="Number" pressed={active.number} />
					<ToggleButton label="Element" pressed={active.element} />
				</div>
			</section>

			<section>
				<h2>Atomic range</h2>
				<div class="range">
					<!--
			<RangeSlider {starting_atomic_number} {last_atomic_number} />
      -->
				</div>
				<p class="hint">Hydrogen (<strong>1</strong>) to Oganesson (<strong>118</strong>)</p>
			</section>

			<section>
				<label class="checkbox">
					<input type="checkbox" bind:checked={enableTimeLimit} />
					<h2>Time limit</h2>
				</label>
				<div class="timer">
					<SpinButtonNumeric
						value={minute}
						min={0}
						max={60}
						disabled={!enableTimeLimit}
						subtitle="min"
					/>
					<SpinButtonNumeric
						value={seconds}
						min={0}
						max={55}
						disabled={!enableTimeLimit}
						subtitle="sec"
						steps={5}
						overflow={() => {
							if ($minute < 0) {
								$minute += 1
								return true
							}
							return false
						}}
						underflow={() => {
							if ($minute > 0) {
								$minute -= 1
								return true
							}
							return false
						}}
					/>
				</div>
			</section>

			<section>
				<Button label="Start" />
				<div class="hint">
					<p>Best time: 28 elements</p>
					<p>(symbols + numbers)</p>
					<p>per minute</p>
				</div>
			</section>
		</div>
	</Collapsible>
</div>

<style lang="scss">
	@use 'periodic-memory/fonts' as f;

	@use '_variables.scss' as v;

	.ui-util {
		display: flex;
	}

	#quiz-options {
		font-family: f.$monospace;
		view-transition-name: periodic-memory;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		font-size: 1.7rem;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: 400;
	}

	.hint {
		font-size: 0.9rem;
		letter-spacing: 0.1rem;
		font-weight: 800;
		line-height: 0.5rem;
		/*
    text-transform: uppercase;
    */
	}

	.checkbox {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.checkbox input[type='checkbox'] {
		all: unset;
		height: 1rem;
		aspect-ratio: 1;
		border: 4px solid var(--primary);
		border-radius: 4px;

		position: relative;
	}

	.checkbox input[type='checkbox']:checked::after {
		background: var(--secondary);
		background: green;

		background: v.$green-500;
		top: -1.8rem;
		left: -0.5rem;
		height: 3rem;
		aspect-ratio: 1;
		position: absolute;

		content: '';
		clip-path: polygon(29% 77%, 73% 49%, 31% 100%, 5% 66%);
	}

	.choices {
		display: flex;
		gap: 1rem;
	}

	.timer {
		display: flex;
		gap: 1rem;
		justify-content: space-around;
	}
</style>
