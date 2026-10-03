/**
 * Sources for the figures quoted in page copy.
 *
 * These record where a number came from. Several are sources that later
 * disowned the figure they are best known for, so read the entry before
 * repeating the claim as fact.
 *
 * Cite with `<Cite n={0} />` next to the claim, then render the list once
 * per page with `<References only={[...]} />`.
 */
export type Reference = {
	/** Rendered as the `[n]` marker and used as the list anchor `#ref-n`. */
	id: number
	/** Short inline label, e.g. `Pina et al., 2023`. */
	label: string
	title: string
	/** Journal, publisher or institution. */
	source: string
	year?: number
	/** Omitted only where no stable public link exists. */
	url?: string
	/** One clause. Anything longer belongs in the page copy. */
	note?: string
}

export const references: Reference[] = [
	{
		id: 0,
		label: 'Insivia, 2020',
		title: 'Why Do Viewers Retain 95% of a Video Message, But Only 10% When Reading Text?',
		source: 'Insivia',
		year: 2020,
		url: 'https://www.insivia.com/why-does-video-convert-better-than-text/',
		note: 'Origin of the figure; the authors later described it as directional.'
	},
	{
		id: 1,
		label: 'Dale, 1946',
		title: 'Audio-Visual Methods in Teaching',
		source: 'Audio-Visual Methods in Teaching, 1st edition',
		year: 1946,
		note: 'Source of the Cone of Experience, which carries no percentages.'
	},
	{
		id: 2,
		label: 'Nelson, Reed & Walling, 1976',
		title: 'Pictorial superiority effect',
		source: 'Journal of Experimental Psychology: Human Learning and Memory, 2(5), 523–528',
		year: 1976,
		url: 'https://doi.org/10.1037/0278-7393.2.5.523'
	},
	{
		id: 3,
		label: 'The Ladders, 2012',
		title: 'Eye Tracking Study: Keeping an Eye on Recruiter Behavior',
		source: 'TheLadders whitepaper',
		year: 2012,
		url: 'https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf',
		note: 'Origin of the six-second figure, measured on resumes.'
	},
	{
		id: 4,
		label: 'The Ladders, 2018',
		title: 'Eye-Tracking Study, 2018 update',
		source: 'TheLadders press release',
		year: 2018,
		url: 'https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html',
		note: 'Supersedes the 2012 figure with 7.4 seconds.'
	},
	{
		id: 5,
		label: 'Pina et al., 2023',
		title:
			'Using Machine Learning with Eye-Tracking Data to Predict if a Recruiter Will Approve a Resume',
		source: 'Machine Learning and Knowledge Extraction, 5(3), 713–724',
		year: 2023,
		url: 'https://doi.org/10.3390/make5030038',
		note: 'Peer-reviewed; reports no screening duration.'
	}
]
