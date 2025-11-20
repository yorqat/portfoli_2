<script lang="ts">
	import { type AxesSet } from '../../cascadeAxesMap'

	type AxisTrackerProps = {
		axesSet?: AxesSet
	}

type HSV = { h: number; s: number; v: number };

export const stringSetToHSV = (() => {
  const cache = new Map<string, HSV>();

  const hash = (str: string): number => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 131 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  };

  return function (parts: string[]): HSV {
    // Normalize + canonicalize
    const cleaned = Array.from(new Set(
      parts
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    )).sort();

    const key = cleaned.join(";"); // canonical memo key

    if (cache.has(key)) return cache.get(key)!;

    // Hash whole set for hue
    const hWhole = hash(key);

    // Hash each element for value variation
    let elementHashTotal = 0;
    for (const p of cleaned) elementHashTotal += hash(p);

    const len = cleaned.length;

    // Saturation: specificity-based (smooth 50–100)
    const s = 50 + Math.tanh(len / 3) * 50;

    // Value: 40–100 based on hashed composition
    const v = 60 + ((elementHashTotal % 1000) / 1000) * 40;

    // Hue: 0–360
    const h = hWhole % 360;

    const result = { h, s, v };
    cache.set(key, result);
    return result;
  };
})();


	const { axesSet = $bindable({ cat: '1', dogger: '11', cutie: '99', dino: '43' }) }: AxisTrackerProps = $props()

  const color = $derived.by(() => {
    const hsv = stringSetToHSV(Object.keys(axesSet))
    return `hsl(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
  })
</script>

<button
	class="axis-tracker"
	title={JSON.stringify(Object.keys(axesSet).sort().join(';'), null, 2)}
	class:ticked={Object.keys(axesSet).length > 0}
  style="--color: {color}"
  aria-label="Pipette Axes Params"
>
	<i class="fa-solid fa-diamond"></i>
</button>

<style lang="scss">
	@use '_index' as *;

	button {
		all: unset;
	}

	.axis-tracker {
		background: inherit;
		font-size: $x-font-size-lg;
    color: var(--color);
		-webkit-text-stroke-width: 2.5px;
		-webkit-text-stroke-color: black;
	}
</style>
