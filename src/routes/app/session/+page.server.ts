import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	start: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const sessionStart = formData.get('session_start') as string;
		
		const { data, error } = await supabase
			.from('sessions')
			.insert({ user_id: session.user.id, start: sessionStart })
			.select()

		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		} 

		return { message: 'Session started', success: true, data: data };
	},

	break: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const length = formData.get('length') as string;
		const sessionEnd = formData.get('session_end') as string;
		
		const { error: sessionError } = await supabase
			.from('sessions')
			.update({ user_id: session.user.id, end: sessionEnd })
			.eq('id', id)
			.select();

		if (sessionError) {
			console.log(sessionError);
			return fail(500, { message: 'Session could not be saved', success: false });
		}
		
		const { error: breakError } = await supabase
			.from('breaks')
			.insert({ user_id: session.user.id, calculated_length: Number(length), session_id: Number(id)})
		
		if (breakError) {
			console.log(breakError);
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
		
		const { error } = await supabase
			.from('interruptions')
			.insert({ user_id: session.user.id, session_id: Number(sessionId)})

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
		const sessionId = formData.get('session_id') as string;
		const end = formData.get('end') as string;
		const reason = formData.get('reason') as string;
		
		const { error } = await supabase
			.from('interruptions')
			.update({ user_id: session.user.id, session_id: Number(sessionId), reason: reason, end: end })
			.eq('id', id)

		if (error) {
			console.log(error);
			return fail(500, { message: 'Interruption could not be saved', success: false });
		} 

		return { message: 'Interruption ended', success: true };
	},
};
