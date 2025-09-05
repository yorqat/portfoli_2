<script>
	import { page } from '$app/state'
	import { asset } from '$app/paths'
	import BlogLayout from '../BlogLayout.svelte'

	import * as Snips from '../Snips.svelte'

	const uri = $derived.by(() => {
		return page.url.pathname.split('/').filter(Boolean).pop() || 'home'
	})

	const contents = [
		{
			id: 'intro',
			name: 'Introduction',
			subChapter: []
		},
		{
			id: 'design-problem',
			name: 'Design Problem',
			subChapter: []
		},
		{
			id: 'observations',
			name: 'Symptoms and Observations',
			subChapter: [
				{
					id: 'navigation',
					name: 'Inconsistent Navigation',
					subChapter: []
				},
				{
					id: 'unclear',
					name: 'Unclear Affordances',
					subChapter: []
				}
			]
		},
		{
			id: 'goals',
			name: 'UX Goals',
			subChapter: []
		},
		{
			id: 'references',
			name: 'References',
			subChapter: []
		}
	]
</script>

<svelte:head>
	{@render Snips.Seo(
		'This Design Hated Its Users, So I Made It Care',
		"Is this an inevitable clash of Artistic expression and Design intention? I'm here to prove you can have both",
		'',
		''
	)}
</svelte:head>

<BlogLayout>
	{#snippet chapters()}
		{@render Snips.TableOfContents(contents)}
	{/snippet}

	{#snippet content()}
		<section class="blog__intro">
			{@render Snips.Thumbnail(
				uri,
				'students on the left looking chaotic and the same students on the right tidied up'
			)}

			<h1 style:view-transition-name={`blog-title-transition-${uri}`}>
				This Design Hated Its Users So I Made It Care
			</h1>

			<p>
				This UX case study dissects a live website suffering not from technical debt, but from a
				deeper rot: a culture of neglect, masked as artistic license.
			</p>
			<p>
				Behind every broken flow and frustrating interface was a justification; until I tore it down
				and rebuilt it to serve users with care.
			</p>

			{@render Snips.Quote(
				'Projects don’t fail because of too little money, but because of too much.',
				'Jason Fried, Basecamp co-founder'
			)}
		</section>

		<section>
			<h2>Design Problem</h2>
			<p>
				The core issue wasn’t a lack of design; it was a surplus of misguided intent. The site
				embodied what I call aesthetic exceptionalism; a belief that artistic vision justifies
				disregarding usability.
			</p>
			<p>
				This resulted in a product that alienated users, especially those who rely on clarity,
				structure, and accessibility to engage meaningfully.
			</p>
			<p>
				Design decisions prioritized symbolism over function. Navigation elements were obfuscated in
				the name of minimalism. Typography sacrificed legibility for visual flair. Interactive
				elements lacked feedback, breaking the basic contract of interface communication. What
				looked avant-garde was, in practice, user-hostile.
			</p>
			<p>
				The problem wasn't chaos; it was control. The creator(s) imposed meaning, demanding
				interpretation instead of supporting interaction. It wasn’t designed to be used; it was
				designed to be admired from a distance.
			</p>
		</section>

		<section>
			<h2>Symptoms and Observations</h2>
			<ul>
				<li>Inconsistent navigation patterns that broke user expectations</li>
				<li>Important actions (like finding course materials) buried behind unclear affordances</li>
				<li>Poor color contrast and layout that hindered accessibility</li>
				<li>Lack of responsiveness and mobile usability</li>
				<li>Ambiguous language and visual metaphors with no onboarding or contextual clues</li>
			</ul>
		</section>

		<div>
			<h2>UX Goals</h2>
			<ul>
				<li>Restore user trust by making the interface predictable, responsive, and clear</li>
				<li>Preserve the artistic voice without letting it sabotage usability</li>
				<li>Create an experience that feels intentional and navigable</li>
				<li>Reframe creativity as a form of care, not control</li>
				<li>
					Align the site’s identity with the university’s values; make the design reflect the
					academic rigor and prestige of the institution
				</li>
			</ul>
		</div>

		<details>
			<summary>This is a sick title</summary>
			<p>This is a sick contents</p>
		</details>
	{/snippet}
</BlogLayout>

<style lang="scss">
	@use '_index' as *;
</style>
