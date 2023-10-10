<script lang="ts">
	import { Button, Tooltip, Input, Modal, Select } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { ProjectGroup } from '../types';
	import { getContext } from 'svelte';
    import type { SubmitFunction } from '@sveltejs/kit';

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let open = false;

	let statusOptions = [
		{ name: 'idea', value: 'idea' },
		{ name: 'planning', value: 'planning' },
		{ name: 'on going', value: 'on going' },
		{ name: 'completed', value: 'completed' },
		{ name: 'suspended', value: 'suspended' },
		{ name: 'cancelled', value: 'cancelled' }
	];

	let groupOptions: { name: string; value: number }[] = [];

	$: groupOptions = $projectGroups.map((x) => {
		return { name: x.name, value: x.id };
	});

	$: groupValue = groupOptions.find((x) => x.value === $selectedProject.group_id)?.value;

    let loading = false;

    const handleClick: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
            open = false;
			loading = false;
			update();
		};
	};
</script>

<Button size="xs" class="bg-transparent hover:bg-primary-700" on:click={() => (open = true)}
	><i class="fa-solid fa-pen text-primary-50" /></Button
>
<Tooltip>Edit project</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit project {$selectedProject.name}</p>
	<form class="flex flex-col gap-4 text-left" method="POST" action="?/edit" use:enhance={handleClick}>
		<Input
			name="name"
            placeholder="Project name"
			value={$selectedProject.name}
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
            required
			><i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" /></Input
		>
		<Input
			name="goal"
			placeholder="Project goal"
			value={$selectedProject.goal}
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			><i class="fa-solid fa-bullseye" aria-hidden="true" slot="left" /></Input
		>
		<Input
			name="description"
			placeholder="Description"
			value={$selectedProject.description}
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			><i class="fa-solid fa-file-lines" aria-hidden="true" slot="left" /></Input
		>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Select status..."
			value={$selectedProject.status}
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			required
		/>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Select group..."
			value={groupValue}
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
		/>
		<input type="number" name="id" hidden value={$selectedProject.id} />
		<Button type="submit" class="self-center bg-accent-500 hover:bg-accent-600"
			><i class="fa-solid fa-save pr-2" />Save</Button
		>
	</form>
</Modal>
