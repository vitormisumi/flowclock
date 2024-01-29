import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
    const { tasks } = await request.json();

    for (let i = 0; i < tasks.length; i++) {
        const order = tasks[i].tasks.map((x: any, index: number) => {
            const { ...rowData } = x;
            rowData.order = tasks[i].tasks.length - index;
            return rowData
        });

        const { error } = await supabase
            .from('tasks')
            .upsert(order)
        
        if (error) {
            console.log(error);
        }
    }
	
	return new Response()
};
