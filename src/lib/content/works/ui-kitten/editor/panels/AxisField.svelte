<script lang="ts">
	import type { AxisDefinition } from '../../axesBuiltIn'
	import type { ComponentView, ComponentFlat } from '../Component.svelte'

	type AxisFieldProps = {
		axis: AxisDefinition

		focused: boolean
		ticked: boolean

		kits: ComponentFlat[]
		kitViews: ComponentView[]
	}

	const {
		axis,
		focused,
		ticked,
		kits = $bindable(),
		kitViews = $bindable()
	}: AxisFieldProps = $props()
</script>

{#snippet axisField(axis: AxisDefinition, variant: string)}
	<div class="axis-field">
		<!-- Activated axis variant -->
		<label title={axis.description}>
			<span class="tracker__element__label">{variant}</span>
			<input class="tracker__element__input" type="radio" name={axis.id} />
		</label>

		<!-- Layer of axis variant -->
		<button
			class="axis-tracker"
			class:focused
			class:ticked
			style="--axis-tracker-color: #000"
			disabled={!focused}
			aria-label="Pipette Axes Params"
		>
			<i class="fa-solid fa-diamond"></i>
		</button>
	</div>
{/snippet}

<details class="axis">
	<summary class="axis__name">
		<h3>
			{axis.name}
		</h3>
	</summary>

	<ol class="axis__variants">
		{#each axis.variants as element, i}
			<li>
				{@render axisField(axis, element.name)}
			</li>
		{/each}
	</ol>
</details>

<style lang="scss">
	.axis {
		&__name {
		}

		&__variants {
		}
	}

	.axis-field {
	}
</style>
