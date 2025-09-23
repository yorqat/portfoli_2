<script lang="ts">
	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import type { Post } from '$lib/content/blogs/types'

	import NavBar from '$lib/NavBar.svelte'

	export let data: {
		posts: Post[]
	}
</script>

<svelte:head>
	<title>Check out the lore of my creative journey</title>
	<meta
		name="description"
		content="Here is where you'll experience how I explore unmapped territories of unfamiliar designs"
	/>
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
			<h1><span class="super-text">55%</span> of readers skim rather than read every word.</h1>

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

						<div class="footer">
							<ul class="tags">
								{#each post.metadata.tags as tag, i}
									<li class="tag">
										<a href="?={tag}" title={tag.split(':')[0]}
											>{tag.split(':')[1].replace('-', ' ')}</a
										>
									</li>
								{/each}
							</ul>

							by {post.metadata.author} - {new Date(post.metadata.date).toLocaleDateString()}
						</div>
					</article>
				{/each}
			</div>
		</main>
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	$blog-card-padding: $x-space-4;

	.blogs-home {
		@include theming-impose-scroll-scheme();
		overflow-y: auto;

		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;
		}
	}

	.description {
		overflow: hidden;

		$font-size: $x-font-size-md;
		$line-numbers: 3;
		$line-height: 1.2;

		font-size: $font-size;
		max-height: calc($font-size * $line-numbers * $line-height + $x-space-sm);

		position: relative;
		&::after {
			content: '...';
		}
	}

	h1 {
		margin-top: $x-space-lg;
		margin-bottom: $x-space-lg;
		padding-inline: $x-space-sm;

		@include layout-respond-max('md') {
			font-size: $x-font-size-2xl;
			line-height: 140%;

			.super-text {
				font-size: $x-font-size-4xl;
			}
		}

		@include layout-respond('lg') {
			font-size: $x-font-size-4xl;
			.super-text {
				font-size: $x-font-size-6xl;
			}
		}

		.super-text {
			vertical-align: middle;
		}
	}

	.blogs {
		display: flex;
		flex-wrap: wrap;
		gap: $x-space-sm;
		margin: 1rem;
	}

	.tags,
	p,
	h2,
	.author {
		padding-inline: $blog-card-padding;
	}

	$tags-border: 2px solid var(--color-bg);

	.tags {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: $x-space-md;
		gap: $x-space-xs;
		font-size: $x-font-size-xs;
		list-style-type: none;

		.tag {
			// Use this for selected
			color: var(--color-text-muted);
			border: $tags-border;
			text-transform: capitalize;
			border-radius: $x-space-xs;
			text-align: center;
			letter-spacing: 1px;

			a {
				display: block;
				padding: $x-space-xs;
				height: 100%;
			}

			&:hover {
				background-color: var(--color-surface-alt);
				color: var(--color-text);
			}
		}
	}

	.content {
		@include layout-flex-column();

		font-feature-settings: 'salt' 1;

		&:hover h2 {
			text-decoration: underline;
			color: var(--color-text);
		}

		h2 {
			line-height: 120%;
			padding-top: $x-space-8;
			margin-bottom: $x-space-xs;

			@include layout-respond('sm') {
				font-size: $x-font-size-xl;
			}

			@include layout-respond-max('md') {
				font-size: $x-font-size-lg;

				bottom: $x-space-lg;
			}
		}
	}

	.footer {
		@include layout-respond('md') {
			max-height: $x-space-xl;
		}
	}

	.blog {
		position: relative;
		color: var(--color-text);
		border-radius: 0.5rem;
		@include layout-flex-column();
		gap: 0.5rem;

		> * {
			background: var(--color-surface);
			border-radius: 0.5rem;
		}

		$gap: $x-space-md;

		overflow: hidden;

		.share {
			padding: $x-space-sm;

			background: unset;
			border: 2px solid var(--color-surface);
			color: var(--color-text);
			border: unset;
			text-align: right;
		}

		@include layout-respond-max('sm') {
			width: 100%;
		}

		p {
			color: var(--color-text);
			margin-bottom: $x-space-sm;
		}

		@include layout-respond-between('md', 'lg') {
			flex: 0 0 calc(50% - $gap);
		}

		@include layout-respond('lg') {
			flex: 0 0 calc(33.333% - $gap);
		}

		@include layout-respond-max('sm') {
			// flex-basis: 100%;
			// flex-grow: 1;

			flex-direction: row-reverse;

			.content {
				position: relative;

				.img-wrapper {
					filter: blur(1px); /* blur only behind text */
				}

				h2 {
					position: absolute;
					padding-bottom: $x-space-sm;
					bottom: 0;

					color: $x-white; /* necessary for exclusion */
					backdrop-filter: blur(4px); /* blur only behind text */

					footer {
						font-size: $x-space-sm;
						font-weight: 400;
					}
				}

				.img-wrapper {
					max-height: 16rem;
				}
			}
		}

		&:hover {
			.share {
				display: block;
			}

			img {
				translate: 0 -4px;
			}
		}
	}

	.img-wrapper {
		aspect-ratio: 16 / 9; /* keeps the box 4:3 */
		overflow: hidden;
		max-height: 16rem;
		position: relative;
		width: 100%;

		img {
			width: 120%;
			height: 120%;
			object-fit: cover;

			transition: translate 0.1s ease-out;
			translate: 0;
		}
	}
</style>
