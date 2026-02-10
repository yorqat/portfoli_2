import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'
import kit10 from '../kit10/plugin/vite-kit10-plugin.js'

export default defineConfig({
	plugins: [
    kit10(),
		enhancedImages(), // must come first
		sveltekit()
	]
})
