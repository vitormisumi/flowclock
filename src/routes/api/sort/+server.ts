import { redirect } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	
	const { tasks, sorting } = await request.json();
	
    let sortedTasks = tasks;
    sortedTasks.forEach((item: TaskStatuses) => {
        if (item.tasks && item.tasks.length > 0) {
            switch (sorting) {
                case 'priority':
                    item.tasks.sort((a, b) => b.priority - a.priority);
                    break;
                case 'due_date':
                    item.tasks.sort((a, b) => {
                        if (a.due_date === null) return 1;
                        if (b.due_date === null) return -1;
                        if (a.due_date && b.due_date) {
                            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
                        }
                        return 0;
                    })
                    break;
                case 'name':
                    item.tasks.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    item.tasks.sort((a, b) => b.order - a.order);
            }
        }
    });

    for (let i = 0; i < sortedTasks.length; i++) {
        const order = sortedTasks[i].tasks.map((x: any, index: number) => {
            const { ...rowData } = x;
            rowData.order = sortedTasks[i].tasks.length - index;
            return rowData
        });

        const { error } = await supabase
            .from('tasks')
            .upsert(order)
        
        if (error) {
            console.log(error);
        }
    }
	
	return new Response()
};
