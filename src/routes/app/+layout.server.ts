export const load = async ({ locals }) => {
	console.log(locals.pb.authStore.model);
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
			locals.pb.collection('users').getOne(locals.pb.authStore.model.id),
			locals.pb.collection('sessions').getFullList({
				sort: '-start'
			}),
			locals.pb.collection('breaks').getFullList({
				sort: '-id'
			}),
			locals.pb.collection('interruptions').getFullList({
				sort: '-id'
			}),
			locals.pb
				.collection('user_settings')
				.getFirstListItem(`user_id="${locals.pb.authStore.model.id}"`),
			locals.pb.collection('projects').getFullList({
				sort: '-updated'
			}),
			locals.pb.collection('project_groups').getFullList({
				sort: 'name'
			}),
			locals.pb.collection('tasks').getFullList({
				sort: 'order'
			}),
			locals.pb.collection('to_dos').getFullList({
				sort: 'priority'
			}),
			locals.pb.collection('intentions').getFullList(),
			locals.pb.collection('task_statuses').getFullList({
				sort: 'order'
			})
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
