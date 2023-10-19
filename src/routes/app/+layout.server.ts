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
	
	const { data: projectGroups } = await supabase
		.from('project_groups')
		.select('*')
		.eq('user_id', session.user.id)
		.order('name')
	
	const { data: tasks } = await supabase
		.from('tasks')
		.select('*')
		.eq('user_id', session.user.id)
		.order('id')
	
	const { data: status } = await supabase
		.from('task_statuses')
		.select('*, tasks(*)')
		.eq('user_id', session.user.id)
		.eq('tasks.type', 'task')
		.order('id')

	return { session, sessions, interruptions, settings, projects, projectGroups, tasks, status, user };
};
