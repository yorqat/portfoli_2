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

[FOUC]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content

Switching between light and dark mode shouldn’t feel like a visual assault.

Yet, many sites still get this wrong; system preferences ignored, flashes of white before dark mode kicks in, and unpredictable theme changes across tabs.

As someone sensitive to bright flashes, I find this jarring. If you’ve ever been “flashbanged” just by navigating a site, you know exactly what I mean.

Here’s how to implement dark mode correctly, taking advantage of Svelte + Kit's brevity, covering both _client-side_ (CSR) and _server-side rendering_ (SSR) plus some **SCSS** theming tip as a bonus, so your users get autonomy and respect for their system preferences.

## The Problem

Most sites today:

- Ignores system preference `prefers-color-scheme`.
- Apply dark mode only after JavaScript loads causing a flash of white screen ([FOUC][FOUC]) before switching to dark.
- Don’t persist the user’s theme preference across tabs or sessions.

The result: a **jarring** and unpredictable experience.

## Solution Overview

The right approach is a **triad of solutions**:

1. **Client-side (CSR)** – Let the user override system preferences and maintain state as they navigate.
2. **Server-side (SSR)** – Use cookies to render the correct theme from the first HTML response to prevent FOUC.
3. **Parameterized Styling (SCSS)** – With SCSS mixins to define css variables and theming declaratively.

Together, these approaches respect **system defaults** and **user preference**, improving **accessibility** playing on both CSR and SSR's strengths.

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

// All together now
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

## Bonus with SCSS!

SCSS is a superset of CSS that adds variables, nesting, mixins, functions etc. I'll show you how well SCSS features play ball with our theming solution.

1. Souped up Variable Definitions

```scss
// Generates the --key: values;
// pair for each entry in your theme map
@mixin declare-vars($map, $prefix: '--') {
	@each $key, $value in $map {
		#{$prefix}-#{$key}: #{$value};
	}
}
```

```scss
// Usage:
$light-theme: (
	// light gray bg; easy on the eyes
	bg: '#F5F5F5',
	// pure white for modals, surfaces cards
	surface: '#FFFFFF',
	// nice blue accent for buttons, links, highlights
	accent: '#4A90E2'
);

@include declare-vars($light-theme, '--light');
// Generates:
--light-bg: #f5f5f5;
--light-surface: #ffffff;
--light-accent: #4a90e2;
```

2. Be able to declare scopes

```scss
@mixin declare-scoped-vars($selector, $map, $prefix: '--') {
	#{$selector} {
		@include declare-vars($map, $prefix);
	}
}
```

```scss
// Usage:
@include declare-scoped-vars(.light, $light-theme, '--color');
// Generates:
.light {
	--color-bg: #f5f5f5;
	--color-surface: #ffffff;
	--color-accent: #4a90e2;
}
```

3. Work your magic by defining the ultimate dark mode support

```scss
@mixin declare-schemes-basic($light-theme: (), $dark-theme: (), $color-prefix: '--color') {
	// Respect user system preferences first
	// scoped in a [data-prefers-color-scheme] data attribute
	@media (prefers-color-scheme: light) {
		@include declare-scoped-vars('[data-prefers-color-scheme]', $light-theme, $color-prefix);
	}

	@media (prefers-color-scheme: dark) {
		@include declare-scoped-vars('[data-prefers-color-scheme]', $dark-theme, $color-prefix);
	}

	// This ensures that manual overrides take
	// precedence over system preference
	@include declare-scoped-vars(
		"[data-prefers-color-scheme][data-compel-color-scheme='light']",
		$light-theme,
		$color-prefix
	);

	@include declare-scoped-vars(
		"[data-prefers-color-scheme][data-compel-color-scheme='dark']",
		$dark-theme,
		$color-prefix
	);
}
```

```scss
// Usage
$light-theme: (
	bg: '#F5F5F5',
	surface: '#FFFFFF',
	accent: '#4A90E2',
	text: '#000000'
);

$dark-theme: (
	bg: '#1E1E1E',
	surface: '#2C2C2C',
	accent: '#3A9AD9',
	text: '#FFFFFF'
);

@include declare-schemes-basic($light-theme, $dark-theme, '--color');

// Generates:
@media (prefers-color-scheme: light) {
	[data-prefers-color-scheme] {
		--color-bg: #f5f5f5;
		--color-surface: #ffffff;
		--color-accent: #4a90e2;
		--color-text: #000000;
	}
}

@media (prefers-color-scheme: dark) {
	[data-prefers-color-scheme] {
		--color-bg: #1e1e1e;
		--color-surface: #2c2c2c;
		--color-accent: #3a9ad9;
		--color-text: #ffffff;
	}
}

[data-prefers-color-scheme][data-compel-color-scheme='light'] {
	--color-bg: #f5f5f5;
	--color-surface: #ffffff;
	--color-accent: #4a90e2;
	--color-text: #000000;
}

[data-prefers-color-scheme][data-compel-color-scheme='dark'] {
	--color-bg: #1e1e1e;
	--color-surface: #2c2c2c;
	--color-accent: #3a9ad9;
	--color-text: #ffffff;
```

4. Now colour theming is a no-brainer

```scss
p {
	color: var(--color-text);
	background-color: var(--color-bg);
}
```

Thank you so much for reading. \<3
