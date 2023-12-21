import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { cardId, event } = await request.json();

	const order = event.items.map((x: any, index: number) => {
		const { ...rowData } = x;
		rowData.order = event.items.length - index;
		rowData.status_id = cardId;
		return rowData
	});

	if (event.info.trigger === 'droppedIntoZone') {
		const { error } = await supabase
			.from('tasks')
			.upsert(order)
		
		if (error) {
			console.log(error);
		}
	}

	if (event.info.trigger === 'droppedIntoZone') {
		const { error } = await supabase
			.from('settings')
			.update({ 'tasks_sorting': null })
			.eq('user_id', session.user.id)
	
		if (error) {
			console.log(error);
		}
	}

	return new Response()
};
