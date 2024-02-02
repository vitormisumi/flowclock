import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
    const { statuses, sortBy } = await request.json();

    for (let i = 0; i < statuses.length; i++) {
        const { error } = await supabase
            .from('tasks')
            .upsert(statuses[i].tasks)
        
        if (error) {
            console.log(error);
        };
    }

    const { error } = await supabase
        .from('settings')
        .update({ tasks_sorting: sortBy })
        .eq('user_id', session.user.id);
    
    if (error) {
        console.log(error);
    };
	
    return new Response();
};
