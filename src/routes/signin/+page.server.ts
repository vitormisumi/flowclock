import { fail, redirect } from '@sveltejs/kit'
import type { Provider } from '@supabase/supabase-js'

const OAUTH_PROVIDERS = ['facebook', 'github', 'google']

export const actions = {
  email: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return fail(500, { message: 'User could not be logged in. Please check your email and password.', success: false, email })
    }

    throw redirect(303, '/app/account')
  },
  oauth: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const provider = formData.get('provider') as Provider

    if (!OAUTH_PROVIDERS.includes(provider)) {
      return fail(500, {message: 'Provider not supported.'})
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: '/app/account'
      }
    })

    if (error) {
      return fail(500, { message: 'Something went wrong.'})
    }

    throw redirect(303, data.url)
  }
}