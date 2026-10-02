/**
 * Generates the Open Graph / Twitter card images served from /og/*.
 *
 * Cards are emitted at exactly 1200x630 (the 1.91:1 ratio Facebook, LinkedIn, X
 * and Slack all crop to) as WebP, which keeps every card well under the 5MB
 * ceiling scrapers enforce.
 *
 * Run: node scripts/generate-og.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sharp = require(path.join(root, 'node_modules/.pnpm/sharp@0.34.5/node_modules/sharp'))

const W = 1200
const H = 630
const FONT_DIR = path.join(root, 'src/lib/fonts/Satoshi/fonts')

/* Matches $gray-950 / the lounge backdrop, with the blue + red the site uses for
   its 3D headings. */
const INK = '#0a0f1c'
const INK_SOFT = '#111827'
const WHITE = '#ffffff'
const MUTED = '#9ca3af'
const BLUE = '#3b82f6'
const RED = '#ef4444'

/* ---------------------------------------------------------------- helpers -- */

const esc = (s) =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')

/* Satoshi TTFs inlined as data URIs so rendering never depends on fontconfig. */
async function fontFace(family, file, weight) {
	const { readFile } = await import('node:fs/promises')
	const b64 = (await readFile(path.join(FONT_DIR, file))).toString('base64')
	return `@font-face{font-family:"${family}";font-weight:${weight};src:url(data:font/ttf;base64,${b64}) format("truetype");}`
}

async function fontStyles() {
	return [
		await fontFace('SatoshiBlack', 'Satoshi-Black.ttf', 900),
		await fontFace('SatoshiBold', 'Satoshi-Bold.ttf', 700),
		await fontFace('SatoshiMedium', 'Satoshi-Medium.ttf', 500),
		await fontFace('SatoshiRegular', 'Satoshi-Regular.ttf', 400)
	].join('')
}

/**
 * Greedy wrap. Widths come from the caller's measured advance widths so the
 * line count matches what we later assert with trim().
 */
function wrap(text, perLine) {
	const words = String(text).split(/\s+/).filter(Boolean)
	const lines = []
	let line = ''

	for (const word of words) {
		const candidate = line ? `${line} ${word}` : word
		if (perLine(candidate.length) && line) {
			lines.push(line)
			line = word
		} else {
			line = candidate
		}
	}
	if (line) lines.push(line)
	return lines
}

/* ------------------------------------------------------------ backgrounds -- */

/** Soft blue/red bloom behind the content, matching the lounge's neon headings. */
function backdrop() {
	return `
	<defs>
		<radialGradient id="blue" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="${BLUE}" stop-opacity="0.30"/>
			<stop offset="100%" stop-color="${BLUE}" stop-opacity="0"/>
		</radialGradient>
		<radialGradient id="red" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="${RED}" stop-opacity="0.20"/>
			<stop offset="100%" stop-color="${RED}" stop-opacity="0"/>
		</radialGradient>
	</defs>
	<rect width="${W}" height="${H}" fill="${INK}"/>
	<ellipse cx="1050" cy="120" rx="520" ry="420" fill="url(#blue)"/>
	<ellipse cx="120" cy="620" rx="460" ry="340" fill="url(#red)"/>`
}

/* ------------------------------------------------------------- text block -- */

/**
 * Lays out eyebrow/title/subtitle into a single SVG layer.
 * `maxWidth` is the horizontal budget; callers assert against it afterwards.
 */
