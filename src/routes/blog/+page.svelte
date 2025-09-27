<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import type { Post } from '$lib/content/blogs/types'
	import { SeoBlogIndex } from '$lib/content/blogs/Snips.svelte'

	import NavBar from '$lib/NavBar.svelte'
	import { posts } from '$lib/content/blogs/indexPosts'

	import '@material-symbols/font-400'

	export let data: {
		posts: Post[]
	}

	const blogPosts = posts.map((p) => ({
		'@type': 'BlogPosting',
		headline: p.metadata.seoTitle || p.metadata.title,
		description: p.metadata.seoDescription || p.metadata.description,
		url: `https://www.yorqat.com/blog/${p.slug}`,
		image: `https://www.yorqat.com/${p.metadata.thumbnail ?? p.slug + '.webp'}`,
		datePublished: p.metadata.date,
		dateModified: p.metadata.date,
		author: {
			'@type': 'Person',
			name: p.metadata.author
		}
	}))
</script>

<svelte:head>
	<!-- {@render SeoBlogIndex( -->
	<!-- 	'Yor Qat Blog', -->
	<!-- 	'Insights, guides, and tutorials on design, development, and technology.', -->
	<!-- 	'https://www.yorqat.com/blog', -->
	<!-- 	'https://www.yorqat.com/cover.webp', -->
	<!-- 	blogPosts -->
	<!-- )} -->
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
