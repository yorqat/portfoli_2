<script lang="ts">
	type SiteClass =
		| 'product-concept' // a clear idea that could be real tomorrow
		| 'ui-mockup' // clean, clickable design preview
		| 'utility-app' // solves a specific, useful problem
		| 'case-study' // shows thought process start to finish
		| 'success-story' // demonstrably increased conversion rates for business

	type ResponsiveTag =
		| 'mobile-ready' // works great on small screens
		| 'desktop-ready' // looks sharp on big screens
		| 'responsive-layout' // adapts smoothly between sizes
		| 'accessible' // thoughtful about different user needs

	type SiteTag = ResponsiveTag[]

	type Site = {
		class: SiteClass
		tags: SiteTag

		title: string
		path: string
	}

	const links: Site[] = [
		{
			title: 'Lemin Quench',
			path: 'lemin-quench',
			class: 'product-concept',
			tags: []
		},
		{
			title: 'UI Kitten',
			path: 'ui-kitten',
			class: 'utility-app',
			tags: []
		},
		{
			title: 'Periodic Memory',
			path: 'periodic-memory',
			class: 'utility-app',
			tags: []
		}
	]
</script>

<h1>Look at my cool projects</h1>

<div>
	<div class="blogs">
		{#each links as link}
			<a href={'/works/' + link.path}>{link.title}</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	.blogs {
		@include layout-flex-column();

		gap: $x-space-lg;
	}
</style>
