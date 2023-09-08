import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		let { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://flouu.vercel.app/app/password'
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Please try again later', success: false });
		}

		return {
			message: 'Please check your email to complete the password recovery process.',
			success: true
		};
	}
};
