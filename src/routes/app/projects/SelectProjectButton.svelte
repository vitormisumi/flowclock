<script lang="ts">
	import { Button, Tooltip, Drawer, Input } from 'flowbite-svelte';
	import { selectedProject, selectedProjectId } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Project, ProjectGroup } from '../types';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import AddProjectButton from './AddProjectButton.svelte';
	import DeleteGroupButton from './DeleteGroupButton.svelte';
	import { fade } from 'svelte/transition';

	const projects: Writable<Project[]> = getContext('projects');
	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let edit = false;

	let hidden = true;

	let open = false;

	let loading = false;

	$: if (hidden) {
		edit = false;
		open = false;
	} else if (open) {
		edit = false;
	}

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button size="sm" on:click={() => (hidden = false)}
	>{$selectedProject.name === '' ? 'Projects' : $selectedProject.name}<i
		class="fa-solid fa-chevron-down pl-2"
	/></Button
>
<Tooltip>Select project</Tooltip>
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-52 md:w-60 lg:w-80"
	class="z-50 bg-primary-900"
	bind:hidden
>
	<div class="grid gap-4">
		<h2 class="text-center font-bold text-primary-50">Projects</h2>
		<div class="flex justify-end">
			<Button size="xs" class="bg-transparent" on:click={() => (edit = !edit)}
				><i class="fa-solid {edit ? 'fa-x' : 'fa-pen'} w-3" /></Button
			>
		</div>
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
		<hr class="w-full border-secondary-800" />
		{#if !open}
			<Button
				size="xs"
				type="submit"
				class="self-center bg-transparent text-secondary-400 hover:bg-secondary-800 hover:text-secondary-100 focus:ring-0"
				on:click={() => (open = true)}><i class="fa-solid fa-plus pr-2" />new group</Button
			>
		{/if}
		{#if open}
			<form
				class="flex gap-2 text-left"
				method="POST"
				action="?/addGroup"
				use:enhance={handleClick}
			>
				<Input
					name="name"
					placeholder="Group name"
					class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
				></Input>
				<Button size="xs" type="submit" class="bg-accent-500 hover:bg-accent-600" disabled={loading}
					><i class="fa-solid fa-save pr-2" />Save</Button
				>
			</form>
		{/if}
	</div>
</Drawer>
