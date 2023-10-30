import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	signOut: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			await supabase.removeAllChannels();
			throw redirect(303, '/');
		}
	},
	
	saveAndSignOut: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
		
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const sessionEnd = formData.get('session_end') as string;
		
		const { error } = await supabase
		.from('sessions')
		.update({ user_id: session.user.id, end: sessionEnd })
		.eq('id', id)
		
		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		}
		
		if (session) {
			await supabase.auth.signOut();
			await supabase.removeAllChannels();
			throw redirect(303, '/');
		}
	},
};
