import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const {
		data: { user }
	} = await supabase.auth.getUser();

	const { data: sessions } = await supabase
		.from('sessions')
		.select('*')
		.eq('user_id', session.user.id)
		.order('id', { ascending: false });
	
	const { data: distractions } = await supabase
		.from('distractions')
		.select('*')
		.eq('user_id', session.user.id)
		.order('id', { ascending: false });

	const { data: settings, error } = await supabase
		.from('settings')
		.select('*')
		.eq('user_id', session.user.id)
		.single();

	return { session, sessions, distractions, settings, user, error };
};
