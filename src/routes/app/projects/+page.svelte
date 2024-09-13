<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade, slide } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import Clock from '../Clock.svelte';
	import IntentionsCard from './IntentionsCard.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import SelectProjectButton from './SelectProjectButton.svelte';
	import TasksCard from './TasksCard.svelte';
	import ToDosCard from './ToDosCard.svelte';
	import { selectedProject, selectedProjectId } from './stores';

	export let data;

	export let form;

	if (data.projects && !$selectedProject.id) {
		selectedProject.select(data.projects[0]);
	}

	$: if (form?.success) {
		if (data.projects) {
			selectedProject.select(data.projects[0]);
		} else {
			selectedProject.reset();
		}
	}

	$: if (data.projects && $selectedProjectId && $selectedProjectId != $selectedProject.id) {
		selectedProject.select(data.projects.filter((x) => x.id === $selectedProjectId)[0]);
	}
</script>

<div
	class="fixed top-0 w-screen scale-50 landscape:left-8 landscape:md:left-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session' ? { duration: 500 } : { duration: 0 }}
>
	{#if data.settings && data.sessions && data.breaks}
		<Clock settings={data.settings} sessions={data.sessions} breaks={data.breaks} />
	{/if}
</div>
<div class="flex w-full justify-end pb-4">
	<SelectProjectButton />
</div>
{#if data.projects?.length}
	<div class="grid gap-2 md:gap-4">
		<ProjectCard />
		{#if $selectedProject.tasks}
			<div transition:slide>
				<TasksCard />
			</div>
		{/if}
		<div class="grid w-full gap-2 md:grid-cols-2 md:gap-4">
			{#if $selectedProject.to_dos}
				<div class={$selectedProject.intentions ? '' : 'md:col-span-2'} transition:slide>
					<ToDosCard />
				</div>
			{/if}
			{#if $selectedProject.intentions}
				<div class={$selectedProject.to_dos ? '' : 'md:col-span-2'} transition:slide>
					<IntentionsCard />
				</div>
			{/if}
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
