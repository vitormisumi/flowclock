import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { event, tasks } = await request.json();

	if (event.info.trigger === 'droppedIntoZone') {
		let { error } = await supabase
			.from('tasks')
			.upsert(tasks)
		
		if (error) {
			console.log(error);
		}

		({ error } = await supabase
			.from('settings')
			.update({ 'tasks_sorting': null })
			.eq('user_id', session.user.id))
	
		if (error) {
			console.log(error);
		}
	}

	return new Response()
};
