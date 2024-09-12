import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const authData = await locals.pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			console.log(error);
			return fail(500, {
				message:
					'User could not be logged in. Please check you typed your email and password correctly.',
				success: false,
				email
			});
		}
		throw redirect(303, '/app/session');
	}
};
