<script>
	import NavBar from '$lib/NavBar.svelte'

	import { onNavigate } from '$app/navigation'
	import { getTheme } from '$lib/theming'

	const { children } = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div id="blogs" data-prefers-color-scheme data-compel-color-scheme={getTheme()}>
	<div id="nav">
		<NavBar />
	</div>
	<div class="scroll-scheme" id="content">
		{@render children()}
	</div>
</div>

<style lang="scss" global>
	@use '_index' as *;
	@use 'blogs' as *;

	$custom-light-theme: (
		bg: $x-gray-100
	);
	$custom-dark-theme: ();

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	@include theming-impose-schemes-basic();

	#blogs {
		background: var(--color-bg);
		@include layout-flex-column();
		@include layout-viewport-full-height-lockdown();

		// font-family: 'Fira Code', san-serif;

		> *:nth-child(2) {
			flex-grow: 1;
		}
	}

	.blog {
		display: grid;
	}

	#content {
		overflow-y: scroll;
	}

	#nav {
		view-transition-name: backdrop-nav;
		background: var(--color-surface);
		box-shadow: $x-bs-sketch-falloff;
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
