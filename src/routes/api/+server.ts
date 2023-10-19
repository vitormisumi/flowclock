import { redirect, fail } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	const { cardId, e } = await request.json();
	if (e.info.trigger === 'droppedIntoZone') {
		const { error } = await supabase
			.from('tasks')
			.update({ status_id: cardId })
			.eq('id', e.info.id)
		
		if (error) {
			console.log(error);
			// return new Response({ message: error.message, success: false });
		}
	}
	
	return new Response()
};
