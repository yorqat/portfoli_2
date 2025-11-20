<script lang="ts" module>
	export type TokenLibrary = {
		[namespace: string]: Token[] | TokenLibrary
	}

	export type TokenValue = string

	export type Token = {
		name: string
		displayName: string
		semantic?: false
		value:
			| TokenValue
			| {
					resolve: string
			  }
	}

	export type TokenResolution = {
		evaluation?: string
		trace: (Token | 'failed resolution')[]
	}

	export type TokenPanelProps = {
		tokens: Token[]
		tokenLibraries: TokenLibrary
	}
</script>

<script lang="ts">
	import { contextMenu } from '../contextMenu'
	import type { ContextMenuContent } from '../contextMenuStore'
	import Panel from '../Panel.svelte'

	function findTokenByPath(tokenLibraries: TokenLibrary, path: string): Token | undefined {
		const segments = path.split('/')

		let current: any = tokenLibraries

		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i]

			if (Array.isArray(current)) {
				// last segment should match a token name in the array
				return current.find((t: Token) => t.name === segment)
			}

			if (typeof current === 'object' && current !== null) {
				current = current[segment]
				if (!current) return undefined
			} else {
				return undefined
			}
		}

		// if we exit loop and current is array or token
		if (Array.isArray(current)) return undefined

		return current as Token | undefined
	}

	function trace(token: Token, tokenLibraries: TokenLibrary): (Token | 'failed resolution')[] {
		const chain: (Token | 'failed resolution')[] = [token]

		if (typeof token.value === 'string') {
			return chain
		}

		const ref = token.value.resolve
		const next = findTokenByPath(tokenLibraries, ref)

		if (!next) {
			chain.push('failed resolution')
			return chain
		}

		return [...chain, ...trace(next, tokenLibraries)]
	}

	function resolveValue(token: Token, tokenLibraries: TokenLibrary): TokenResolution {
		const tr = trace(token, tokenLibraries)
		const last = tr[tr.length - 1]

		const evaluation =
			last === 'failed resolution'
				? undefined
				: typeof last.value === 'string'
					? last.value
					: undefined // should not happen if definitions are correct

		return {
			trace: tr,
			evaluation
		}
	}

	const { tokens = $bindable(), tokenLibraries = $bindable() }: TokenPanelProps = $props()

	let tokenPanelContextMenu: ContextMenuContent = [
		{
			name: 'add',
			displayText: 'Import',
			icon: 'fa-solid fa-upload',
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'add',
			displayText: 'Text',
			icon: 'fa-solid fa-font',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Number',
			icon: 'fa-solid fa-list-ol',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Colour',
			icon: 'fa-solid fa-palette',
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'add',
			displayText: 'Content Flow',
			icon: 'fa-solid fa-table-cells-large',
			onClick: () => console.log('Add')
		},
		'hr',
		// Static editor evaluation
		{
			name: 'add',
			displayText: 'Derivation',
			icon: 'fa-solid fa-calculator',
			onClick: () => console.log('Add')
		},
		// Dynamic evaluation
		{
			name: 'add',
			displayText: 'Library',
			icon: 'fa-solid fa-network-wired',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Schema',
			icon: 'fa-solid fa-microchip',
			onClick: () => console.log('Add')
		}
	]

	let tokenContextMenu: ContextMenuContent = [
		{
			name: 'add',
			displayText: 'Rename',
			icon: 'fa-solid fa-italic',
			onClick: () => console.log('Add')
		},

		{
			name: 'add',
			displayText: 'To New',
			icon: 'fa-solid fa-arrow-up-right-from-square',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Pin',
			icon: 'fa-solid fa-thumbtack',
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'trash',
			displayText: 'Copy',
			icon: 'fa-solid fa-copy',
			onClick: () => console.log('Remove')
		},
		{
			name: 'trash',
			displayText: 'Paste',
			disabled: true,
			icon: 'fa-solid fa-clipboard',
			onClick: () => console.log('Remove')
		},
		'hr',
		{
			name: 'trash',
			displayText: 'Delete',
			tone: 'destructive',
			icon: 'fa-solid fa-trash-can',
			onClick: () => console.log('Remove')
		}
	]
