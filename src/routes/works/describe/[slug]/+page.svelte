<script lang="ts">
	import type { Project } from '$lib/content/works/types'

	import { getTheme } from '$lib/theming'
	import { getReducedMotion } from '$lib/reduced-motion'

	import NavBar from '$lib/NavBar.svelte'

	export let data: { slug: string; projects: Project[]; project: Project }

	const { site, descriptor } = data.project
</script>

<div
	id="work-home"
	data-prefers-color-scheme
	data-compel-color-scheme={getTheme()}
	data-prefers-reduced-motion
	data-compel-reduced-motion={getReducedMotion()}
>
	<div id="nav">
		<NavBar />
	</div>

	<div class="scroll-scheme base" id="descriptor">
		<section class="thumbnail"></section>

		<section class="hero">
			<h1>{site.title}</h1>
			{#if site.subtitle}<p class="subtitle">{site.subtitle}</p>{/if}
			<div class="tags">
				{#each site.tags as tag}<span class="tag">{tag}</span>{/each}
			</div>
		</section>

		<section class="overview">
			<!-- <h2>Overview</h2> -->
			<p>{descriptor.projectOverview}</p>
		</section>

		<section class="roles">
			<h2>Roles</h2>
			<ul>
				{#each descriptor.roles as role}
					<li>{role}</li>
				{/each}
			</ul>
		</section>

		<section class="tools">
			<h2>Tools & Tech</h2>
			<div class="grid">
				<div>
					<h3>Tools</h3>
					<ul>
						{#each descriptor.tools as tool}<li>{tool}</li>{/each}
					</ul>
				</div>
				<div>
					<h3>Technologies</h3>
					<ul>
						{#each descriptor.technologies as tech}<li>{tech}</li>{/each}
					</ul>
				</div>
			</div>
		</section>

		<section class="material">
			<h2>Materials</h2>
		</section>
	</div>
</div>

<style lang="scss">
	@use 'content/work/layout' as *;
	@use 'content/work/describe' as *;
</style>
