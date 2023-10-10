<script lang="ts">
	import { Tooltip, Button, Modal, Input, Select } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { ProjectGroup } from '../types';
	import { getContext } from 'svelte';

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
</script>

<Button on:click={() => (open = true)} class="self-end"><i class="fa-solid fa-plus" /></Button>
<Tooltip>Add new project</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<h2 class="text-lg font-bold text-primary-50">New project</h2>
	<form class="flex flex-col gap-4 text-left" method="POST" action="?/add" use:enhance>
		<Input
			name="name"
			placeholder="Project name"
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			><i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" /></Input
		>
		<Input
			name="goal"
			placeholder="Project goal"
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			><i class="fa-solid fa-bullseye" aria-hidden="true" slot="left" /></Input
		>
		<Input
			name="description"
			placeholder="Description"
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
			><i class="fa-solid fa-file-lines" aria-hidden="true" slot="left" /></Input
		>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Project status..."
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
		/>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Project group..."
			class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500"
		/>
		<Button
			type="submit"
			class="self-center bg-accent-500 hover:bg-accent-600"
			on:click={() => (open = false)}><i class="fa-solid fa-plus pr-2" />New project</Button
		>
	</form>
</Modal>
