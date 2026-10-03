<script lang="ts">
	import { references } from '$lib/references'

	interface ReferencesProps {
		/** Narrow the list to the entries a given page actually cites. */
		only?: number[]
	}

	let { only }: ReferencesProps = $props()

	const shown = $derived(
		only ? references.filter((reference) => only.includes(reference.id)) : references
	)
</script>

{#if shown.length}
	<section class="references" aria-labelledby="references-heading">
		<h2 id="references-heading">References</h2>

		<ol>
			{#each shown as reference (reference.id)}
				<li id="ref-{reference.id}">
					<span class="references__marker"><sub>[{reference.id}]</sub></span>
					<span class="references__body">
						<span class="references__label">{reference.label}.</span>
						<span class="references__title">{reference.title}.</span>
						<span class="references__source"
							>{reference.source}{reference.year ? `, ${reference.year}` : ''}.</span
						>
						{#if reference.url}
							<a
								class="references__link"
								href={reference.url}
								target="_blank"
								rel="noreferrer noopener"
							>
								Source
							</a>
						{/if}
						{#if reference.note}
							<span class="references__note">{reference.note}</span>
						{/if}
					</span>
				</li>
			{/each}
		</ol>
	</section>
{/if}

<style lang="scss">
	@use '_index' as *;

	.references {
		margin-block-start: $x-space-lg;

		h2 {
			font-size: $x-font-size-lg;
		}

		ol {
			list-style: none;
			padding: 0;
			display: flex;
			flex-direction: column;
			gap: $x-space-sm;
		}

		li {
			display: flex;
			gap: $x-space-xs;
			font-size: $x-font-size-sm;
			line-height: 140%;
		}
	}

	.references__marker {
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;

		sub {
			font-size: 0.7em;
			line-height: 0;
		}
	}

	.references__body {
		display: block;
	}

	.references__label {
		font-weight: 600;
	}

	.references__note {
		display: block;
		color: var(--color-text-muted);
	}
</style>
