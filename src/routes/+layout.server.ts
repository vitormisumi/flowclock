import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) redirect(303, '/app');

	return {
		session
	};
};
