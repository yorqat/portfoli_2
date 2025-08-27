<script>
	import '$lib/normalize.css'
	import '$lib/loungePallete.css'
	import { asset } from '$app/paths'

	const links = [
		{
			title: 'The Last Dark Mode Guide You’ll Ever Need',
			description:
				"When I first touched the web there's always websites coming short on dark mode support that I just..",
			author: 'Yor Qat',
			path: 'last-dark-mode-guide',
			date: '08/26/2025'
		},
		{
			title: 'This Design hated its Users so I made it Care',
			description:
				'This UX case study dissects a live website suffering not from technical debt, but from a deeper rot..',
			author: 'Yor Qat',
			path: 'this-design-hated-its-users-so-i-made-it-care',
			date: '08/20/2025'
		}
	]
</script>

<svelte:head>
	<title>Check out the lore of my creative journey</title>
	<meta
		name="description"
		content="Here is where you'll experience how I explore unmapped territories of unfamiliar designs"
	/>
</svelte:head>

<div>
	<div class="blogs">
		{#each links as link}
			<div class="card">
				<div class="img-wrapper">
					<img
						style="view-transition-name: blog-thumbnail-transition-${link.path};"
						alt="needs a caption"
						src={asset(`/${link.path}.webp`)}
					/>
				</div>

				<a class="content" href={'/blogs/' + link.path}>
					<h3>{link.title}</h3>

					<p>{link.description}</p>
				</a>

				{#if link.author}
					<a href={'/blogs/' + link.path}>{link.author} - {link.date}</a>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '_layouts.scss' as layouts;
	@use '_variables.scss' as v;

	a:hover {
		background: unset;
		color: var(--color-text-muted);
	}

	.blogs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 1rem;

		@include layouts.respond('2xl') {
			max-width: v.$breakpoint-xl-content;
			margin-inline: auto;
		}
	}

	.content {
		padding-top: v.$space-8;

		h3 {
			font-size: v.$font-size-2xl;
			line-height: 120%;
			margin-bottom: v.$space-4;
		}

		p {
			color: var(--color-text);
			margin-bottom: v.$space-6;
		}
	}

	.card {
		// background-color: var(--color-surface-alt);
		color: var(--color-text);
		border-radius: 0.5rem;

		// box-shadow: v.$bs-sketch-falloff;
		display: flex;
		flex-direction: column;

		flex: 0 0 calc(33.333% - 10px);

		overflow: hidden;

		& > :not(.img-wrapper) {
			padding-inline: v.$space-4;
			padding-bottom: v.$space-4;
		}

		@include layouts.respond-between('0', 'md') {
			h3 {
				font-size: v.$font-size-lg;
			}
			p {
				font-size: v.$font-size-sm;
			}
		}

		@include layouts.respond-between('0', 'sm') {
			flex-basis: 100%;
			flex-grow: 1;
		}

		&:hover {
			img {
				transform: translateY(-10px);
			}
		}
	}

	.img-wrapper {
		aspect-ratio: 4 / 3; /* keeps the box 4:3 */
		overflow: hidden;
		max-height: 16rem;
		position: relative;

		img {
			width: 120%;
			height: 120%;
			object-fit: cover;

			transition: transform 4s ease-out;
			transform: translateY(0);
		}
	}
</style>
