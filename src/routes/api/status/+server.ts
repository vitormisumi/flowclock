import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const event = await request.json();
	
	const order = event.event.map((x: any, index: number) => {
		const { tasks, ...rowData } = x;
		rowData.order = index + 1;
		return rowData
	});

	const { error } = await supabase
		.from('task_statuses')
		.upsert(order)

	if (error) {
		console.log(error);
	}
	
	return new Response()
};
