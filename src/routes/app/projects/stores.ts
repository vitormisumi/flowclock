import { writable } from "svelte/store";
import type { Project } from "../types";

function createSelectedProject() {
	const { subscribe, set } = writable<Project>();

	return {
		subscribe,
        select: (project: Project) =>
            set(project)
	};
}

export const selectedProject = createSelectedProject()

export const selectedProjectId = writable(0);