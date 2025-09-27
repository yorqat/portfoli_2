export function rehypeSectionize(options = {}) {
	return (tree, file) => {
		const chapters = []
		const stack = [{ level: 1, children: chapters }]

		const newChildren = []
		let currentSection = { type: 'element', tagName: 'section', properties: {}, children: [] }

		function addChapter(title, id, level) {
			// Pop until we find the right parent
			while (stack.length > 0 && stack[stack.length - 1].level >= level) {
				stack.pop()
			}
			const newChapter = { name: title, id, subChapter: [] }
			stack[stack.length - 1].children.push(newChapter)
			stack.push({ level, children: newChapter.subChapter })
		}

		function startNewSection(headingNode) {
			if (currentSection.children.length > 0) {
				newChildren.push(currentSection)
			}
			currentSection = {
				type: 'element',
				tagName: 'section',
				properties: {},
				children: [headingNode]
			}
		}

		tree.children.forEach((node) => {
			if (node.type === 'element' && /^h[2-6]$/.test(node.tagName)) {
				const id = node.properties?.id || ''
				const title = extractText(node)
				const level = parseInt(node.tagName[1])

				addChapter(title, id, level)
				startNewSection(node)
			} else {
				currentSection.children.push(node)
			}
		})

		if (currentSection.children.length > 0) {
			newChildren.push(currentSection)
		}

		tree.children = newChildren

		// ✅ store chapters
		file.data.chapters = chapters
		if (options.exportChapters) {
			if (!file.data.fm) file.data.fm = {}
			file.data.fm.chapters = chapters
		}

		// debug log
		const filename = file.history?.[0] || 'unknown file'
		// console.log('Chapters for', filename, JSON.stringify(chapters, null, 2))
	}
}

function extractText(node) {
	if (!node) return ''

	if (node.type === 'text') return node.value

	if (node.type === 'element') {
		const tag = node.tagName
		const props = node.properties || {}
		const classNames = Array.isArray(props.className)
			? props.className
			: props.className
				? [props.className]
				: []

		// ignore heading-anchor links (the `#` copy link)
		if (tag === 'a' && classNames.includes('heading-anchor')) {
			return ''
		}

		return (node.children || []).map(extractText).join('')
	}

	return ''
}
