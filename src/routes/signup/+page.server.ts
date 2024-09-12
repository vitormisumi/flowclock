import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('password-confirmation') as string;

		if (password !== passwordConfirmation) {
			return fail(500, {
				message:
					'The passwords you typed do not match each other. Please type the same password twice.',
				success: false,
				email
			});
		}

		const data = {
			email: email,
			emailVisibility: true,
			password: password,
			passwordConfirm: passwordConfirmation
		};

		try {
			const record = await locals.pb.collection('users').create(data);

			const { token, user } = await locals.pb.authStore.model?.authViaEmail(
				data.email,
				data.password
			);

			locals.pb.authStore.clear();
		} catch (error) {
			return fail(500, {
				message: error,
				success: false,
				email
			});
		}

		throw redirect(303, '/app/session');
	}
};
