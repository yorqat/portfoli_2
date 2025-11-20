export type TrackerExclusiveVariant = {
	name: string
	tooltip: string
}

export type CustomExclusiveVarint = {}

export type AxisDefinition = {
	category: 'Static' | 'Dynamic'
	name: string
	description: string
	variants: TrackerExclusiveVariant[]
}

export const builtinAxes: (AxisDefinition | null)[] = [
	{
		category: 'Dynamic',
		name: 'Has Child',
		description: 'Children context',
		variants: [
			{
				name: 'Nav',
				tooltip: 'Nav child'
			}
		]
	},
	{
		category: 'Dynamic',
		name: 'Dark Mode',
		description: 'Support for Light and Dark mode states',
		variants: [
			{
				name: 'Light',
				tooltip: 'Light mode'
			},
			{
				name: 'Dark',
				tooltip: 'Dark mode'
			}
		]
	},
	{
		category: 'Dynamic',
		name: 'Interaction',
		description: 'Response to user interaction',
		variants: [
			{ name: 'Default', tooltip: 'No interaction state' },
			{ name: 'Disabled', tooltip: 'Suppressed interaction' },
			{ name: 'Hover', tooltip: 'When the pointer is over the element' },
			{ name: 'Focus', tooltip: 'When the element receives focus' },
			{ name: 'Keyboard Focus', tooltip: 'When focus is visible (keyboard navigation)' },
			{ name: 'Active', tooltip: 'While the element is being activated (e.g., mouse down)' },
			{ name: 'Pressed', tooltip: 'After a click event occurs' }
		]
	},
	{
		category: 'Dynamic',
		name: 'Device Screen',
		description: 'Response to device screen',
		variants: [
			{ name: 'Default', tooltip: 'No interaction state' },
			{ name: 'Disabled', tooltip: 'Suppressed interaction' },
			{ name: 'Hover', tooltip: 'When the pointer is over the element' },
			{ name: 'Focus', tooltip: 'When the element receives focus' },
			{ name: 'Keyboard Focus', tooltip: 'When focus is visible (keyboard navigation)' },
			{ name: 'Active', tooltip: 'While the element is being activated (e.g., mouse down)' },
			{ name: 'Pressed', tooltip: 'After a click event occurs' }
		]
	},
	null,
	{
		category: 'Static',
		name: 'Child Of',
		description: 'Parent context',
		variants: [
			{
				name: 'Nav',
				tooltip: 'Nav Parent'
			}
		]
	},
	{
		category: 'Static',
		name: 'Button Emphasis',
		description: 'Variants for button semantics in emphasis',
		variants: [
			{ name: 'Primary', tooltip: 'Highest-priority call to action' },
			{ name: 'Secondary', tooltip: 'Supporting or less-prominent action' },
			{ name: 'Tertiary', tooltip: 'Low-emphasis or contextual action' },
			{ name: 'Ghost', tooltip: 'Minimal emphasis; used for subtle actions' }
		]
	},
	{
		category: 'Static',
		name: 'Button Tone',
		description: 'Variants for button semantics in tone',
		variants: [
			{ name: 'Neutral', tooltip: 'Neutral tone' },
			{ name: 'Destructive / Danger', tooltip: 'Destructive or dangerous action' },
			{ name: 'Success / Confirmative', tooltip: 'Positive or affirming action' }
		]
	}
]
