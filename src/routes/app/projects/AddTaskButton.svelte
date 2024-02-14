<script lang="ts">
	import { enhance } from '$app/forms';
	import AddWindowDesktop from '$lib/components/AddWindowDesktop.svelte';
	import AddWindowMobile from '$lib/components/AddWindowMobile.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Textarea } from 'flowbite-svelte';
	import { isMobile } from '../stores';
	import SetDueDate from './SetDueDate.svelte';
	import SetPriority from './SetPriority.svelte';
	import { selectedProject } from './stores';

	export let status: number;

	let dueDate: Date | null;

	let priority: '0' | '1' | '2' | '3' = '0';

	let hidden = true;

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		loading = true;
		formData.append('project_id', String($selectedProject.id));
		formData.append('status_id', String(status));
		formData.append('priority', String(priority));
		if (dueDate) {
			formData.append('due_date', dueDate.toISOString());
		}
		return async ({ update }) => {
			priority = '0';
			loading = false;
			hidden = true;
			update();
		};
	};

	let component: typeof AddWindowMobile | typeof AddWindowDesktop;
	$: component = $isMobile ? AddWindowMobile : AddWindowDesktop;
</script>

{#if hidden || $isMobile}
	<Button
		size="xs"
		buttonStyle="add"
		class="w-full hover:bg-secondary-100/50 hover:dark:bg-secondary-800/50"
		on:click={() => {
			hidden = false;
			dueDate = null;
		}}
	>
		<i class="fa-solid fa-plus pr-2" />add task
	</Button>
{/if}
<svelte:component this={component} bgColor="bg-secondary-100 dark:bg-secondary-800" bind:hidden>
	<form
		class="flex w-full flex-col gap-1 text-left"
		method="POST"
		action="?/addTask"
		use:enhance={handleClick}
	>
		<Input
			name="name"
			placeholder="Task"
			class="border-0 bg-transparent text-lg focus:ring-0 dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
			required
		></Input>
		<Textarea
			name="description"
			placeholder="Description"
			class="border-0 bg-transparent focus:ring-0 dark:bg-transparent dark:text-secondary-50 placeholder:dark:text-secondary-500"
		></Textarea>
		<div class="flex justify-between gap-5">
			<div class="flex gap-1">
				<SetPriority size="xs" bind:priority />
				<SetDueDate task={null} size="xs" bind:dueDate />
			</div>
			<div class="flex gap-1">
				<Button
					size="xs"
					buttonStyle="cancel"
					disabled={loading}
					on:click={() => {
						hidden = true;
						priority = '0';
					}}
				>
					Cancel
				</Button>
				<Button size="xs" buttonStyle="accent" type="submit" disabled={loading}>Add Task</Button>
			</div>
		</div>
	</form>
</svelte:component>
