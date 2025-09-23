<script lang="ts">
	type MarqueeProps = {
		text: string
		separator?: string
		magnitude?: number
		duration?: string
	}

	const { text, separator = ' ', magnitude = 1, duration = '10s' }: MarqueeProps = $props()
</script>

{#snippet TrackContent(text: string, separator: string)}
	<span aria-hidden="true">{text} {separator} </span>
{/snippet}

<div class="marquee" style="--duration: {duration}" aria-label={text}>
	<div class="track">
		{#each Array(magnitude * 4) as _}
			{@render TrackContent(text, separator)}
		{/each}
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	:global([data-compel-reduced-motion='reduce'] .marquee) {
		animation-play-state: paused;
	}

	.marquee {
		display: flex;
		white-space: nowrap;
		overflow: hidden;

		height: max-content;
		background: inherit;
		overflow-x: hidden;
	}

	.track {
		color: var(--color-text-muted);
		flex-shrink: 0;
		padding: 0 1rem;

		@include fonts-stack('Satoshi-Bold', sans-serif);
		@include fonts-alternate-style();

		animation: scroll var(--duration) linear infinite;

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
