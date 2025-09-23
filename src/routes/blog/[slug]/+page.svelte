<script lang="ts">
	import type { PostFrontmatter } from '$lib/content/blogs/types'
	import { onMount, type Component } from 'svelte'
	import { posts } from '$lib/content/blogs/indexPosts'
	import BlogLayout from '$lib/content/blogs/BlogLayout.svelte'
	import * as Snips from '$lib/content/blogs/Snips.svelte'
	import type { Post } from '$lib/content/blogs/types'

	import { page } from '$app/state'

	export let data: {
		slug: string
		chapters: Snips.Chapter[]
		metadata: PostFrontmatter
		thumbnail: string
	}

	// find the pre-imported component by slug
	const Post = posts.find((p: { slug: string }) => p.slug === data.slug)?.component as Component

	onMount(() => {
		console.dir(data.chapters)
		console.dir(data.metadata)
	})

	const domain = 'https://www.yorqat.com'
</script>

<svelte:head>
	{@render Snips.Seo(
		data.metadata.seoTitle ?? data.metadata.title,
		data.metadata.seoDescription ?? data.metadata.description,
		domain + page.url.pathname,
		domain + '/' + data.slug + '.webp',
		data.metadata.date
	)}
</svelte:head>

<BlogLayout>
	{#snippet content()}
		<!--
		{@render Snips.Thumbnail(
			data.thumbnail,
			data.metadata.thumbnailHeroCaption ?? 'idiot forgot caption'
		)}
    -->

		<div
			class="img-container"
			style:view-transition-name={`blog-thumbnail-transition-${data.slug}`}
		>
			<enhanced:img
				width="800"
				sizes="800px"
				fetchpriority="high"
				src={data.thumbnail}
				alt={data.metadata.thumbnailHeroCaption}
			/>
		</div>

		{@render Snips.Heading(
			data.slug,
			data.metadata.title,
			data.metadata.author,
			data.metadata.date
		)}

		<Post />
	{/snippet}

	{#snippet chapters()}
		{@render Snips.TableOfContents(data.slug, data.metadata.title, data.chapters)}
	{/snippet}
</BlogLayout>
