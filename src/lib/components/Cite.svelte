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
	{#if reference.url}
		<a
			class="cite"
			href={reference.url}
			title={reference.note}
			target="_blank"
			rel="noreferrer noopener"
		>
			[{reference.label}]{#if reference.note}<span class="cite__note">{reference.note}</span
				>{/if}</a
		>
	{:else}
		<span class="cite">[{reference.label}]</span>
	{/if}
{/if}

<style lang="scss">
	@use '_index' as *;

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

	.cite__note {
		@include a11y-visually-hidden();
	}
</style>
