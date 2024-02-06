<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Select, Textarea } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let group: ProjectGroup;

	const projectGroups: Writable<ProjectGroup[]> = getContext('projectGroups');

	let open = true;

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
	size="xs"
	buttonStyle="add"
	class="hover:bg-secondary-100/50 hover:dark:bg-secondary-800/50"
	on:click={() => (open = true)}
>
	<i class="fa-solid fa-plus pr-2" />new project
</Button>
<Modal bind:open outsideclose size="sm">
	<h2 class="text-lg font-bold text-primary-900 dark:text-primary-50">New project</h2>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/add"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Project name"
			class="border-0 bg-transparent text-lg dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<div class="flex place-items-start">
			<Input
				name="goal"
				placeholder="Project goal"
				class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			></Input>
			<Textarea
				name="description"
				placeholder="Description"
				class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			></Textarea>
		</div>
		<Select
			items={statusOptions}
			name="status"
			placeholder="Project status..."
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
			required
		></Select>
		<Select
			items={groupOptions}
			name="group_id"
			placeholder="Project group..."
			value={group.id}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		/>
		<Button
			type="submit"
			buttonStyle="accent"
			class="w-fit self-center"
			disabled={loading}
			on:click
		>
			<i class="fa-solid fa-save pr-2" />Save new project
		</Button>
	</form>
</Modal>
