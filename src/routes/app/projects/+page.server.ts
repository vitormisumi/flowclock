import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	addProject: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
        const name = formData.get('name') as string;
        const goal = formData.get('goal') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;
		
        const { error } = await supabase
            .from('projects')
            .insert({ user_id: session.user.id, name: name, goal: goal, description: description, status: status });

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Project successfully created', success: true };
    },
    
	editProject: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
        const name = formData.get('name') as string;
        const goal = formData.get('goal') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;
        const id = formData.get('id') as string;
		
        const { error } = await supabase
            .from('projects')
            .update({ name: name, goal: goal, description: description, status: status })
            .eq('id', id);

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Project successfully updated', success: true };
	}
};