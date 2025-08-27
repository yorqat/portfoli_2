<script lang="ts">
	type MarqueeProps = {
		text: string
		separator?: string
    magnitude?: number
	}

	const { text, separator = ' ', magnitude = 1 }: MarqueeProps = $props()
</script>

{#snippet TrackContent(text: string, separator: string)}
	<span>{text} {separator} </span>
{/snippet}

<div class="marquee">
	<div class="track">
  {#each Array(magnitude * 4) as _}
		{@render TrackContent(text, separator)}
  {/each}
	</div>
</div>

<style>
.marquee {
  display: flex;
  white-space: nowrap;
  overflow: hidden;

  width: 40rem;
  height: max-content;
  background: black;
}

.track {
  color: white;
  font-size: 8rem;
  flex-shrink: 0;
  padding: 0 1rem;
  font: bold 2rem sans-serif;
  text-transform: uppercase;
  animation: scroll 10s linear infinite;
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
