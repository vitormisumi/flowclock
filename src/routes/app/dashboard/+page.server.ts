import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	deleteSession: async ({request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

        const formData = await request.formData();
        const session_id = formData.get('session_id') as string;

        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', Number(session_id))
        
        if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be deleted', success: false });
        }
        
        return { message: 'Session successfully deleted', success: true }
    }
};