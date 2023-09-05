import { fail, redirect } from '@sveltejs/kit'

export const actions = {  
    default: async ({request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const formData = await request.formData()
        const newPassword = formData.get('new_password') as string
        const newPassword2 = formData.get('new_password2') as string

        if (newPassword !== newPassword2) {
            return fail(500, {message: 'The passwords you typed do not match each other. Please type the same password twice', success: false})
        };

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        })

        if (error) {
            console.log(error);
            return fail(500, { message: 'Password could not be changed. Please try again later', success: false })
        };
        
        return { message: 'Password successfully changed.', success: true };
    },
}