import { writable } from "svelte/store";

function createSelectedProject() {
    const { subscribe, set } = writable<Project>({
		id: 0,
        user_id: '',
        created_at: '',
        name: '',
        status: '',
        goal: '',
        description: '',
        focus: '',
        last_edited: '',
        group_id: 0
	});

	return {
		subscribe,
        select: (project: Project) =>
            set(project),
        reset: () =>
            set({
            id: 0,
            user_id: '',
            created_at: '',
            name: '',
            status: '',
            goal: '',
            description: '',
            focus: '',
            last_edited: '',
            group_id: 0
        })
	};
}

export const selectedProject = createSelectedProject();

export const selectedProjectId = writable(0);

function createSorting() {
    const { subscribe, update } = writable({
        toDos: '',
        intentions: '',
        tasks: ''
    })

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
			}),
    }
}

export const sorting = createSorting();

export const windowWidth = writable(0);