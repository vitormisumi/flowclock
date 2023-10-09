<script lang="ts">
	import { Button, Modal, Select, Label, Input, Tooltip, Drawer, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { selectedProject } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Project } from '../types';
	import { getContext } from 'svelte';

	const projects: Writable<Project[]> = getContext('projects');

	let statusOptions = [
		{ name: 'idea', value: 'idea' },
		{ name: 'planning', value: 'planning' },
		{ name: 'execution', value: 'execution' },
		{ name: 'completed', value: 'completed' },
		{ name: 'suspended', value: 'suspended' },
		{ name: 'cancelled', value: 'cancelled' }
	];

	let open: boolean = false;

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
        <h2 class="font-bold text-primary-50 text-center">Projects</h2>
		{#each $projects as project}
			<Button
				on:click={() => {
					$selectedProject = project;
					hidden = true;
				}}>{project.name}</Button
			>
		{/each}
	</div>
</Drawer>
<Button on:click={() => (open = true)}><i class="fa-solid fa-plus" /></Button>
<Tooltip>Add new project</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<h2 class="text-lg font-bold text-primary-50">New project</h2>
	<form class="flex flex-col gap-4 text-left" method="POST" action="?/addProject" use:enhance>
		<Label for="name" class="text-primary-50"
			>Name
			<Input name="name" class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="goal" class="text-primary-50"
			>Goal
			<Input name="goal" class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="description" class="text-primary-50"
			>Description
			<Textarea name="description" class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Label for="status" class="text-primary-50"
			>Status
			<Select items={statusOptions} name="status" class="bg-primary-900 text-secondary-50 placeholder:text-secondary-500"/>
		</Label>
		<Button type="submit" on:click={() => (open = false)}
			><i class="fa-solid fa-plus pr-2" />New project</Button
		>
	</form>
</Modal>
