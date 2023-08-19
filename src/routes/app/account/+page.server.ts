import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    updateEmail: async ({request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const formData = await request.formData()
        const currentEmail = formData.get('current_email') as string
        const newEmail = formData.get('new_email') as string

        if (session.user.email !== currentEmail) {
            return fail(500, {message: 'The email you typed does not match the email registered to your account', success: false})
        };

        const { error } = await supabase.auth.updateUser({
            email: newEmail,
        })

        if (error) {
            console.log(error);
            return fail(500, { message: 'Email could not be changed. Please try again later', success: false })
        };
        return { message: 'Email successfully changed. Check your new email address to confirm', success: true };
    },
    
    updatePassword: async ({request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            throw redirect(303, '/')
        }

        const formData = await request.formData()
        const currentPassword = formData.get('current_password') as string
        const newPassword = formData.get('new_password') as string

        const { error } = await supabase.auth.updateUser({
            email: newPassword,
        })

        if (error) {
            console.log(error);
            return fail(500, { message: 'Password could not be changed. Please try again later', success: false })
        };
        return { message: 'Password successfully changed. Plase check your email to confirm', success: true };
    },

}