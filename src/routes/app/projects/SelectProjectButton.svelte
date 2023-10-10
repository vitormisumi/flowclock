<script lang="ts">
	import { Button, Tooltip, Drawer } from 'flowbite-svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Project } from '../types';
	import { getContext } from 'svelte';

	const projects: Writable<Project[]> = getContext('projects');

	let hidden: boolean = true;

</script>

<Button on:click={() => (hidden = false)} class="w-40"
	>{$selectedProject.name}<i class="fa-solid fa-chevron-down pl-2" /></Button
>
<Tooltip>Select project</Tooltip>
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-40"
	class="z-50 bg-primary-900"
	bind:hidden
>
	<div class="grid gap-2">
		<h2 class="text-center font-bold text-primary-50">Projects</h2>
		{#each $projects as project}
			<Button
				class="w-28 {project.id != $selectedProject.id
					? 'border border-primary-700 bg-transparent'
					: ''}"
				on:click={() => {
					$selectedProjectId = project.id;
					hidden = true;
				}}>{project.name}</Button
			>
		{/each}
	</div>
</Drawer>
