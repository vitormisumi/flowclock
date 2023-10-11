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
							<div class="flex gap-4 p-2 font-light" transition:slide>
								<p class="text-primary-100">
									{task.description ? task.description : ''}
								</p>
								<p class="text-primary-100">
									<i class="fa-solid fa-calendar pr-2" />{task.due_date}
								</p>
								<p class="text-primary-100">
									<i class="fa-solid fa-flag pr-2" />{task.priority ? task.priority : ''}
								</p>
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
	<AddTaskButton />
</Card>
