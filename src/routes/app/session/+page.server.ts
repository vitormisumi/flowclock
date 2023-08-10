import { redirect, fail } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: currentSession } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .is('finished_at', null)
        .order('id', { ascending: false})
        .limit(1)
        .single()
    
    const { data: lastSession } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('id', { ascending: false})
        .limit(1)
        .single()

    return { session, currentSession, lastSession }
}

export const actions = {
    start: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }
        
        const { data, error } = await supabase
            .from('sessions')
            .insert({ user_id: session.user.id, started_at: (new Date()).toISOString() })
            .select();
        
        if (error) {
            console.log(error);
            return fail(500, { message: 'Session could not be created', success: false })
        };
        return { data, message: 'Session successfully created', success: true };
    },

    end: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const { data: sessions } = await supabase
            .from('sessions')
            .select('id')
            .eq('user_id', session.user.id)
            .order('id', { ascending: false })
            .limit(1)
        
        const { data, error } = await supabase
            .from('sessions')
            .update({ finished_at: (new Date()).toISOString() })
            .eq('id', sessions?.at(0)?.id)
            .select()
        
        if (error) {
            console.log(error);
            return fail(500, { message: 'Session could not be ended', success: false })
        };
        return { data, message: 'Session successfully ended', success: true };
    },
}