import { fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirmation = formData.get('password-confirmation') as string

    if (password !== passwordConfirmation) {
      return fail(500, { message: 'The passwords you typed do not match each other. Please type the same password twice.', success: false, email })
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    })

    if (error) {
      return fail(500, { message: 'Server error. Try again later.', success: false, email })
    }

    return {
      message: 'Please check your email to confirm your registration.',
      success: true,
    }
  },
}