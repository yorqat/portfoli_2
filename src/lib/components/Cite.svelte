<script lang="ts">
	import { references } from '$lib/references'

	/**
	 * Deliberately a component rather than a snippet: it is used from page
	 * markup and from prose paragraphs, and a component keeps the marker
	 * self-contained so a caller cannot pass the wrong shape of arguments.
	 */
	interface CiteProps {
		/** `id` of the entry in `$lib/references`. */
		n: number
	}

	let { n }: CiteProps = $props()

	const reference = $derived(references.find((candidate) => candidate.id === n))
</script>

{#if reference}
	<a class="cite" href="#ref-{n}">[{reference.label}]</a>
{/if}

<style lang="scss">
	.cite {
		white-space: nowrap;
		text-decoration: none;
		font-size: 0.7em;
		vertical-align: baseline;

		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
	}
</style>
