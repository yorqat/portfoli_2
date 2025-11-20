<script lang="ts">
	import type { Action } from '@sveltejs/kit'
	import type { Snippet } from 'svelte'
	import { contextMenu } from './contextMenu'
	import { type ContextMenuContent } from './contextMenuStore'

	type PanelProps = {
		name: string
		tooltip: string
		contextMenuContent: ContextMenuContent
		content: Snippet
	}

	const { name, tooltip, contextMenuContent, content }: PanelProps = $props()
</script>

<div class="panel">
	<header class="panel__header">
		<button use:contextMenu={contextMenuContent} aria-label="Add" class="add"
			><i class="fa-solid fa-plus"></i></button
		>

		<h2 title={tooltip}>
			{name}
		</h2>
		<button class="drag" aria-label="Drag panel"><i class="fa-solid fa-grip-lines"></i></button>
	</header>

	<div class="panel__content">
		{@render content()}
	</div>
</div>

<style lang="scss">
	@use '_index' as *;

	.panel {
		padding-bottom: $x-space-xs;
		margin-bottom: $x-space-sm;
		position: relative;

		outline-offset: $x-space-xs;
		outline-offset: 2px;

		border-radius: $x-space-xs;

		@include layout-respond('lg') {
			border: 2px solid var(--color-panel-border);
		}

		&:has(.drag:hover) {
			outline: 2px dashed rgba(128, 128, 128, 0.2);
		}

		&:has(.drag:active) {
			outline: 2px dashed gray;
		}

		&__header {
			display: flex;
			padding-right: $x-space-sm;
			padding-left: $x-space-xs;
			padding-top: $x-space-xs;
			padding-bottom: $x-space-xs;
			border-radius: $x-space-xs $x-space-xs 0 0;
			user-select: none;
		}

		.add {
			border: unset;
			background-color: inherit;
			padding-inline: $x-space-xs;
			padding-block: 2px;
			color: var(--color-text);
			font-size: $x-font-size-md;
			cursor: context-menu;
			@include fonts-stack('Satoshi-Bold', sans);

			// border: 1px solid var(--color-text-muted);
			// border-bottom: unset;
		}

		.drag {
			font-size: $x-font-size-md;
			aspect-ratio: 1;
			cursor: grab;
			border: unset;
			background: inherit;
			color: var(--color-text-muted);

			&:active {
				cursor: grabbing;
				color: var(--color-text);
			}
		}

		h2 {
			display: inline-block;
			@include fonts-stack('Satoshi-Light', sans);
			letter-spacing: 1.5px;
			text-transform: uppercase;
			padding-left: $x-space-xs;
			color: var(--color-text);
			flex-grow: 1;

			@include layout-respond-max('lg') {
				font-size: $x-font-size-sm;
			}

			@include layout-respond('lg') {
				font-size: $x-font-size-lg;
			}
		}

		&__content {
			margin-inline: $x-space-xs;

			@include layout-respond('lg') {
				font-size: $x-font-size-md;
			}

			@include layout-respond-max('lg') {
				font-size: $x-font-size-xs;
			}
		}
	}
</style>