function textLayer({ eyebrow, title, subtitle, fonts, maxWidth, x = 72, anchorY }) {
	const titleSize = 68
	const lineHeight = Math.round(titleSize * 1.16)
	const titleWidth = Math.round(maxWidth * 0.72)

	const titleLines = wrap(title, (n) => n * titleSize * 0.55 <= titleWidth)
	const subSize = 30
	const subWidth = Math.round(maxWidth * 0.78)
	const subLines = subtitle ? wrap(subtitle, (n) => n * subSize * 0.52 <= subWidth) : []

	const eyebrowSize = 24
	const eyebrowGap = 22
	const subGap = 30

	const titleTop = anchorY
	const subTop = titleTop + titleLines.length * lineHeight + subGap

	const parts = []

	parts.push(
		`<text x="${x}" y="${titleTop}" font-family="SatoshiBold" font-size="${eyebrowSize}" font-weight="700" fill="${BLUE}" letter-spacing="3">${esc(
			eyebrow.toUpperCase()
		)}</text>`
	)

	// 3D offset echoes the site's --color-secondary-accent heading effect.
	titleLines.forEach((l, i) => {
		const y = titleTop + eyebrowGap + eyebrowSize + i * lineHeight
		parts.push(
			`<text x="${x + 4}" y="${y + 4}" font-family="SatoshiBlack" font-size="${titleSize}" font-weight="900" fill="${RED}" opacity="0.55">${esc(l)}</text>`,
			`<text x="${x}" y="${y}" font-family="SatoshiBlack" font-size="${titleSize}" font-weight="900" fill="${WHITE}">${esc(l)}</text>`
		)
	})

	subLines.forEach((l, i) => {
		const y = subTop + i * Math.round(subSize * 1.4)
		parts.push(
			`<text x="${x}" y="${y}" font-family="SatoshiRegular" font-size="${subSize}" font-weight="400" fill="${MUTED}">${esc(l)}</text>`
		)
	})

	return { svg: parts.join(''), height: subTop + subLines.length * Math.round(subSize * 1.4) }
}

function svgDoc(inner, styles) {
	return Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><style>${styles}</style>${inner}</svg>`
	)
}

/* ------------------------------------------------------------------ face -- */

/** Circular portrait with a brand-coloured ring, cropped to the face region. */
async function faceBadge(size, src) {
	const inner = Math.round(size * 0.88)
	const ring = Math.round(size * 0.06)

	const photo = await sharp(src)
		.resize(inner, inner, { fit: 'cover', position: sharp.strategy.attention })
		.png()
		.toBuffer()

	const mask = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${inner}" height="${inner}"><circle cx="${inner / 2}" cy="${inner / 2}" r="${inner / 2}" fill="#fff"/></svg>`
	)

	const masked = await sharp(photo)
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer()

	const ringSvg = Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${(size - ring) / 2}" fill="none" stroke="${BLUE}" stroke-width="${ring}"/></svg>`
	)

	return sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background: { ...{ r: 0, g: 0, b: 0, alpha: 0 } }
		}
	})
		.composite([
			{ input: masked, left: Math.round(ring / 2), top: Math.round(ring / 2) },
			{ input: ringSvg, left: 0, top: 0 }
		])
		.png()
		.toBuffer()
}

/* --------------------------------------------------------------- measure -- */

/**
 * Renders the text layer alone on a flat field and trims it, so we can assert the
 * real painted extent instead of trusting the wrap heuristic.
 */
async function measure(inner, styles) {
	const trimmed = await sharp(
		svgDoc(`<rect width="${W}" height="${H}" fill="#ff00ff"/>${inner}`, styles)
	)
		.trim({ background: '#ff00ff' })
		.png()
		.toBuffer()

	return sharp(trimmed).metadata()
}

/* ----------------------------------------------------------------- cards -- */

const report = []

async function emit(relPath, build) {
	const buf = await build()
	await mkdir(path.dirname(path.join(root, relPath)), { recursive: true })
	await writeFile(path.join(root, relPath), buf)

	const m = await sharp(buf).metadata()
	const kb = Math.round(buf.length / 1024)

	if (m.width !== W || m.height !== H) {
		throw new Error(`${relPath}: expected ${W}x${H}, got ${m.width}x${m.height}`)
	}
	if (buf.length > 5 * 1024 * 1024) {
		throw new Error(`${relPath}: ${kb}KB exceeds the 5MB scraper ceiling`)
	}

	report.push({ file: relPath, size: `${m.width}x${m.height}`, kb })
	return buf
}

