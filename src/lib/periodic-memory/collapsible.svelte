<script>
	let expanded = $state(false)
</script>

<div class="collapsible">
	<div class="header">
		<label class="header-label" for="collapsible-toggle">
			<slot name="header"></slot>
		</label>
		<input
			id="collapsible-toggle"
			class="collapsible-checkbox"
			type="checkbox"
			bind:checked={expanded}
			aria-controls="collapsible-content"
			aria-expanded={expanded}
		/>
	</div>

	<div id="collapsible-content" class="content" role="region" aria-hidden={!expanded}>
		<slot name="content"></slot>
	</div>
</div>

<style lang="scss">
	@use 'periodic-memory/colors' as c;

	.collapsible {
		box-shadow: c.$box-shadow;
		padding: 0.5rem 1rem;
		color: #7a7a7a;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-label {
		cursor: pointer;
		flex-grow: 1;
	}

	.collapsible-checkbox[aria-expanded='true'] {
		transform: rotate(180deg);
	}

	.collapsible-checkbox {
		/* style this as your toggle, or hide and replace with a real button */
		all: unset;
		width: 2rem;
		aspect-ratio: 1;

		background: c.$primary;
		clip-path: polygon(50% 70%, 0 20%, 100% 20%);
		transition: 0.2s transform ease-in;
	}

	.collapsible-checkbox:hover {
		cursor: pointer;
	}

	.content {
		overflow: hidden;
		transition: max-height 0.3s ease;
		max-height: 800px;
	}

	.collapsible-checkbox:hover {
		filter: saturate(1.2);
	}

	.collapsible .content[aria-hidden='true'] {
		max-height: 0;
	}
</style>
