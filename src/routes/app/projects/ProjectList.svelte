<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { selectedProject, selectedProjectId } from './stores';
	import { getContext } from 'svelte';
	import AddProjectButton from './AddProjectButton.svelte';
	import DeleteGroupButton from './DeleteGroupButton.svelte';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');
	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	export let edit: boolean;
	export let hidden: boolean;
</script>

{#each $projectGroups as group}
	<div class="flex h-8 w-full items-center justify-center gap-2">
		<hr class="w-full border-secondary-800" />
		<p class="whitespace-nowrap text-sm text-secondary-400">{group.name}</p>
		<div class="flex w-full items-center">
			<hr class="w-full border-secondary-800" />
			{#if edit}
				<div transition:fade>
					<DeleteGroupButton {group} />
				</div>
			{/if}
		</div>
	</div>
	<div class="grid gap-2">
		{#each $projects.filter((x) => x.group_id === group.id) as project}
			<Button
				class={project.id != $selectedProject.id ? 'bg-transparent' : 'bg-primary-800 '}
				on:click={() => {
					$selectedProjectId = project.id;
					hidden = true;
				}}>{project.name}</Button
			>
		{/each}
		<AddProjectButton {group} />
	</div>
{/each}
