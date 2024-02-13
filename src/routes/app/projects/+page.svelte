<script lang="ts">
	import { navigating } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import Clock from '../Clock.svelte';
	import IntentionsCard from './IntentionsCard.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import SelectProjectButton from './SelectProjectButton.svelte';
	import TasksCard from './TasksCard.svelte';
	import ToDosCard from './ToDosCard.svelte';
	import { selectedProject, selectedProjectId } from './stores';

	const projects: Writable<Project[]> = getContext('projects');

	export let form;

	if ($projects.length && !$selectedProject.id) {
		selectedProject.select($projects[0]);
	}

	$: if (form?.success) {
		if ($projects.length) {
			selectedProject.select($projects[0]);
		} else {
			selectedProject.reset();
		}
	}

	$: if ($selectedProjectId && $selectedProjectId != $selectedProject.id) {
		selectedProject.select($projects.filter((x) => x.id === $selectedProjectId)[0]);
	}
</script>

<div
	class="fixed top-0 w-screen scale-50 landscape:left-8 landscape:md:left-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500 }
		: { duration: 0 }}
>
	<Clock />
</div>
<div class="flex w-full justify-end pb-4">
	<SelectProjectButton />
</div>
{#if $projects.length}
	<div class="flex flex-wrap gap-2 md:gap-4">
		<ProjectCard />
		<TasksCard />
		<div class="grid w-full gap-2 md:gap-4 md:grid-cols-2">
			<ToDosCard />
			<IntentionsCard />
		</div>
	</div>
{:else}
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
		<p class="text-center text-lg dark:text-secondary-100">
			You have no projects yet. Click the button above to create one.
		</p>
	</div>
{/if}
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
