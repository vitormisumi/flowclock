import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	start: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const start = formData.get('start') as string;
		
		const { error } = await supabase
			.from('sessions')
			.insert({ user_id: session.user.id, start: start })

		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		} 

		return { message: 'Session started', success: true };
	},

	break: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const end = formData.get('end') as string;
		
		const { error } = await supabase
			.from('sessions')
			.update({ end: end })
			.eq('id', id);

		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		}

		return { message: 'Session ended', success: true };
	},

	startInterruption: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const sessionId = formData.get('session_id') as string;
		const start = formData.get('start') as string;
		
		const { error } = await supabase
			.from('interruptions')
			.insert({ user_id: session.user.id, session_id: Number(sessionId), start: start})

		if (error) {
			console.log(error);
			return fail(500, { message: 'Interruption could not be saved', success: false });
		} 

		return { message: 'Interruption started', success: true };
	},

	endInterruption: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const end = formData.get('end') as string;
		const reason = formData.get('reason') as string;
		
		const { error } = await supabase
			.from('interruptions')
			.update({ reason: reason, end: end })
			.eq('id', id)

		if (error) {
			console.log(error);
			return fail(500, { message: 'Interruption could not be saved', success: false });
		} 

		return { message: 'Interruption ended', success: true };
	},
};
