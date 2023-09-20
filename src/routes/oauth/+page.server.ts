import type { Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

const OAUTH_PROVIDERS = ['github', 'google'];

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider;

		if (!OAUTH_PROVIDERS.includes(provider)) {
			return fail(500, { message: 'Provider not supported.' });
		}

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Something went wrong.' });
		}

		throw redirect(303, data.url);
	}
};
