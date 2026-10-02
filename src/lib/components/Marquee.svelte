<script lang="ts">
	type MarqueeProps = {
		text: string
		separator?: string
		magnitude?: number
		duration?: string
	}

	const { text, separator = ' ', magnitude = 1, duration = '10s' }: MarqueeProps = $props()

	const copies = $derived(Math.max(2, Math.ceil(magnitude * 4)))
</script>

{#snippet TrackContent(text: string, separator: string)}
	<span>{text} {separator}</span>
{/snippet}

<div class="marquee" style="--duration: {duration}">
	<p class="marquee__sr-only">{text}</p>
	<div class="track" aria-hidden="true">
		{#each Array(copies) as _}
			{@render TrackContent(text, separator)}
		{/each}
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	:global([data-compel-reduced-motion='reduce']) .track {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation-play-state: paused;
		}
	}

	.marquee {
		display: flex;
		white-space: nowrap;
		overflow: hidden;

		height: max-content;
		background: inherit;
		overflow-x: hidden;
	}

	.marquee__sr-only {
		@include a11y-visually-hidden();
	}

	.track {
		color: var(--color-text-muted);
		flex-shrink: 0;

		@include fonts-stack('Satoshi-Bold', sans);
		@include fonts-alternate-style();

		animation: scroll var(--duration) linear infinite;

		> span {
			padding-inline: 0.5rem;
		}

		@include layout-respond-max('md') {
			font-size: $x-font-size-xl;
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-2xl;
		}

		@include layout-respond('2xl') {
			font-size: $x-font-size-4xl;
		}
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
