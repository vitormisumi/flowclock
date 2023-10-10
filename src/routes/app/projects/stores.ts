import { writable } from "svelte/store";
import type { Project } from "../types";

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
        last_edited: ''
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
                last_edited: ''
            }),
	};
}

export const selectedProject = createSelectedProject()

export const selectedProjectId = writable(0);