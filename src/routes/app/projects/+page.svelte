<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { selectedProject, selectedProjectId, windowWidth } from './stores';
	import { getContext } from 'svelte';
	import Notification from '../../Notification.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import TasksCard from './TasksCard.svelte';
	import ToDosCard from './ToDosCard.svelte';
	import IntentionsCard from './IntentionsCard.svelte';
	import SelectProjectButton from './SelectProjectButton.svelte';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');

	export let form;

	if ($projects.length) {
		selectedProject.select($projects[0]);
	} else {
		selectedProject.reset();
	}

	$: if (form?.success) {
		if ($projects.length) {
			selectedProject.select($projects[0]);
		} else {
			selectedProject.reset();
		}
	}
	$: if ($selectedProjectId) {
		selectedProject.select($projects.filter((x) => x.id === $selectedProjectId)[0]);
	}
</script>

<svelte:window bind:innerWidth={$windowWidth} />
<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<div class="flex w-full justify-end pb-4">
		<SelectProjectButton />
	</div>
	{#if $projects.length}
		<div class="flex flex-wrap gap-4">
			<ProjectCard />
			<TasksCard />
			<div class="grid w-full gap-4 md:grid-cols-2">
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
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