</script>

<Panel
	contextMenuContent={tokenPanelContextMenu}
	name="Tokens"
	tooltip="Design tokens in use and Libraries"
>
	{#snippet content()}
		<h3 class="token-heading">Project</h3>
		<ul class="tokens-used">
			{#each tokens as token}
				<li class="tokens-used__item">
					<!-- <button use:contextMenu={tokenContextMenu} class="token token--top" title={resolveValue(token, tokenLibraries).evaluation ?? 'Unresolved'}> -->
					<!-- 	<i class="fa-solid fa-palette"></i> {token.displayName}</button -->
					<!-- > -->

					{#each resolveValue(token, tokenLibraries).trace as t, i}
						<button class:token--top={i === 0} class:token--pathing={i !== 0} class="token">
							{#if i === 0}
								<i class="fa-solid fa-palette"></i>
							{/if}
							{t?.displayName ?? t?.name ?? 'Not Found'}
						</button>
						<i class="fa-solid fa-angle-left"></i>
						<!-- <i class="fa-solid fa-equals"></i> -->
					{/each}
					<button class="token token--resolved"
						>{resolveValue(token, tokenLibraries).evaluation ?? '??'}</button
					>
				</li>
			{/each}
		</ul>
		<h3 class="token-heading">Libraries</h3>
		<ul class="tokens-library">
			{#snippet nestedtokens(tokenLibraries: TokenLibrary, level: number)}
				{#each Object.keys(tokenLibraries) as item}
					<button
						style="--level: {level};"
						use:contextMenu={tokenContextMenu}
						class="token"
						title={'2rem'}
					>
						<i class="fa-solid fa-network-wired"></i>
						{item}
					</button>
				{/each}
			{/snippet}

			{@render nestedtokens(tokenLibraries, 0)}
		</ul>
	{/snippet}
</Panel>

<style lang="scss">
	@use '_index' as *;

	.token-heading {
		@include fonts-stack('Satoshi-Bold', sans);
		font-size: $x-font-size-sm;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.tokens-library {
		@include layout-flex-column();
		gap: $x-space-xs;
		background: inherit;
	}

	.tokens-used {
		@include layout-flex-column();
		gap: $x-space-xs;
		padding-block: $x-space-xs;
		margin-left: $x-space-xs;
		overflow-x: auto;
		scrollbar-width: thin;

		&__item {
			display: flex;
			align-items: center;
			width: max-content;
			gap: $x-space-sm;

			position: sticky;
			left: 0;
		}
	}

	.token {
		background: var(--color-bg);
		width: max-content;
		color: var(--color-text);
		border: unset;
		padding-block: calc($x-space-xs * 0.5);
		padding-inline: $x-space-xs;
		border: 1px solid var(--color-bg);
		text-align: left;

		&--top {
			position: sticky;
			left: 0;
			min-width: 13ch;
			overflow-x: auto;
		}

		&:not(&--top) {
			min-width: 10ch;
		}

		&--resolved,
		&--pathing {
			background: inherit;
			border: 1px solid var(--color-bg);
			cursor: zoom-in;
		}

		// margin-left: calc($x-space-md * (0.5 + var(--level)));
		@include fonts-stack('Satoshi-Regular', sans);
		font-weight: 600;
		font-size: $x-font-size-sm;
		letter-spacing: 1px;

		cursor: pointer;

		i {
			color: var(--color-text-muted);
			padding-right: calc($x-space-xs * 0.5);
		}

		&:hover {
			// border-left-color: var(--color-primary);
			color: var(--color-primary);

			i {
				color: var(--color-primary);
			}
		}
	}
</style>
