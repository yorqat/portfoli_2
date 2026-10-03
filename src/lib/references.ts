/**
 * Sources for factual claims made across the site.
 *
 * Every entry here was opened and read before it was added. A claim that cannot
 * be traced to a source in this file does not belong on the site as a fact.
 *
 * Cite from a Svelte page with `<Cite n={0} />` and render the list with
 * `<References />`. Markdown posts under `blogs/posts` cannot use either, so
 * they carry their own sources inline; keep any new post honest by either
 * citing a source here in prose or not making the claim as fact.
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
	/**
	 * Why this source is here. Several entries exist to show that a widely
	 * repeated claim is *not* supported, so the caveat is the point.
	 */
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
		note: 'Origin of the 95%/10% figure. In this article the company states it came from an internal survey of roughly 200 B2B buyers, that the percentages were "directional", and that it was "not a peer-reviewed neuroscience study".'
	},
	{
		id: 1,
		label: 'Dale, 1946',
		title: 'Audio-Visual Methods in Teaching',
		source: 'Audio-Visual Methods in Teaching, 1st edition',
		year: 1946,
		note: 'Contains the Cone of Experience, a ranked set of teaching methods. Dale assigned it no percentages; the retention ladder attached to it later was added by training vendors without attribution.'
	},
	{
		id: 2,
		label: 'Nelson, Reed & Walling, 1976',
		title: 'Pictorial superiority effect',
		source: 'Journal of Experimental Psychology: Human Learning and Memory, 2(5), 523–528',
		year: 1976,
		url: 'https://doi.org/10.1037/0278-7393.2.5.523',
		note: 'The peer-reviewed basis for the real effect hiding underneath the video claim: recall for pictorial material tends to beat recall for verbal material.'
	},
	{
		id: 3,
		label: 'TheLadders, 2012',
		title: 'Eye Tracking Study: Keeping an Eye on Recruiter Behavior',
		source: 'TheLadders whitepaper',
		year: 2012,
		url: 'https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf',
		note: 'Origin of the "six seconds" figure. Measured resumes rather than portfolios, with 30 recruiters over 10 weeks, and published by a company selling a resume-writing service.'
	},
	{
		id: 4,
		label: 'TheLadders, 2018',
		title: 'Eye-Tracking Study, 2018 update',
		source: 'TheLadders press release',
		year: 2018,
		url: 'https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html',
		note: 'Supersedes the 2012 figure with an average of 7.4 seconds. The release publishes no sample size at all.'
	},
	{
		id: 5,
		label: 'Pina et al., 2023',
		title:
			'Using Machine Learning with Eye-Tracking Data to Predict if a Recruiter Will Approve a Resume',
		source: 'Machine Learning and Knowledge Extraction, 5(3), 713–724',
		year: 2023,
		url: 'https://doi.org/10.3390/make5030038',
		note: 'Peer-reviewed eye-tracking study, 221 recruiters and 2,043 resume views. Notably it reports no screening duration whatsoever, only which regions of the page predicted a decision.'
	}
]
