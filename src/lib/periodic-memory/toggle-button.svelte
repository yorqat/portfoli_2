<script lang="ts">
	import { writable, type Writable } from 'svelte/store'

	export let label
	export let pressed: Writable<bool> = writable(false)
	export let onclick = () => {
		$pressed = !$pressed
	}

	import './fonts.css'
	import './colors.css'
	import './button.css'
</script>

<input
	{onclick}
	class={$pressed ? 'pressed' : ''}
	aria-pressed={pressed ? true : false}
	type="button"
	value={label}
/>

<style>
</style>
