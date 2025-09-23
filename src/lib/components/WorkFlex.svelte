<script lang="ts">
	import type { Snippet } from 'svelte'

	type WorkFlexProps = {
		site: Snippet
		brandIdentity: Snippet
		designOutline: Snippet
	}

	const _aBTestingMode = $state(false)

	const { site, brandIdentity, designOutline }: WorkFlexProps = $props()
</script>

<div id="work-flex" class="base">
	<div id="radio" class="card">
		<label for="work-flex-panel-site">Site</label>
		<input
			tabindex="0"
			type="radio"
			id="work-flex-panel-site"
			class="work-flex-panel"
			name="work-flex-panel"
			value="site"
			checked
		/>

		<label for="work-flex-panel-brand-identity">Brand Identity</label>
		<input
			tabindex="0"
			type="radio"
			id="work-flex-panel-brand-identity"
			class="work-flex-panel"
			name="work-flex-panel"
			value="brand-identity"
		/>

		<label for="work-flex-panel-design-outline">Design Outline</label>
		<input
			tabindex="0"
			type="radio"
			id="work-flex-panel-design-outline"
			class="work-flex-panel"
			name="work-flex-panel"
			value="design-outline"
		/>
	</div>

	<div class="work-flex-content scroll-scheme" id="site">
		{@render site()}
	</div>

	<div class="work-flex-content scroll-scheme" id="brand-identity">
		{@render brandIdentity()}
	</div>

	<div class="work-flex-content scroll-scheme" id="design-outline">
		{@render designOutline()}
	</div>
</div>

<style lang="scss" global>
	@use '_index' as *;

	#radio {
		position: fixed;
		display: flex;
		flex-direction: column;

		--top: 20vh;
		--left: 5vw;

		bottom: var(--top);
		left: var(--left);
	}

	#work-flex {
		$panels: 3;
		$vw-width: 100vw;

		overflow-x: hidden;

		display: flex;
		width: calc($vw-width * $panels);
		position: fixed;

		@include a11y-prefers-reduced-motion() {
			--duration: 180ms;

			--transition: translate var(--duration) ease-in-out;
			transition: var(--transition);

			#radio {
				transition:
					top var(--duration) ease-in-out,
					left var(--duration) ease-in-out,
					bottom var(--duration) ease-in-out,
					right var(--duration) ease-in-out;
			}
		}

		.work-flex-content {
			overflow-y: auto;
			flex-basis: $vw-width;
			flex-grow: 0;

			@include layout-viewport-full-height();
			@include layout-viewport-full-height-capped();
		}

		&:has(input[type='radio'].work-flex-panel[value='site']:checked) {
			translate: 0;
		}

		&:has(input[type='radio'].work-flex-panel[value='brand-identity']:checked) {
			translate: calc($vw-width * -1);

			#radio {
				left: calc(var(--left) + $vw-width * 1);
			}
		}

		&:has(input[type='radio'].work-flex-panel[value='design-outline']:checked) {
			translate: calc($vw-width * -2);

			#radio {
				left: calc(var(--left) + $vw-width * 2);
			}
		}
	}
</style>
