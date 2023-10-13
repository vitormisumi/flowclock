<script lang="ts">
	import {
		Button,
		Card,
		Checkbox,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import AddTaskButton from './AddTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import type { Writable } from 'svelte/store';
	import type { Task } from '../types';

	const tasks: Writable<Task[]> = getContext('tasks');

	const priorityOptions: { [key: number]: string } = {
		3: 'High',
		2: 'Medium',
		1: 'Low',
		0: 'None'
	};

	let openRow: number | null = null;

	function toggleRow(i: number) {
		openRow = openRow === i ? null : i;
	}

	let openEdit: number | null = null;

	function mouseEnter(i: number) {
		openEdit = i;
	}

	function mouseLeave() {
		openEdit = null;
	}

	let clicked: number;
</script>

<Card class="h-full min-w-full gap-1 border-0 bg-primary-800">
	<h2>To-Dos</h2>
	<Table hoverable shadow>
		<TableBody>
			{#each $tasks as task, i}
				{#if task.project_id === $selectedProject.id && task.type === 'to-do'}
					<TableBodyRow
						class="cursor-pointer border-primary-800 bg-primary-900 hover:bg-primary-800 lg:text-base"
					>
						<TableBodyCell class="p-0 font-light text-primary-50">
							<div
								class="flex h-10 items-center justify-between p-2"
								on:mouseenter={() => mouseEnter(i)}
								on:mouseleave={() => mouseLeave()}
								role="row"
								tabindex={i}
							>
								<form method="POST" action="?/completeTask">
									<input type="number" name="id" value={task.id} hidden />
									<Button type="submit" class="h-5 w-5 rounded-full p-0"></Button>
								</form>
								<div
									on:click={() => toggleRow(i)}
									on:keydown={() => toggleRow(i)}
									role="row"
									tabindex={i}
									class="w-full"
								>
									<p class="{task.status === 'done' ? 'line-through': 'no-underline'}">{task.name}</p>
								</div>
								{#if openEdit === i}
									<div transition:fade class="flex">
										<EditTaskButton {task} />
										<DeleteTaskButton {task} />
									</div>
								{/if}
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/if}
				{#if openRow === i}
					<TableBodyRow class="border-primary-800">
						<TableBodyCell colspan="3" class="bg-primary-900 p-0">
							<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
								{#if task.description}
									<p class="whitespace-normal text-primary-100">
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
	<AddTaskButton type="to-do" />
</Card>
