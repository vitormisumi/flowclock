<script lang="ts">
	import { Button, Tooltip, Input, Modal, Select } from 'flowbite-svelte';
	import { selectedProject } from './stores';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Task } from '../types';

	export let task: Task;

	let open = false;

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
<Tooltip placement="left">Edit task</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit task {task.name}</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editTask"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Task name"
			value={task.name}
			class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
			required><i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" /></Input
		>
		<Input
			name="description"
			placeholder="Description"
			value={task.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
			><i class="fa-solid fa-file-lines" aria-hidden="true" slot="left" /></Input
		>
		<input type="number" name="id" hidden value={task.id} />
		<div class="flex justify-center gap-1">
			<Button on:click={() => (open = false)}>Cancel</Button>
			<Button type="submit" class="self-center bg-accent-500 hover:bg-accent-600"
				><i class="fa-solid fa-save pr-2" />Save</Button
			>
		</div>
	</form>
</Modal>
