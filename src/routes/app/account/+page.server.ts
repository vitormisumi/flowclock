import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	updateEmail: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const currentEmail = formData.get('current_email') as string;
		const newEmail = formData.get('new_email') as string;

		if (session.user.email !== currentEmail) {
			return fail(500, {
				message: 'The email you typed does not match the email registered to your account',
				success: false
			});
		}

		const { error } = await supabase.auth.updateUser({
			email: newEmail
		});

		if (error) {
			console.log(error);
			return fail(500, {
				message: 'Email could not be changed. Please try again later',
				success: false
			});
		}
		return {
			message: 'Email successfully changed. Please check your new email address to confirm',
			success: true
		};
	},

	updatePassword: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		if (session.user.email) {
			let { error } = await supabase.auth.resetPasswordForEmail(session.user.email, {
				redirectTo: 'https://flouu.vercel.app/app/password'
			});

			if (error) {
				console.log(error);
				return fail(500, {
					message: 'Password could not be changed. Please try again later',
					success: false
				});
			}

			return {
				message: 'Please check your email to complete the password reset process.',
				success: true
			};
		}
	},

	deleteAccount: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase.auth.admin.deleteUser(session.user.id);

		if (error) {
			console.log(error);
			return fail(500, {
				message: 'User could not be deleted. Please try again later',
				success: false
			});
		}

		throw redirect(303, '/');
	}
};
