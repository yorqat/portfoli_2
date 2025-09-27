---
title: Last Dark Mode Guide You'll Ever Need
seoTitle: The Ultimate Dark Mode Guide for Web Designers & Developers

description: When I first touched the web there's always websites coming short on dark mode support that I just
seoDescription: A complete guide to dark mode design, accessibility, and performance. Learn how to implement dark mode that works across browsers and devices

readTimeMinutes: 4

thumbnailHeroCaption: woman holding a UV lightbulb

author: Yor Qat
date: 2025-08-26
tags:
  - type:tutorial
  - topic:ux
  - technology:svelte
  - technology:sveltekit
  - technology:typescript
  - technology:scss
  - topic:accessibility
  - audience:for-developers
---

Switching between light and dark mode shouldn’t feel like a visual assault.

Yet, many sites still get this wrong; system preferences ignored, flashes of white before dark mode kicks in, and unpredictable theme changes across tabs.

As someone sensitive to bright flashes, I find this jarring. If you’ve ever been “flashbanged” just by navigating a site, you know exactly what I mean.

Here’s how to implement dark mode correctly, taking advantage of Svelte + Kit's brevity, covering both _client-side_ (CSR) and _server-side rendering_ (SSR) plus some **SCSS** theming tip as a bonus, so your users get autonomy and respect for their system preferences.

## The Problem

Most sites today:

- Ignores system preference `prefers-color-scheme`.
- Apply dark mode only after JavaScript loads causing a flash of white screen (FOUC) before switching to dark.
- Don’t persist the user’s theme preference across tabs or sessions.

The result: a jarring, unpredictable experience.

## Solution Overview

The right approach is a **two-pronged system**:

1. **Client-side (CSR)** – Let the user override system preferences and maintain state as they navigate.
2. **Server-side (SSR)** – Use cookies to render the correct theme from the first HTML response to prevent FOUC.

Together, these approaches respect **system defaults**, **user preference**, and **improve accessibility** playing on both CSR and SSR's strengths.

### Client-Side Control (CSR)

Svelte 5 overhaul shows a new way of leveraging stores using `writable`s. Let's start writing our code in `$lib/theming.ts`.

From here on out, we will be assuming a svelte + kit project structure.

1. Define themes and initialization logic

```ts
// $lib/theming.ts

import { type Writable, writable, get } from 'svelte/store'
import { page } from '$app/state'

export type Theme = 'light' | 'dark' | 'auto'

export const themeOptions: Theme[] = ['dark', 'light', 'auto']

// --- Theme Store ---
export const theme: Writable<Theme | null> = writable(null)

// Idempotent initialization, preferably on root +layout.svelte
export const initializeTheme = (newTheme: Theme) => {
	if (get(theme) === null) {
		theme.set(newTheme)
	}
}
```

2. Logic for layout DOM elements to grab theme from anywhere

```ts
// $lib/theming.ts

// --- Context aware theme source of truth CSR / SSR
export const getTheme = (): Theme => {
	return get(theme) ?? page.data.theme
}
```

3. Helper function for DOM updates for all `[data-compels-color-scheme]`

```ts
// $lib/theming.ts

// --- Immediate DOM updates ---
export const applyCompelTheme = (newTheme: Theme) => {
	document.querySelectorAll<HTMLElement>('[data-compel-color-scheme]').forEach((el) => {
		el.setAttribute('data-compel-color-scheme', newTheme)
	})
}
```

Here, state.theme:

- Tracks the current theme reactively.

- Updates `<div data-compels-color-scheme>` dynamically.

- Ensures theme preference survives client-side navigation.

### Server-Side Rendering (SSR)

Client-side solutions alone can’t prevent FOUC, because the first HTML payload may already flash light mode. The fix is **cookies**.

1. Helper function to set theme preference on a cookie

```ts
// $lib/theming.ts

// --- Cookie for SSR to prevent flicker on reloads or direct links ---
export const setThemeCookie = (newTheme: Theme) => {
	if (newTheme !== 'auto') {
		document.cookie = `theme=${encodeURIComponent(newTheme)}; path=/; max-age=${60 * 60 * 24 * 365}`
	} else {
		// SSR infers 'auto' from no cookie
		document.cookie = 'theme=; Max-Age=0; path=/'
	}
}
```

2. On the server side (`+layout.server.ts`), read for cookie and pass that information to `+layout.svelte`

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'
import { parse } from 'cookie'

import { type Theme, themeOptions } from '$lib/theming'

import type { LayoutData } from '$lib/types/layoutdata'

export const load: LayoutServerLoad = async ({ request }): Promise<LayoutData> => {
	const cookies = parse(request.headers.get('cookie') ?? '')

	const rawTheme = cookies.theme
	const theme: Theme = themeOptions.includes(rawTheme as Theme) ? (rawTheme as Theme) : 'auto'

	return { theme }
}
```

## How to Use

1. Wrap it all up in one function where it's used by a toggle or a `<select>` for switching theme overrides.

```ts
// $lib/theming.ts

// --- All in together now ---
export const updateTheme = (newTheme: Theme = 'auto') => {
	// Immediately switches, consistent with CSR nav
	theme.set(newTheme)

	// All [data-compel-color-scheme] updates values for css
	applyCompelTheme(newTheme)

	// SSR aware of theme via cookies
	setThemeCookie(newTheme)
}
```

2. Find your top-level `+layout.svete` where we initialize theming.

```svelte
// src/routes/+layout.svelte


\<script lang='ts'\>
  import { initializeTheme } from '$lib/theming'
  import { page } from '$app/state'

  let { children } = $props()

  $effect(() => {
    initializeTheme(page.data.theme)
  })
\</script\>

{#key page.url.pathname}
  {@render children()}
{/key}
```

### Intended Behaviors

1. SSR handles the initial page render and prevents flashbangs.

2. CSR lets users toggle dynamically and keeps the preference across client navigation.

3. Use system preference as the default, but always let users override it.

### Benefits

- Predictable behavior across tabs and sessions.
- No jarring flashes when navigating.
- User autonomy without sacrificing UX.
- Cleaner developer experience.

```
System Preference → (SSR first render via cookie) → Correct theme applied instantly
        ↓
User toggles theme (CSR) → State updates + cookie set → Next SSR render consistently
```

## Bonus

SCSS is known as CSS but on steroids and that couldn't be closer to the truth.

I'll show you how well SCSS features play ball with our theming solution.
