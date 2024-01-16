<script lang="ts">
	import { Button, Tooltip, Input, Modal, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import SetDueDate from './SetDueDate.svelte';
	import SetPriority from './SetPriority.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let task: Task;
	export let showMenu: number | null;

	let dueDate: Date | null;

	let open = false;

	let priority = task.priority;

	const handleClick: SubmitFunction = ({ formData }) => {
		showMenu = null;
		formData.append('priority', String(priority));
		if (dueDate) {
			formData.append('due_date', dueDate.toISOString());
		}
		return async ({ update }) => {
			open = false;
			update();
		};
	};
</script>

<Button
	size="xs"
	class="bg-transparent transition-colors hover:bg-primary-700"
	on:click={() => (open = true)}
	><i class="fa-solid fa-pen text-primary-50" />
</Button>
<Tooltip placement="left">Edit task</Tooltip>
<Modal
	bind:open
	outsideclose
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<p class="text-lg font-bold text-secondary-50">Edit task</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editTask"
		use:enhance={handleClick}
	>
		<div class="flex flex-wrap">
			<Input
				name="name"
				placeholder="Task name"
				value={task.name}
				class="border-0 bg-transparent text-xl text-secondary-50 placeholder:text-secondary-500"
				required
			>
				<i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" />
			</Input>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={task.description}
			class="border-0 bg-transparent text-secondary-200 placeholder:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={task.id} />
		<div class="flex justify-between">
			<div class="flex gap-1">
				<SetPriority size="sm" bind:priority />
				<SetDueDate {task} size="sm" bind:dueDate />
			</div>
			<div class="flex gap-1">
				<Button
					size="sm"
					on:click={() => {
						open = false;
						showMenu = null;
					}}>Cancel</Button
				>
				<Button
					size="sm"
					type="submit"
					class="self-center bg-accent-500 transition-colors hover:bg-accent-600"
				>
					<i class="fa-solid fa-save pr-2" />Save
				</Button>
			</div>
		</div>
	</form>
</Modal>
