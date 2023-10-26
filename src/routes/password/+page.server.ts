import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const newPassword = formData.get('new_password') as string;
		const newPassword2 = formData.get('new_password2') as string;

		if (newPassword !== newPassword2) {
			return fail(500, {
				message:
					'The passwords you typed do not match each other.',
				success: false
			});
		}

		const { error } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			console.log(error);
			return fail(500, {
				message: error.message,
				success: false
			});
		}

		return { message: 'Password successfully saved.', success: true }
	}
};
