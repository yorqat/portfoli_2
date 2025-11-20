<script lang="ts">
	import type { ComponentFlat, ComponentView } from '../Component.svelte'
	import Panel from '../Panel.svelte'
	import { contextMenu } from '../contextMenu'
	import type { ContextMenuContent } from '../contextMenuStore'

	type KitsPanel = {
		kits: ComponentFlat[]
		kitViews: ComponentView[]
	}

	const { kits = $bindable(), kitViews = $bindable() }: KitsPanel = $props()

	function selectKit(target: ComponentView) {
		// deselect everything
		const deselectAll = (list: ComponentView[]) => {
			for (const c of list) {
				delete c.selected
				if (c.children) deselectAll(c.children)
			}
		}

		deselectAll(kitViews)

		// select the target
		target.selected = 'primary'
	}

	let kitsContextMenu: ContextMenuContent = [
		{
			name: 'add',
			displayText: 'Kit',
			icon: 'fa-regular fa-window-maximize',
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'add',
			displayText: 'Text',
			icon: 'fa-solid fa-bold',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Image',
			icon: 'fa-solid fa-image',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Shape',
			icon: 'fa-solid fa-star',
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'add',
			displayText: 'Screen',
			icon: 'fa-solid fa-display',
			onClick: () => console.log('Add')
		}
	]

	let menu = [
		{
			name: 'add',
			displayText: 'Rename',
			icon: 'fa-solid fa-italic',
			onClick: () => console.log('Add')
		},
		{
			name: 'add',
			displayText: 'Deselect',
			icon: 'fa-solid fa-minus',
			disabled: true,
			onClick: () => console.log('Add')
		},
		'hr',
		{
			name: 'add',
			displayText: 'New View',
			icon: 'fa-solid fa-diamond',
			onClick: () => console.log('Add')
		},

		{
			name: 'trash',
			displayText: 'Clone Kit',
			icon: 'fa-solid fa-clone',
			onClick: () => console.log('Remove')
		},
		'hr',
		{
			name: 'trash',
			displayText: 'Delete View',
			icon: 'fa-solid fa-trash-can',
			onClick: () => console.log('Remove')
		}
	]
</script>

<Panel contextMenuContent={kitsContextMenu} name="Kits" tooltip="Kits">
	{#snippet content()}
		<div class="components">
			{#snippet kitter(component: ComponentView, level: number)}
				<button
					style="--coords: 'x: {component.rootPosition?.x ?? 0} y: {component.rootPosition?.y ??
						0}'; --level: {level}"
					class="component"
					class:component--selected={component.selected}
					use:contextMenu={menu}
					aria-label={component.name}
					onclick={() => selectKit(component)}
				>
					<i class="component__icon fa-regular fa-window-maximize"></i>
					<div class="component__name" contenteditable="false">
						{component.name ?? kits[component.source_index].name ?? 'Unnamed'}
					</div>
				</button>

				{#if component.children}
					{#each component.children as child}
						{@render kitter(child, level + 1)}
					{/each}
				{/if}
			{/snippet}

			{#each kitViews as kit}
				{@render kitter(kit, 0)}
			{/each}
		</div>
	{/snippet}
</Panel>

<style lang="scss">
	@use '_index' as *;

	.components {
		@include layout-flex-column();
		padding-top: $x-space-xs;
		overflow-x: auto;
		scrollbar-width: thin;
	}

	.component {
		display: flex;
		align-items: center;
		gap: $x-space-sm;
		padding-left: $x-space-sm;
		padding-left: calc($x-space-md * (0.25 + var(--level)));
		padding-block: calc($x-space-xs * 0.25);

		color: var(--color-text);

		background-color: inherit;
		border: unset;

		display: flex;
		width: 100%;
		letter-spacing: 1px;
		cursor: pointer;
		position: relative;
		border-left: 2px solid var(--color-surface);
		font-size: $x-font-size-md;

		&__icon {
			color: var(--color-text-muted);
			font-size: $x-font-size-lg;
		}

		&__name {
			@include fonts-stack('Satoshi-Regular', sans);
			color: var(--color-text);
			font-weight: 600;
		}

		&:hover {
			.component__icon,
			.component__name {
				color: var(--color-primary);
			}
		}

		&--selected {
			background-color: var(--color-surface-alt);
			border-left: 2px solid var(--color-primary);

			> * {
				color: var(--color-primary);
			}

			&:hover {
				border-color: var(--color-primary-hover);

				.component__icon,
				.component__name {
					color: var(--color-primary-hover);
				}
			}
		}

		&::after {
			content: var(--coords);
			color: var(--color-text-muted);
			position: absolute;
			right: $x-space-md;
			display: none;
		}

		&:hover {
			color: var(--color-primary);

			&::after {
				display: block;
			}
		}
	}
</style>
