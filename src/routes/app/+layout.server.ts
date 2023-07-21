import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', session.user.id)
        .single()
    
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
        return { session, settings, profile, error }
    }

    return { session, settings, profile, error }
}