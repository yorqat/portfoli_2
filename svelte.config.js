import adapter from '@sveltejs/adapter-vercel'
import { sveltePreprocess } from 'svelte-preprocess'
import path from 'path'

import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeSectionize } from './src/lib/content/blogs/rehypeSectionize.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		sveltePreprocess({
			scss: {
				includePaths: [
          path.resolve('src/styles'),
          path.resolve('.kit10/live'),
        ]
			}
		}),

		// preprocess for blog articles
		mdsvex({
			extensions: ['.svx', '.md'],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'append',
						properties: { className: ['heading-anchor'], ariaLabel: 'Copy link' },
						content: {
							type: 'text',
							value: '#'
						}
					}
				],
				[rehypeSectionize, { exportChapters: true }]
			]
		})
	],

	kit: {
		adapter: adapter({
			precompress: true
		}),
		csp: {
			directives: {
				'script-src': ['self']
			}
		},
		alias: {
			$components: './src/components',
			$utils: './src/utils',
			$fonts: './src/lib/fonts',
			$static: './static',
			$styles: './src/styles'
		}
	}
}

export default config
