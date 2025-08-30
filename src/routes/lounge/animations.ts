import gsap from 'gsap'
import { SplitText, ScrollTrigger, ScrollSmoother } from 'gsap/all'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'

const duration = 0.5
const smoothDesktop = 2
const smoothTouch = 0.5

export const animateLoungeElements = () => {
	gsap.registerPlugin(SplitText)
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
	gsap.registerPlugin(DrawSVGPlugin)
	gsap.registerPlugin(MorphSVGPlugin)

	// create the smooth scroller FIRST!
	let smoother = ScrollSmoother.create({
		smooth: smoothDesktop,
		smoothTouch: smoothTouch,
		effects: true
	})

	let splitLinks = SplitText.create('.nav__link', {
		type: 'chars,words',
		mask: 'chars' // <-- this can be "lines" or "words" or "chars"
	})

	gsap.from(
		splitLinks.chars,
		{
			duration,
			y: 100,
			stagger: 0.015,
			transformOrigin: '50% 50% -20',
			ease: 'back.out(1.7)'
		},
		`<`
	)

	gsap.utils.toArray<HTMLElement>('.section--slide').forEach((section) => {
		const header = section.querySelector('.section__header--3d')
		if (!header) return

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top 80%',
				toggleActions: 'restart none none reverse'
			}
		})

		// Opacity first
		tl.from(header, {
			opacity: 0,
			duration: 0.6,
			ease: 'sine.in'
		})
			// Translation starts 0.2s after opacity started
			.from(
				header,
				{
					y: 50, // example translation
					duration: 0.8,
					ease: 'sine.out'
				},
				0.2
			) // <-- offset from timeline start

		const tlMorph = gsap.timeline({
			repeat: -1,
			yoyo: true,
			defaults: { duration: 2, ease: 'power1.inOut' }
		})

		tlMorph
			.to('#morpher', {
				morphSVG:
					'M137.328 1.37145C195.552 1.50417 338.009 132.969 317.283 231.784C300.473 311.926 121.031 403.879 28.8414 275.424C-56.4241 156.617 77.2398 1.23448 137.328 1.37145Z'
			})
			.to('#morpher', {
				morphSVG:
					'M2.76117 166.299C-15.0006 -31.5 142.09 -6.57324 240.5 16C320.313 34.3077 374.631 264.659 217 277C76.5004 288 8.13529 226.147 2.76117 166.299Z'
			})
			.to('#morpher', {
				morphSVG:
					'M21.4998 227.5C-6.1161 176.145 -20.4999 32.5002 77.0001 4.00016C156.076 -19.1143 388 77 318 219C253.258 350.334 50 280.5 21.4998 227.5Z'
			})
			.to('#morpher', {
				morphSVG:
					'M137.328 1.37145C195.552 1.50417 338.009 132.969 317.283 231.784C300.473 311.926 121.031 403.879 28.8414 275.424C-56.4241 156.617 77.2398 1.23448 137.328 1.37145Z'
			})
	})
}
