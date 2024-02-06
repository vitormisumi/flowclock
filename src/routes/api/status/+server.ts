import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { statuses } = await request.json();

	const { data, error } = await supabase
		.from('task_statuses')
		.upsert(statuses)
		.select();
	
	console.log(data)

	if (error) {
		console.log(error);
	}
	
	return new Response()
};
