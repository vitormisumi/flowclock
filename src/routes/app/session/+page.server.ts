import { redirect, fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const formData = await request.formData()
        const sessionStart = formData.get('session_start') as string
        const sessionEnd = formData.get('session_end') as string
        
        const { data, error } = await supabase
            .from('sessions')
            .insert({ user_id: session.user.id, started_at: sessionStart, ended_at: sessionEnd })
            .select();
        
        if (error) {
            console.log(error);
            return fail(500, { message: 'Session could not be created', success: false })
        };
        return { data, message: 'Session successfully created', success: true };
    },
}