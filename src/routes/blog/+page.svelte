<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import type { Post, BlogPosting } from '$lib/content/blogs/types'
	import { Seo } from '$lib/components/Seo.svelte'
	import { SITE, OG, absolute, postCard } from '$lib/site'

	import NavBar from '$lib/NavBar.svelte'
	import { posts } from '$lib/content/blogs/indexPosts'

	import '@material-symbols/font-400'

	export let data: {
		posts: Post[]
	}

	const description =
		'Insights, guides, and tutorials on interface design, accessibility, and the web.'

	const blogPosts: BlogPosting[] = posts.map((p) => ({
		'@type': 'BlogPosting',
		headline: p.metadata.seoTitle || p.metadata.title,
		description: p.metadata.seoDescription || p.metadata.description,
		url: absolute(`/blog/${p.slug}`),
		image: absolute(postCard(p.slug)),
		datePublished: new Date(p.metadata.date).toISOString().slice(0, 10),
		dateModified: new Date(p.metadata.date).toISOString().slice(0, 10),
		author: {
			'@type': 'Person',
			name: p.metadata.author ?? SITE.name
		}
	}))
</script>

<svelte:head>
	{@render Seo({
		title: 'Blog',
		description,
		path: '/blog',
		image: OG.blog,
		imageAlt: `Blog by ${SITE.name}`,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: `Yor Qat Blog`,
			description,
			url: absolute('/blog'),
			inLanguage: SITE.lang,
			publisher: {
				'@type': 'Organization',
				name: SITE.name,
				logo: { '@type': 'ImageObject', url: absolute('/favicon.svg') }
			},
			blogPost: blogPosts
		}
	})}
</svelte:head>

<div
	id="blogs"
	class="base"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<div id="nav">
		<NavBar />
	</div>

	<div class="blogs-home scroll-scheme">
		<main>
			<h1>
				<span class="super-text">55%</span> <span class="quiet-text">of readers</span> skim
				<span class="quiet-text">rather</span>
				than read <span class="quiet-text">every word.</span>
			</h1>

			<div class="blogs">
				{#each data.posts as post}
					<article class="blog">
						<a class="content" href={'/blog/' + post.slug}>
							<div
								class="img-wrapper"
								style="view-transition-name: blog-thumbnail-transition-{post.slug};"
							>
								<enhanced:img
									sizes="540px"
									alt={post.metadata.thumbnailHeroCaption}
									src={post.thumbnail}
								/>
							</div>

							<h2>
								{#each post.metadata.title.split(' ') as word, i}
									<span class="vt" style="--vt: {post.slug}-{i};">{word}</span>{' '}
								{/each}
							</h2>

							<!-- <p class="description">{post.metadata.description}</p> -->
						</a>

						<!-- 						<div class="footer"> -->
						<!---->
						<!-- 							<ul class="tags"> -->
						<!-- 								{#each post.metadata.tags as tag, i} -->
						<!-- 									<li class="tag"> -->
						<!-- 										<a href="?={tag}" title={tag.split(':')[0]} -->
						<!-- 											>{tag.split(':')[1].replace('-', ' ')}</a -->
						<!-- 										> -->
						<!-- 									</li> -->
						<!-- 								{/each} -->
						<!-- 							</ul> -->
						<!-- 							<ul class="share"> -->
						<!--                 <li> -->
						<!--                   <button> -->
						<!--  <span class="material-symbols-outlined"> -->
						<!-- link -->
						<!-- </span> -->
						<!--                   </button> -->
						<!--                 </li> -->
						<!--               </ul> -->
						<!-- 						</div> -->
					</article>
				{/each}
			</div>
		</main>
	</div>
</div>

<style lang="scss">
	@use 'content/blog/layout' as *;
	@use 'content/blog/home' as *;
</style>
