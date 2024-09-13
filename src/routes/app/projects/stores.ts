import { writable } from 'svelte/store';

function createSelectedProject() {
	const { subscribe, set } = writable<Project>({
		id: '',
		user_id: '',
		created: '',
		name: '',
		status: 'idea',
		goal: '',
		description: '',
		focus: '',
		tasks: false,
		to_dos: false,
		intentions: false,
		updated: '',
		project_group_id: ''
	});

	return {
		subscribe,
		select: (project: Project) => set(project),
		reset: () =>
			set({
				id: '',
				user_id: '',
				created: '',
				name: '',
				status: 'idea',
				goal: '',
				description: '',
				focus: '',
				tasks: false,
				to_dos: false,
				intentions: false,
				updated: '',
				project_group_id: ''
			})
	};
}

export const selectedProject = createSelectedProject();

export const selectedProjectId = writable('');

function createSorting() {
	const { subscribe, update } = writable({
		toDos: '',
		intentions: '',
		tasks: ''
	});

	return {
		subscribe,
		sortToDos: (sortBy: string) =>
			update((x) => {
				return {
					...x,
					toDos: sortBy
				};
			}),
		sortIntentions: (sortBy: string) =>
			update((x) => {
				return {
					...x,
					intentions: sortBy
				};
			}),
		sortTasks: (sortBy: string) =>
			update((x) => {
				return {
					...x,
					tasks: sortBy
				};
			})
	};
}

export const sorting = createSorting();
