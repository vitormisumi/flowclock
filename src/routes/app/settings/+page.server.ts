import { redirect, fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const formData = await request.formData()
        const ratio = formData.get('ratio') as string
        const maxLength = formData.get('max_length') as string
        
        const { error } = await supabase
            .from('settings')
            .update({ ratio: ratio, max_length: maxLength })
            .eq('user_id', session.user.id)
    
        if (error) {
            return fail(500, { message: 'Settings could not be saved. Please try again.', success: false })
        }

        return { message: 'Settings saved.'}
    },
}