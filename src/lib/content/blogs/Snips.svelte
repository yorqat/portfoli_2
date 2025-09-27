<script module lang="ts">
	export { SeoBlogIndex, Seo, Quote, Thumbnail, TableOfContents, Heading }

	export type Chapter = {
		name: string
		id: string
		subChapter: Chapter[]
	}

	import type { BlogPosting } from './types'
</script>

{#snippet SeoBlogIndex(
	title: string,
	description: string,
	url: string,
	image: string,
	posts: BlogPosting[]
)}
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Structured Data -->
	{@html `
    <script type="application/ld+json">
      ${JSON.stringify(
				{
					'@context': 'https://schema.org',
					'@type': 'Blog',
					name: title,
					description,
					url,
					publisher: {
						'@type': 'Organization',
						name: 'Yor Qat',
						logo: {
							'@type': 'ImageObject',
							url: 'https://yorqat.com/favicon.svg'
						}
					},
					blogPost: posts
				},
				null,
				import.meta.env.DEV ? 2 : undefined
			)}
    </script>
  `}
{/snippet}

{#snippet Seo(
	title: string,
	description: string,
	url: string,
	image: string,
	publishedTime?: string,
	modifiedTime?: string
)}
	<!-- Basic SEO -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Structured Data (JSON-LD) -->
	{@html `
    <script type="application/ld+json">
      ${JSON.stringify(
				{
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					headline: title,
					description,
					url,
					image,
					datePublished: publishedTime,
					dateModified: modifiedTime ?? publishedTime,
					author: { '@type': 'Person', name: 'Yor Qat' },
					publisher: {
						'@type': 'Organization',
						name: 'Yor Qat',
						logo: {
							'@type': 'ImageObject',
							url: 'https://yorqat.com/favicon.svg'
						}
					}
				},
				null,
				import.meta.env.DEV ? 2 : undefined
			)}
    </script>
  `}
{/snippet}

{#snippet TableOfContents(uri: string, title: string, chapters: Chapter[])}
	<div
		class="table-of-contents card scroll-scheme"
		data-auto-open
		style="view-transition-name: blog-card-transition-{uri};"
	>
		<h3>
			<span class="material-symbols-outlined">menu_book</span>
			{title}
		</h3>

		{#snippet Chapter(chapters: Chapter[], prefix: string = '', id: string)}
			{#each chapters as chapter}
				<div id="chapter--{id}__{chapter.id}" class="chapter" class:root={id === 'top'}>
					<a href={'#' + chapter.id}>{prefix} {chapter.name}</a>

					{#if chapter.subChapter && chapter.subChapter.length > 0}
						{@render Chapter(chapter.subChapter, '└─', id + '__' + chapter.id)}
					{/if}
				</div>
			{/each}
		{/snippet}

		<div class="content">
			{@render Chapter(chapters, '', 'top')}
		</div>
	</div>
{/snippet}

{#snippet Heading(uri: string, title: string, author: string, publication: string)}
	<header class="heading">
		<h1>
			{#each title.split(' ') as word, i}
				<span class="vt" style="--vt: {uri}-{i};">{word}</span>{' '}
			{/each}
		</h1>
		<p class="heading_author">
			<span class="author">by {author}</span>
			<span class="last-updated">
				Last updated:
				<time datetime={publication}>{publication}</time>
			</span>
		</p>
	</header>
{/snippet}

{#snippet Quote(quote: string, author: string = 'Anonymous')}
	<blockquote>
		<em>"{quote}"</em>
		<footer>— {author}</footer>
	</blockquote>
{/snippet}

<!-- TODO: upgrade to <picture> -->
{#snippet Thumbnail(src: string, alt: string = 'TODO: Provide alt text')}
	<div class="img-container" style:view-transition-name={`blog-thumbnail-transition-${src}`}>
		<enhanced:img {src} {alt} />
	</div>
{/snippet}
