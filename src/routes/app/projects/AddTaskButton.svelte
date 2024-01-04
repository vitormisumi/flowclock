<script lang="ts">
	import { Button, Input, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { selectedProject } from './stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import SetDueDate from './SetDueDate.svelte';
	import SetPriority from './SetPriority.svelte';

	export let status: number;

	let dueDate: Date;

	let priority: number = 0;

	let open = false;

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
			loading = false;
			open = false;
			update();
		};
	};
</script>

{#if open}
	<div
		class="rounded-lg bg-primary-800 p-4 text-center landscape:left-8 landscape:md:left-12"
		transition:slide
	>
		<form
			class="flex flex-col gap-1 text-left"
			method="POST"
			action="?/addTask"
			use:enhance={handleClick}
		>
			<Input
				name="name"
				placeholder="Task"
				class="border-0 bg-transparent text-lg text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
				required
			></Input>
			<Textarea
				name="description"
				placeholder="Description"
				class="border-0 bg-transparent text-secondary-50 placeholder:text-secondary-500 focus:ring-0"
			></Textarea>
			<div class="flex justify-between">
				<div class="flex gap-1">
					<SetPriority size="xs" bind:priority />
					<SetDueDate task={null} size="xs" bind:dueDate />
				</div>
				<div class="flex gap-1">
					<Button size="xs" disabled={loading} on:click={() => (open = false)}>Cancel</Button>
					<Button
						size="xs"
						type="submit"
						class="bg-accent-500 hover:bg-accent-600"
						disabled={loading}
					>
						Add Task
					</Button>
				</div>
			</div>
		</form>
	</div>
{:else}
	<Button
		size="xs"
		class="bg-transparent text-secondary-400 transition-colors hover:bg-transparent hover:text-secondary-200"
		on:click={() => (open = true)}><i class="fa-solid fa-plus pr-2" />add task</Button
	>
{/if}

<style>
	:root {
		--date-picker-foreground: #ebf7fa;
		--date-picker-background: #0b0e0e;
		--date-picker-highlight-border: transparent;
		--date-picker-highlight-shadow: transparent;
		--date-picker-selected-color: #ebf7fa;
		--date-picker-selected-background: #e35403;
	}
</style>
