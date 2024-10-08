import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) throw redirect(303, '/app/session');

	return {
		session
	};
};