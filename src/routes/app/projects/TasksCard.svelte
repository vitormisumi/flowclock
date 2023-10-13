<script lang="ts">
	import { Card, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import type { Writable } from 'svelte/store';
	import type { Task } from '../types';
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import { slide } from 'svelte/transition';

	const tasks: Writable<Task[]> = getContext('tasks');

	const priorityOptions: {[key: number]: string} = {
		3: 'High',
		2: 'Medium',
		1: 'Low',
		0: 'None'
	}

	let openRow: number | null = null;

	const toggleRow = (i: number) => {
		openRow = openRow === i ? null : i;
	};
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<h2>Tasks</h2>
	<Table hoverable shadow>
		<TableBody>
			{#each $tasks as task, i}
				{#if task.project_id === $selectedProject.id}
					<TableBodyRow
						class="cursor-pointer border-primary-800 bg-primary-900 hover:bg-primary-800 lg:text-base"
					>
						<TableBodyCell class="p-1 font-light text-primary-50" on:click={() => toggleRow(i)}>
							<p>{task.name}</p>
						</TableBodyCell>
						<TableBodyCell class="w-0 px-0 py-1">
							<EditTaskButton {task} />
						</TableBodyCell>
						<TableBodyCell class="w-0 px-0 py-1">
							<DeleteTaskButton {task} />
						</TableBodyCell>
					</TableBodyRow>
				{/if}
				{#if openRow === i}
					<TableBodyRow class="border-primary-800">
						<TableBodyCell colspan="3" class="bg-primary-900 p-0">
							<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
								{#if task.description}
									<p class="text-primary-100 whitespace-normal">
										{task.description}
									</p>
								{/if}
								{#if task.due_date}
									<p class="text-primary-100">
										<i class="fa-solid fa-calendar pr-2" />{task.due_date}
									</p>
								{/if}
								{#if task.priority}
									<p class="text-primary-100">
										<i class="fa-solid fa-flag pr-2" />{priorityOptions[task.priority]}
									</p>
								{/if}
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
	<AddTaskButton />
</Card>
