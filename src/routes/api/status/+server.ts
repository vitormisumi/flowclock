import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const event = await request.json();

	const order = event.event.map((x: any, index: number) => ({ id: x.id, order: index + 1 }));

	for (let i = 0; i < order.length; i++) {
		const { error } = await supabase
			.from('task_statuses')
			.update({ order: order[i].order })
			.eq('id', order[i].id)

		if (error) {
			console.log(error);
		}
	}
	
	return new Response()
};
