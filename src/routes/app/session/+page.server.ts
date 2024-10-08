import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	start: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
		const start = formData.get('start') as string;
		const focusType = formData.get('focus_type') as string;
		const focusId = formData.get('focus_id') as string;
		const projectId = formData.get('project_id') as string;
		
		const { data, error } = await supabase
			.from('sessions')
			.insert({ 
				user_id: session.user.id, 
				start: start, 
				...(projectId !== '0' ? { project_id: Number(projectId), ...(focusType === 'task' ? { task_id: Number(focusId) } : { intention_id: Number(focusId) }) } : {project_id: null}),
			})
			.select()
			.single();

		if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be saved', success: false });
		} 

		return { startData: data, message: 'Session started', success: true };
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
		
		const { data, error } = await supabase
			.from('interruptions')
			.insert({ user_id: session.user.id, session_id: Number(sessionId), start: start })
			.select()
			.single();

		if (error) {
			console.log(error);
			return fail(500, { message: 'Interruption could not be saved', success: false });
		} 

		return { interruptionData: data, message: 'Interruption started', success: true };
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
			.eq('id', id);

		if (error) {
			console.log(error);
			return fail(500, { message: 'Interruption could not be saved', success: false });
		} 

		return { message: 'Interruption ended', success: true };
	},

	deleteSession: async ({request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

        const formData = await request.formData();
        const session_id = formData.get('session_id') as string;

        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', Number(session_id))
        
        if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be deleted', success: false });
        }
        
        return { message: 'Session successfully deleted', success: true }
    },

	editSessionStart: async ({request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

        const formData = await request.formData();
        const session_id = formData.get('session_id') as string;
		const start = formData.get('start') as string;

        const { error } = await supabase
            .from('sessions')
			.update({ 'start': start })
            .eq('id', Number(session_id))
        
        if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be edited', success: false });
        }
        
        return { message: 'Session successfully edited', success: true }
    },

	editSessionEnd: async ({request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

        const formData = await request.formData();
        const session_id = formData.get('session_id') as string;
		const end = formData.get('end') as string;

        const { error } = await supabase
            .from('sessions')
			.update({ 'end': end })
            .eq('id', Number(session_id))
        
        if (error) {
			console.log(error);
			return fail(500, { message: 'Session could not be edited', success: false });
        }
        
        return { message: 'Session successfully edited', success: true }
    },
};
