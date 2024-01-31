<script lang="ts">
	import { Tooltip, Input, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import SetDueDate from './SetDueDate.svelte';
	import SetPriority from './SetPriority.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let task: Task;
	export let showMenu: number | null;

	let dueDate: Date | null;

	let priority = task.priority;

	let open = false;

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

	let size: 'xs' | 'sm';

	$: size = $windowWidth < 768 ? 'xs' : 'sm';
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-pen text-primary-900 dark:text-primary-50" />
</Button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Edit task</Tooltip>
{/if}
<Modal bind:open outsideclose size="sm">
	<p class="text-lg font-bold dark:text-secondary-50">Edit task</p>
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
				class="border-0 bg-transparent text-xl dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
				required
			>
				<i class="fa-solid fa-file-signature" aria-hidden="true" slot="left" />
			</Input>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={task.description}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={task.id} />
		<div class="flex justify-between">
			<div class="flex gap-1">
				<SetPriority {size} bind:priority />
				<SetDueDate {task} {size} bind:dueDate />
			</div>
			<div class="flex gap-1">
				<Button
					{size}
					on:click={() => {
						open = false;
						showMenu = null;
					}}
				>
					Cancel
				</Button>
				<Button {size} buttonStyle="accent" type="submit" class="self-center">
					<i class="fa-solid fa-save pr-2" />Save
				</Button>
			</div>
		</div>
	</form>
</Modal>
