<script lang="ts">
	import type { PostFrontmatter } from '$lib/content/blogs/types'
	import { onMount, type Component } from 'svelte'
	import { posts } from '$lib/content/blogs/indexPosts'
	import BlogLayout from '$lib/content/blogs/BlogLayout.svelte'
	import * as Snips from '$lib/content/blogs/Snips.svelte'
	import type { Post } from '$lib/content/blogs/types'

	import { page } from '$app/state'
	import { Seo } from '$lib/components/Seo.svelte'
	import { SITE, OG, absolute, postCard } from '$lib/site'

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

	const title = data.metadata.seoTitle ?? data.metadata.title
	const description = data.metadata.seoDescription ?? data.metadata.description
	const canonical = `/blog/${data.slug}`
	const card = postCard(data.slug)
	const published = new Date(data.metadata.date).toISOString().slice(0, 10)
</script>

<svelte:head>
	{@render Seo({
		title,
		description,
		path: canonical,
		image: card,
		imageAlt: `${title} — ${SITE.name}`,
		type: 'article',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: title,
			description,
			mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(canonical) },
			url: absolute(canonical),
			image: {
				'@type': 'ImageObject',
				url: absolute(card),
				width: OG.width,
				height: OG.height
			},
			datePublished: published,
			dateModified: published,
			inLanguage: SITE.lang,
			author: { '@type': 'Person', name: data.metadata.author ?? SITE.name },
			publisher: {
				'@type': 'Organization',
				name: SITE.name,
				logo: { '@type': 'ImageObject', url: absolute('/favicon.svg') }
			}
		}
	})}
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
