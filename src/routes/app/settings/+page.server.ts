import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const ratio = formData.get('ratio') as string;
		const maxLength = formData.get('warning') as string;
		const dateFormat = formData.get('date_format') as string;
		const separator = formData.get('separator') as string;

		const { error } = await supabase
			.from('settings')
			.update({ ratio: ratio, warning: maxLength ? maxLength : 0, date_format: dateFormat, separator: Number(separator) })
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
