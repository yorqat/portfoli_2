import { redirect } from '@sveltejs/kit'

export const load = () => {
	/* 308, not 307: this is a permanent canonicalisation to the homepage, and
	   crawlers treat the two differently. */
	throw redirect(308, '/lounge')
}
