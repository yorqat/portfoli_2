import { redirect } from '@sveltejs/kit'

export const load = () => {
	throw redirect(308, '/works/live/lemin-quench/persimmon')
}
