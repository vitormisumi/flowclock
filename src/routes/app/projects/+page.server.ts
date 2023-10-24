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
          const due_date = formData.get('due_date') as string;
          const statusId = formData.get('status_id') as string;
          const priority = formData.get('priority') as string;
          const description = formData.get('description') as string;
      
          const { error } = await supabase
              .from('tasks')
              .insert({ user_id: session.user.id, project_id: Number(project_id), name: name, due_date: due_date, status_id: Number(statusId), priority: Number(priority), description: description });

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }
      
      return { message: 'Task succesfully created', success: true };
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

    addToDo: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
          const project_id = formData.get('project_id') as string;
          const name = formData.get('name') as string;
          const due_date = formData.get('due_date') as string;
          const priority = formData.get('priority') as string;
          const description = formData.get('description') as string;
      
          const { error } = await supabase
              .from('to_dos')
              .insert({ user_id: session.user.id, project_id: Number(project_id), name: name, due_date: due_date, done: false, priority: Number(priority), description: description });

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'To-Do succesfully created', success: true };
    },

    editToDo: async ({ request, locals: { supabase, getSession } }) => {
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
              .from('to_dos')
              .update({ user_id: session.user.id, project_id: Number(project_id), name: name, description: description, priority: Number(priority), due_date: due_date })
              .eq('id', id );

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'To-Do successfully edited', success: true };
    },

    deleteToDo: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
          const id = formData.get('id') as string;
      
          const { error } = await supabase
              .from('to_dos')
              .delete()
              .eq('id', id );

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'To-Do successfully deleted', success: true };
  },

    completeToDo: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      const id = formData.get('id') as string;
      let done = formData.get('done') as string === 'true';
          
      const { error } = await supabase
        .from('to_dos')
        .update({ done: !done })
        .eq('id', id)

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      if (done) {
        return { message: 'To-Do successfully undone', success: true };
      } else {
        return { message: 'To-Do successfully completed', success: true };
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
    
    addIntention: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let projectId = formData.get('project_id') as string;
      let name = formData.get('name') as string;
      let description = formData.get('description') as string;
      let goal = formData.get('goal') as string;
          
      const { error } = await supabase
        .from('intentions')
        .insert({ user_id: session.user.id, name: name, description: description, weekly_hours_goal: Number(goal), project_id: Number(projectId)})

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Intention successfully added', success: true };
  },
    
    editIntention: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let name = formData.get('name') as string;
      let description = formData.get('description') as string;
      let goal = formData.get('goal') as string;
      let id = formData.get('id') as string;
          
      const { error } = await supabase
        .from('intentions')
        .update({ name: name, description: description, weekly_hours_goal: Number(goal) })
        .eq('id', id)

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Intention successfully edited', success: true };
  },
    
    deleteIntention: async ({ request, locals: { supabase, getSession } }) => {
      const session = await getSession();
      if (!session) {
        throw redirect(303, '/');
          }

      const formData = await request.formData();
      let id = formData.get('id') as string;
          
      const { error } = await supabase
        .from('intentions')
        .delete()
        .eq('id', Number(id))

      if (error) {
        console.log(error);
        return fail(500, { message: error.message, success: false });
      }

      return { message: 'Intention successfully deleted', success: true };
  },
};