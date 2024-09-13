export const load = async ({ locals }) => {
	if (locals.pb.authStore.model) {
		const [
			user,
			sessions,
			breaks,
			interruptions,
			settings,
			projects,
			projectGroups,
			tasks,
			toDos,
			intentions,
			status
		] = await Promise.all([
			locals.pb.collection('users').getOne(locals.pb.authStore.model.id) as unknown as User,
			locals.pb.collection('sessions').getFullList({
				sort: '-start'
			}) as unknown as Session[],
			locals.pb.collection('breaks').getFullList({
				sort: '-id'
			}) as unknown as Break[],
			locals.pb.collection('interruptions').getFullList({
				sort: '-id'
			}) as unknown as Interruption[],
			locals.pb
				.collection('user_settings')
				.getFirstListItem(`user_id="${locals.pb.authStore.model.id}"`) as unknown as Settings,
			locals.pb.collection('projects').getFullList({
				sort: '-updated'
			}) as unknown as Project[],
			locals.pb.collection('project_groups').getFullList({
				sort: 'name'
			}) as unknown as ProjectGroup[],
			locals.pb.collection('tasks').getFullList({
				sort: 'order'
			}) as unknown as Task[],
			locals.pb.collection('to_dos').getFullList({
				sort: 'priority'
			}) as unknown as ToDo[],
			locals.pb.collection('intentions').getFullList() as unknown as Intention[],
			locals.pb.collection('task_statuses').getFullList({
				sort: 'order'
			}) as unknown as TaskStatus[]
		]);
		return {
			sessions,
			breaks,
			interruptions,
			settings,
			projects,
			projectGroups,
			tasks,
			toDos,
			intentions,
			status,
			user
		};
	}
};
