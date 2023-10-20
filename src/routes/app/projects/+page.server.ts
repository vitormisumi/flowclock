import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	add: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
        const name = formData.get('name') as string;
        const goal = formData.get('goal') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;
        const group_id = formData.get('group_id') as string;
		
        const { error } = await supabase
            .from('projects')
            .insert({ user_id: session.user.id, name: name, goal: goal, description: description, status: status, group_id: Number(group_id) });

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Project successfully created', success: true };
    },
    
	edit: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		const formData = await request.formData();
        const name = formData.get('name') as string;
        const goal = formData.get('goal') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;
        const id = formData.get('id') as string;
        const group_id = formData.get('group_id') as string;
		
        const { error } = await supabase
            .from('projects')
            .update({ name: name, goal: goal, description: description, status: status, group_id: Number(group_id) })
            .eq('id', id);

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Project successfully updated', success: true };
    },
    
	delete: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }
        
        const formData = await request.formData();
        const id = formData.get('id') as string;
		
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Project successfully deleted', success: true };
    },
    
    addGroup: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

		const formData = await request.formData();
        const name = formData.get('name') as string;
		
        const { error } = await supabase
            .from('project_groups')
            .insert({ user_id: session.user.id, name: name });

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Group successfully created', success: true };
    },
    
    editGroup: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

		const formData = await request.formData();
    const name = formData.get('name') as string;
    const id = formData.get('id') as string;

    const { error } = await supabase
        .from('project_groups')
        .update({ name: name })
        .eq('id', Number(id))

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Group successfully edited', success: true };
    },
    
    deleteGroup: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
        }

		const formData = await request.formData();
        const id = formData.get('id') as string;
		
        const { error } = await supabase
            .from('project_groups')
            .delete()
            .eq('id', id);

		if (error) {
			console.log(error);
			return fail(500, { message: error.message, success: false });
		}

		return { message: 'Group successfully deleted', success: true };
    },

    addTask: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
          const project_id = formData.get('project_id') as string;
          const name = formData.get('name') as string;
          const type = formData.get('type') as string;
          const due_date = formData.get('due_date') as string;
          const statusId = formData.get('status_id') as string;
          const priority = formData.get('priority') as string;
          const description = formData.get('description') as string;
      
          const { error } = await supabase
              .from('tasks')
              .insert({ user_id: session.user.id, project_id: Number(project_id), name: name, type: type, due_date: due_date, status_id: Number(statusId), priority: Number(priority), description: description });

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      let message = 'Task successfully created'
      if (type === 'to-do') {
        message = 'To-Do successfully created'
      } 
      return { message: message, success: true };
    },

    editTask: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
          const id = formData.get('id') as string;
          const project_id = formData.get('project_id') as string;
          const name = formData.get('name') as string;
          const priority = formData.get('priority') as string;
          const due_date = formData.get('due_date') as string;
          const description = formData.get('description') as string;
      
          const { error } = await supabase
              .from('tasks')
              .update({ user_id: session.user.id, project_id: Number(project_id), name: name, description: description, priority: Number(priority), due_date: due_date })
              .eq('id', id );

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Task successfully edited', success: true };
    },

    deleteTask: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
          const id = formData.get('id') as string;
      
          const { error } = await supabase
              .from('tasks')
              .delete()
              .eq('id', id );

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Task successfully deleted', success: true };
  },

    completeTask: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      const id = formData.get('id') as string;
      let status = formData.get('status') as string;
      if (status === 'done') {
        status = 'planned'
      } else {
        status = 'done'
      }
          
      const { error } = await supabase
        .from('tasks')
        .update({ status_id: 19 })
        .eq('id', id)

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      if (status === 'done') {
        return { message: 'Task successfully completed', success: true };
      } else {
        return { message: 'Task successfully undone', success: true };
      }
  },
    
    addStatus: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let status = formData.get('status') as string;
      let projectId = formData.get('project_id') as string;
      let order = formData.get('order') as string;
          
      const { error } = await supabase
        .from('task_statuses')
        .insert({ user_id: session.user.id, status: status, project_id: Number(projectId), order: Number(order)})

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Status successfully added', success: true };
  },
    
    editStatus: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let status = formData.get('status') as string;
      let id = formData.get('id') as string;
          
      const { error } = await supabase
        .from('task_statuses')
        .update({ status: status })
        .eq('id', id)

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Status successfully edited', success: true };
  },
    
    deleteStatus: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let id = formData.get('id') as string;
          
      const { error } = await supabase
        .from('task_statuses')
        .delete()
        .eq('id', Number(id))

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Status successfully deleted', success: true };
  },
    
    
};