async function main() {
	const styles = await fontStyles()

	/* 1. Lounge — the card a recruiter sees when the link is pasted. Uses the
	      portrait because this is the one page that is literally about you. */
	const face = path.join(root, 'src/lib/content/blogs/posts/cropped-pfp.png')

	await emit('static/og/lounge.webp', async () => {
		const badge = await faceBadge(360, face)
		const { svg } = textLayer({
			eyebrow: 'Yor Qat',
			title: 'I make UX you can feel in your bones',
			subtitle: 'Portfolio — interface design and front-end engineering.',
			fonts: styles,
			maxWidth: 700,
			x: 72,
			anchorY: 236
		})

		const measured = await measure(svg, styles)
		if (measured.width > 700) {
			throw new Error(`lounge text overflows: ${measured.width}px > 700px budget`)
		}

		return sharp(svgDoc(backdrop(), styles))
			.composite([
				{ input: badge, left: W - 360 - 88, top: Math.round((H - 360) / 2) },
				{ input: svgDoc(svg, styles), left: 0, top: 0 }
			])
			.webp({ quality: 88 })
			.toBuffer()
	})

	/* 2. Blog index — typographic only, no portrait: the face belongs to the
	      page about the person, not to an index of posts. */
	await emit('static/og/blog.webp', async () => {
		const { svg } = textLayer({
			eyebrow: 'Writing',
			title: 'Blog',
			subtitle: 'Notes on interface design, accessibility and the web.',
			fonts: styles,
			maxWidth: 900,
			x: 72,
			anchorY: 250
		})

		const measured = await measure(svg, styles)
		if (measured.width > 900) {
			throw new Error(`blog text overflows: ${measured.width}px > 900px budget`)
		}

		return sharp(svgDoc(backdrop(), styles))
			.composite([{ input: svgDoc(svg, styles), left: 0, top: 0 }])
			.webp({ quality: 88 })
			.toBuffer()
	})

	/* 3. Generic fallbacks for the work pages. */
	for (const [file, eyebrow, title, subtitle] of [
		['works', 'Selected work', 'Works', 'Interface design and front-end engineering.'],
		['content', 'Writing', 'Content', 'Notes on interface design, accessibility and the web.'],
		['default', 'Yor Qat', 'Portfolio', 'Interface design and front-end engineering.']
	]) {
		await emit(`static/og/${file}.webp`, async () => {
			const { svg } = textLayer({
				eyebrow,
				title,
				subtitle,
				fonts: styles,
				maxWidth: 980,
				x: 72,
				anchorY: 250
			})

			const measured = await measure(svg, styles)
			if (measured.width > 980) {
				throw new Error(`${file} text overflows: ${measured.width}px > 980px`)
			}

			return sharp(svgDoc(backdrop(), styles))
				.composite([{ input: svgDoc(svg, styles), left: 0, top: 0 }])
				.webp({ quality: 88 })
				.toBuffer()
		})
	}

	/* 4. One card per post, built from that post's own hero image so the
	      artwork is not cropped away by the 1.91:1 frame. */
	const posts = [
		['bypass-isp-how-to', 'Bypass ISP', 'How to actually bypass your ISP'],
		['gsap-shouldnt-be-free', 'GSAP', 'GSAP shouldn’t be free'],
		['last-dark-mode-guide', 'Dark mode', 'The ultimate dark mode guide'],
		['this-design-hate-users', 'Design', 'This design hated its users']
	]

	for (const [slug, eyebrow, title] of posts) {
		const src = path.join(root, 'src/lib/content/blogs/posts', `${slug}.webp`)

		await emit(`static/og/blog/${slug}.webp`, async () => {
			/* Cover-fit rather than fill: the source art is kept whole and the
			   card is built around it. */
			const art = await sharp(src)
				.resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
				.modulate({ brightness: 0.62 })
				.png()
				.toBuffer()

			const scrim = Buffer.from(
				`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${INK}" stop-opacity="0.35"/><stop offset="55%" stop-color="${INK}" stop-opacity="0.80"/><stop offset="100%" stop-color="${INK}" stop-opacity="0.97"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
			)

			const { svg } = textLayer({
				eyebrow,
				title,
				subtitle: '',
				fonts: styles,
				maxWidth: 980,
				x: 72,
				anchorY: 372
			})

			const measured = await measure(svg, styles)
			if (measured.width > 980) {
				throw new Error(`${slug} text overflows: ${measured.width}px > 980px`)
			}

			return sharp(art)
				.composite([
					{ input: scrim, left: 0, top: 0 },
					{ input: svgDoc(svg, styles), left: 0, top: 0 }
				])
				.webp({ quality: 86 })
				.toBuffer()
		})
	}

	console.log('\n  Open Graph cards\n')
	console.table(report)
}

await main()
