import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { cardId, event } = await request.json();

	if (event.info.trigger === 'droppedIntoZone') {
		const { error } = await supabase
			.from('tasks')
			.update({ status_id: cardId })
			.eq('id', event.info.id)
		
		if (error) {
			console.log(error);
		}
	}
	
	return new Response()
};
