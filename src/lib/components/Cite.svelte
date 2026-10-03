<script lang="ts">
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
</script>

<a class="cite" href="#ref-{n}" aria-label="Reference {n}"><sub>[{n}]</sub></a>

<style lang="scss">
	.cite {
		text-decoration: none;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;

		sub {
			font-size: 0.7em;
			line-height: 0;
		}

		&:hover,
		&:focus-visible {
			text-decoration: underline;
		}
	}
</style>
