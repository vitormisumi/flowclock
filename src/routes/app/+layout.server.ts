import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: { user } } = await supabase.auth.getUser()

    const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('id', { ascending: false })
    
    const { data: settings, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', session.user.id)
        .single()
    
    if (!settings || settings.length === 0) {
        const { data: settings, error } = await supabase
            .from('settings')
            .insert({ user_id: session.user.id, ratio: 3, max_length: 60 })
            .select()
        return { session, sessions, settings, user, error }
    }

    return { session, sessions, settings, user, error }
}
