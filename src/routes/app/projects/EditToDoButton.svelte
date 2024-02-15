<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Textarea } from 'flowbite-svelte';
	import { canHover } from '../stores';
	import SetDueDate from './SetDueDate.svelte';
	import SetPriority from './SetPriority.svelte';

	export let toDo: ToDo;
	export let showMenu: number | null;

	let dueDate: Date | null;

	let priority = toDo.priority;

	let open = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		showMenu = null;
		formData.append('priority', priority);
		if (dueDate) {
			formData.append('due_date', dueDate.toISOString());
		}
		return async ({ update }) => {
			open = false;
			update();
		};
	};

	let size: 'xs' | 'sm';

	$: size = !$canHover ? 'xs' : 'sm';
</script>

<Button size="xs" buttonStyle="menu" on:click={() => (open = true)}>
	<i class="fa-solid fa-pen text-primary-900 dark:text-primary-50" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Edit to-do</Tooltip>
{/if}
<Modal bind:open outsideclose size="sm">
	<p class="text-lg font-bold dark:text-secondary-50">Edit to-do</p>
	<form
		class="flex flex-col gap-2 text-left"
		method="POST"
		action="?/editToDo"
		use:enhance={handleClick}
	>
		<div class="flex flex-wrap">
			<Input
				name="name"
				placeholder="Task name"
				value={toDo.name}
				class="border-0 bg-transparent text-xl dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
				required
			></Input>
		</div>
		<Textarea
			name="description"
			placeholder="Description"
			value={toDo.description}
			class="border-0 bg-transparent dark:bg-transparent dark:text-secondary-200 placeholder:dark:text-secondary-500"
		></Textarea>
		<input type="number" name="id" hidden value={toDo.id} />
		<div class="flex justify-between">
			<div class="flex gap-1">
				<SetPriority {size} bind:priority />
				<SetDueDate task={toDo} {size} bind:dueDate />
			</div>
			<div class="flex gap-1">
				<Button
					{size}
					buttonStyle="cancel"
					on:click={() => {
						open = false;
						showMenu = null;
					}}>Cancel</Button
				>
				<Button {size} buttonStyle="accent" type="submit" class="self-center">
					<i class="fa-solid fa-save pr-2" />Save
				</Button>
			</div>
		</div>
	</form>
</Modal>
