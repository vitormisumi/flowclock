import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }
    
    const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('id', { ascending: false })
        .limit(10)

    return {
        sessions: sessions ?? [],
    };
}