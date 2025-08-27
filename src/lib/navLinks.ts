export const navLinks = [
	{ path: 'blogs', name: 'Blogs', hotkey: 'b' },
	{ path: 'works', name: 'Works', hotkey: 'w' },
	// { path: 'reach', name: 'Reach', hotkey: 'r' },
	{ path: 'content', name: 'Content', hotkey: 'c' }
]

export const chapters: unique symbol = 'chapters'

// src/lib/keyboardNav.ts
import { goto } from '$app/navigation'

export function keyboardNav(node: HTMLElement) {
	const hotkeyMap = new Map(navLinks.map((link) => [link.hotkey.toLowerCase(), link.path]))

	const handleKey = (event: KeyboardEvent) => {
		if (
			document.activeElement?.tagName === 'INPUT' ||
			document.activeElement?.tagName === 'TEXTAREA'
		)
			return

		const key = event.key.toLowerCase()
		const path = hotkeyMap.get(key)
		if (path) goto(path)
	}

	window.addEventListener('keydown', handleKey)
	return {
		destroy() {
			window.removeEventListener('keydown', handleKey)
		}
	}
}
