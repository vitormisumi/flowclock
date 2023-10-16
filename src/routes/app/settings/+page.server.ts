import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const ratio = formData.get('ratio') as string;
		const warning = formData.get('warning') as string;
		const dateFormat = formData.get('date_format') as string;
		const separator = formData.get('separator') as string;
		const clockFormat = formData.get('clock_format') as string;
		const breakMessage = formData.get('break_message') as string;

		const { error } = await supabase
			.from('settings')
			.update({ ratio: Number(ratio), warning: warning ? Number(warning) : 0, date_format: dateFormat, separator: Number(separator), clock_format: clockFormat === '1' ? true : false, break_message: breakMessage})
			.eq('user_id', session.user.id);

		if (error) {
			console.log(error);
			return fail(500, {
				message: 'Settings could not be saved. Please try again',
				success: false
			});
		}

		return { message: 'Settings succesfully saved', success: true };
	}
};
