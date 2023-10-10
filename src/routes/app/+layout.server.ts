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
	
	const { data: interruptions } = await supabase
		.from('interruptions')
		.select('*')
		.eq('user_id', session.user.id)
		.order('id', { ascending: false });

	const { data: settings } = await supabase
		.from('settings')
		.select('*')
		.eq('user_id', session.user.id)
		.single();
	
	const { data: projects } = await supabase
		.from('projects')
		.select('*')
		.eq('user_id', session.user.id)
		.order('last_edited', { ascending: false });

	return { session, sessions, interruptions, settings, projects, user };
};
