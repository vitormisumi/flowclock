<script lang="ts">
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import type { Writable } from 'svelte/store';

	const tasks: Writable<Task[]> = getContext('tasks');

	const priorityOptions: { [key: number]: string } = {
		3: 'High',
		2: 'Medium',
		1: 'Low',
		0: 'None'
	};

	let filteredTasks: Task[];
	$: filteredTasks = $tasks.filter(
		(x) => x.project_id === $selectedProject.id && x.type === 'task'
	);

	let details: number | null = null;

	function toggleRow(i: number) {
		details = details === i ? null : i;
	}

	let openEdit: number | null = null;

	function mouseEnter(i: number) {
		openEdit = i;
	}

	function mouseLeave() {
		openEdit = null;
	}
</script>

<div>
	{#each filteredTasks as task, i}
		<div
			class="flex h-10 items-center justify-between p-2"
			on:mouseenter={() => mouseEnter(i)}
			on:mouseleave={() => mouseLeave()}
			role="row"
			tabindex={i}
		>
			<div
				on:click={() => toggleRow(i)}
				on:keydown={() => toggleRow(i)}
				role="row"
				tabindex={i}
				class="w-full"
			>
				<p>{task.name}</p>
			</div>
			{#if openEdit === i}
				<div transition:fade class="flex">
					<EditTaskButton {task} />
					<DeleteTaskButton {task} />
				</div>
			{/if}
		</div>
		{#if details === i}
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
		{/if}
	{/each}
</div>
