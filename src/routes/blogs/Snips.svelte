<script module lang="ts">
	import { asset } from '$app/paths'

	export { Seo, Quote, Thumbnail, TableOfContents, Heading }

	export type Chapter = {
		name: string
		id: string
		subChapter: Chapter[]
	}
</script>

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
          '@type': 'Article',
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

{#snippet TableOfContents(chapters: Chapter[])}
	<details class="table-of-contents card scroll-scheme">
		<summary>
			<h3>Table of Contents</h3>
			<div class="menu"></div>
		</summary>

		{#snippet Chapter(chapters: Chapter[], prefix: string = '', id: string)}
			{#each chapters as chapter}
				<div id="chapter--{id}__{chapter.id}" class="chapter" class:root={id === 'top'}>
					<a href={'#' + chapter.id}>{prefix} {chapter.name}</a>

					{#if chapter.subChapter && chapter.subChapter.length > 0}
						{@render Chapter(chapter.subChapter, '└─' + '‣', id + '__' + chapter.id)}
					{/if}
				</div>
			{/each}
		{/snippet}

		<div class="content">
			{@render Chapter(chapters, '', 'top')}
		</div>
	</details>
{/snippet}

{#snippet Heading(uri: string, title: string, author: string, publication: string)}
	<h1 style:view-transition-name={`blog-title-transition-${uri}`}>
		{title}<sub>{author}. Last updated: {publication}</sub>
	</h1>
{/snippet}

{#snippet Quote(quote: string, author: string = 'Anonymous')}
	<blockquote>
		<em>"{quote}"</em>
		<footer>— {author}</footer>
	</blockquote>
{/snippet}

<!-- TODO: upgrade to <picture> -->
{#snippet Thumbnail(uri: string, alt: string = 'TODO: Provide alt text')}
	<div class="img-container" style:view-transition-name={`blog-thumbnail-transition-${uri}`}>
		<img src={asset(`/${uri}.webp`)} {alt} />
	</div>
{/snippet}
