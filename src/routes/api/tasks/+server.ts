import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { cardId, event } = await request.json();

	const order = event.items.map((x: any, index: number) => {
		const { ...rowData } = x;
		rowData.order = index + 1;
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
	
	return new Response()
};
