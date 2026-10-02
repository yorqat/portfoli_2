<script>
	import { page } from '$app/state'
	import { Seo } from '$lib/components/Seo.svelte'
</script>

<svelte:head>
	{@render Seo({
		title: 'Page not found',
		description: 'That page does not exist.',
		noindex: true
	})}
</svelte:head>

<main id="error" class="base">
	<h1>404</h1>
	<h2>That page does not exist</h2>

	<p>
		{page.status === 404
			? 'The link may be out of date, or the page may have moved.'
			: page.error?.message}
	</p>

	<nav aria-label="Suggested pages">
		<ul>
			<li><a href="/lounge">Home</a></li>
			<li><a href="/works">Works</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/content">Content</a></li>
		</ul>
	</nav>
</main>
