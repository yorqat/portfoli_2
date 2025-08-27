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
		/>

		<label for="work-flex-panel-brand-identity">Brand Identity</label>
		<input
			tabindex="0"
			type="radio"
			id="work-flex-panel-brand-identity"
			class="work-flex-panel"
			name="work-flex-panel"
			value="brand-identity"
			checked
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

	<div class="content scroll-scheme" id="site">
		{@render site()}
	</div>

	<div class="content scroll-scheme" id="brand-identity">
		{@render brandIdentity()}
	</div>

	<div class="content scroll-scheme" id="design-outline">
		{@render designOutline()}
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	#radio {
		position: fixed;
		display: flex;
		flex-direction: column;

		--top: 20vh;
		--left: 20vw;

		top: var(--top);
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
			--transition: translate 400ms ease-in-out;
			transition: var(--transition);

			#radio {
				transition:
					top 400ms ease-in-out,
					left 400ms ease-in-out,
					bottom 400ms ease-in-out,
					right 400ms ease-in-out;
			}
		}

		.content {
			overflow-y: scroll;
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
