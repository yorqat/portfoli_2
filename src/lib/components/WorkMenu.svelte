<script lang="ts">
	import { getTheme } from '$lib/theming'
</script>

{#snippet Navigation()}
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
{/snippet}

<details id="work-menu" data-prefers-color-scheme data-compel-color-scheme={getTheme()}>
	<summary class="menu-container">
		<div class="menu"></div>
	</summary>

	{@render Navigation()}
</details>

<style lang="scss">
	@use '_index' as *;

	$light: ();
	$dark: ();

	@include theming-declare-schemes-basic($light, $dark);
	@include theming-impose-schemes-basic();

	#work-menu {
		position: fixed;
		transition: width 400ms ease-in;
		overflow: visible;

		right: 1.8rem;
		bottom: 1.2rem;

		width: 5rem;
		height: 5rem;
		aspect-ratio: 1;

		background-color: var(--color-surface);
		z-index: 999;

		border-radius: 8rem;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row-reverse;

		#radio {
			opacity: 0;

			transition: opacity 400ms 800ms ease-in;
		}

		&[open] {
			justify-content: space-around;
			#radio {
				opacity: 1;
			}
		}

		&:hover {
			// background-color: var(--color-surface-alt);
		}

		&::before {
			aspect-ratio: 1;
			height: 2rem;
			content: '';
			position: absolute;
			color: var(--color-failure);
		}
	}

	.menu-container {
		width: 3rem;
		aspect-ratio: 1;
		position: relative;

		list-style: none;
	}

	.menu {
		@include theming-colored-svg-mask('/menu.svg', var(--color-text));
	}
</style>
