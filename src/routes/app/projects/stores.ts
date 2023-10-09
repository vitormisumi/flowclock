import { writable } from "svelte/store";
import type { Project } from "../types";

export const selectedProject = writable<Project>({
    id: 0,
	user_id: '',
	created_at: '',
	name: '',
    status: '',
    goal: '',
    description: '',
    focus: ''
});