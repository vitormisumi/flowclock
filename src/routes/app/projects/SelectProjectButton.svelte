<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Drawer } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { canHover } from '../stores';
	import AddProjectButton from './AddProjectButton.svelte';
	import EditGroupButton from './EditGroupButton.svelte';
	import { selectedProject, selectedProjectId } from './stores';

	const projects: Writable<Project[]> = getContext('projects');
	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let hidden = true;

	let open = false;

	let loading = false;

	const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button
	size="sm"
	buttonStyle="menu"
	class="flex items-center gap-2"
	on:click={() => (hidden = false)}
>
	{$selectedProject.name === '' ? 'Projects' : $selectedProject.name}
	<iconify-icon icon="ion:chevron-down" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Select project</Tooltip>
{/if}
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-full md:w-80 lg:w-96"
	class="z-50 bg-secondary-100 dark:bg-secondary-800"
	bgColor="bg-secondary-900"
	bgOpacity="bg-opacity-80"
	bind:hidden
>
	<div class="grid gap-4">
		<div class="grid grid-cols-3 place-items-center">
			<h2 class="col-start-2 text-center font-bold text-primary-900 dark:text-primary-50">
				Projects
			</h2>
			<Button
				size="xs"
				on:click={() => (hidden = true)}
				class="col-start-3 w-fit place-self-end bg-transparent text-secondary-900 dark:bg-transparent dark:text-secondary-50 md:invisible"
			>
				<iconify-icon icon="ion:close" />
			</Button>
		</div>
		{#each $projectGroups as group}
			<EditGroupButton {group} />
			<div class="grid gap-2">
				{#each $projects.filter((x) => x.group_id === group.id) as project}
					<Button
						buttonStyle="drawer"
						disabled={project.id === $selectedProject.id}
						on:click={() => {
							$selectedProjectId = project.id;
							hidden = true;
						}}
					>
						{project.name}
					</Button>
				{/each}
				<AddProjectButton {group} on:click={() => (hidden = true)} />
			</div>
			<hr class="w-full dark:border-secondary-900" />
		{/each}
		{#if !open}
			<Button
				size="xs"
				buttonStyle="add"
				class="flex items-center gap-2 hover:bg-secondary-100/50 hover:dark:bg-secondary-800/50"
				type="submit"
				on:click={() => (open = true)}
			>
				<iconify-icon icon="ion:add" />new group
			</Button>
		{/if}
		{#if open}
			<form class="flex h-8 gap-1" method="POST" action="?/addGroup" use:enhance={handleClick}>
				<input
					type="text"
					name="name"
					placeholder="Group name"
					class="w-full rounded-md bg-transparent pl-1 focus:ring-0 dark:bg-transparent dark:text-secondary-300 focus:dark:border-primary-700"
				/>
				<Button size="xs" buttonStyle="cancel" on:click={() => (open = false)}>Cancel</Button>
				<Button size="xs" buttonStyle="accent" type="submit" disabled={loading}>Save</Button>
			</form>
		{/if}
	</div>
</Drawer>
