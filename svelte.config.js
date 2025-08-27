import adapter from '@sveltejs/adapter-vercel'
// import adapter from '@sveltejs/adapter-node'
import { sveltePreprocess } from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: [path.resolve('src/styles')]
		}
	}),

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
			$styles: './src/styles'
		}
	}
}

export default config
