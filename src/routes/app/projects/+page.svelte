<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import InfoCard from './InfoCard.svelte';
	import TasksCard from './TasksCard.svelte';
	import ToDosCards from './ToDosCards.svelte';
	import IntentionsCard from './IntentionsCard.svelte';
	import SelectProjectButton from './SelectProjectButton.svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import AddProjectButton from './AddProjectButton.svelte';
	import type { Writable } from 'svelte/store';
	import type { Project } from '../types';
	import { getContext } from 'svelte';

	const projects: Writable<Project[]> = getContext('projects');

	export let form;

	$: if ($projects.length === 0) {
		selectedProject.reset();
	} else if ($selectedProjectId != 0) {
		selectedProject.select($projects.filter((x) => x.id === $selectedProjectId)[0]);
	} else {
		selectedProject.select($projects[0]);
	}
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<div class="flex w-full justify-between gap-2 pb-4">
		<SelectProjectButton />
		<AddProjectButton />
	</div>
	{#if $projects.length === 0}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<p class="text-center text-lg text-secondary-100">
				You have no projects yet. Click the button above to create one.
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 gap-4">
			<InfoCard />
			<TasksCard />
			<ToDosCards />
			<IntentionsCard />
		</div>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
