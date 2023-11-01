<script lang="ts">
	import { Button, Tooltip, Input, Modal, Select, Textarea } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
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

<Button
	size="xs"
	class="bg-transparent transition-colors hover:bg-primary-700"
	on:click={() => (open = true)}><i class="fa-solid fa-pen text-primary-50" /></Button
>
<Tooltip placement="left">Edit project</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit project {$selectedProject.name}</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/edit"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Project name"
			value={$selectedProject.name}
			class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
			required
		></Input>
		<Input
			name="goal"
			placeholder="Project goal"
			value={$selectedProject.goal}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Input>
		<Textarea
			name="description"
			placeholder="Description"
			value={$selectedProject.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Textarea>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Select status..."
			value={$selectedProject.status}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
			required
		/>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Select group..."
			value={groupValue}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		/>
		<input type="number" name="id" hidden value={$selectedProject.id} />
		<Button type="submit" class="self-center bg-accent-500 transition-colors hover:bg-accent-600"
			><i class="fa-solid fa-save pr-2" />Save</Button
		>
	</form>
</Modal>
