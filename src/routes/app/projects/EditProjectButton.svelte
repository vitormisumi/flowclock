<script lang="ts">
	import { Tooltip, Input, Select, Textarea } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { windowWidth } from '../stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { Writable } from 'svelte/store';
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

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-pen text-primary-900 dark:text-primary-50" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Edit project</Tooltip>
{/if}
<Modal bind:open outsideclose size="sm">
	<p class="text-lg font-bold dark:text-secondary-50">Edit project {$selectedProject.name}</p>
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
			class="border-0 bg-transparent text-xl dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<Input
			name="goal"
			placeholder="Project goal"
			value={$selectedProject.goal}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		></Input>
		<Textarea
			name="description"
			placeholder="Description"
			value={$selectedProject.description}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		></Textarea>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Select status..."
			value={$selectedProject.status}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			required
		/>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Select group..."
			value={groupValue}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		/>
		<input type="number" name="id" hidden value={$selectedProject.id} />
		<Button
			type="submit"
			class="self-center transition-colors dark:bg-accent-500 hover:dark:bg-accent-600"
			><i class="fa-solid fa-save pr-2" />Save</Button
		>
	</form>
</Modal>
