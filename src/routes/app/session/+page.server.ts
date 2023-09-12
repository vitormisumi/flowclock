import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const sessionStart = formData.get('session_start') as string;
		const sessionEnd = formData.get('session_end') as string;
		const distractions = formData.get('distractions') as string;
		
		const { data, error } = await supabase
			.from('sessions')
			.insert({ user_id: session.user.id, started_at: sessionStart, ended_at: sessionEnd })
			.select();

		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		} else {
			const distractionMapped = JSON.parse(distractions).map((x: {start: number, end: number, reason: string}) => ({ 
				...x,
				start: new Date (x.start).toISOString(),
				end: new Date (x.end).toISOString(),
				user_id: session.user.id,
				session_id: data[0].id
			}))
	
			const { error } = await supabase
				.from('distractions')
				.insert(distractionMapped)
	
			if (error) {
				console.log(error);
				return fail(500, { message: 'Session could not be saved', success: false });
			}
		}

		return { message: 'Session successfully saved', success: true };
	}
};
