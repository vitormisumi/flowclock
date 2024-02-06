<script lang="ts">
	import { priorityColor } from '$lib/functions/functions';
	import { getContext } from 'svelte';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { windowWidth } from '../stores';
	import { drag } from './drag';
	import DueDate from './DueDate.svelte';
	import TaskMenu from './TaskMenu.svelte';

	const status: Writable<TaskStatuses[]> = getContext('status');

	export let s: TaskStatuses;
	export let dragDisabled: boolean;
	export let considering: boolean;
	export let notifications: number;
	export let success: boolean | undefined;
	export let message: string;

	let openRow: number | null = null;
	let opening = false;

	let showMenu: number | null = null;

	function handleConsider(cardId: number, e: CustomEvent<DndEvent<Task>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		considering = true;
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = newItems;
	}

	async function handleFinalize(cardId: number, e: CustomEvent<DndEvent<Task>>) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		considering = false;
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
		const colIdx = $status.findIndex((c) => c.id === cardId);

		const orderedTasks = newItems.map((item, index) => ({
			...item,
			order: newItems.length - index,
			status_id: cardId
		}));

		$status[colIdx].tasks = orderedTasks;

		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ event: e.detail, tasks: orderedTasks }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			success = true;
			message = 'Tasks order saved';
			notifications += 1;
		} else {
			success = false;
			message = 'Tasks order could not be saved';
		}
	}

	function handleClick(task: Task) {
		openRow = task.description && openRow === null ? task.id : null;
		opening = true;
		setTimeout(() => (opening = false), 400);
	}
</script>

<ul
	class="relative grid min-h-[40px] w-full gap-1 overflow-auto rounded-lg"
	use:dndzone={{
		items: s.tasks,
		dragDisabled,
		dropTargetStyle: { outline: '#309FB6 solid 2px' }
	}}
	on:consider={(e) => handleConsider(s.id, e)}
	on:finalize={(e) => handleFinalize(s.id, e)}
>
	{#each s.tasks as task (task.id)}
		<li
			class="grid w-full rounded-lg border-l bg-secondary-100 px-2 text-primary-900 hover:bg-primary-200 dark:bg-secondary-800 dark:text-primary-50 hover:dark:bg-primary-800 {priorityColor(
				task.priority,
				'border'
			)}"
			animate:flip={{ duration: opening ? 0 : (d) => Math.sqrt(d) * 120 }}
			use:drag
			on:dragging={() => (dragDisabled = false)}
			on:mouseenter={() => (showMenu = task.id)}
			on:mouseleave={() => (showMenu = null)}
		>
			<div class="flex items-center gap-2 overflow-hidden">
				<div
					class="flex h-10 w-full items-center truncate text-left text-sm font-light text-primary-900 dark:text-primary-50 md:text-base {task.description
						? 'hover:cursor-pointer'
						: 'hover:cursor-grab'}"
					on:click={() => handleClick(task)}
					on:keydown={() => handleClick(task)}
					role="button"
					tabindex="0"
				>
					{task.name}
				</div>
				{#if task.due_date}
					<DueDate date={task.due_date} />
				{/if}
				{#if showMenu === task.id || $windowWidth < 768}
					<TaskMenu {task} bind:showMenu />
				{/if}
			</div>
			{#if openRow === task.id}
				<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
					<p
						class="whitespace-normal text-sm font-light text-primary-800 dark:text-primary-100 md:text-base"
					>
						{task.description}
					</p>
				</div>
			{/if}
		</li>
	{/each}
	<div
		class="sticky bottom-0 h-8 w-full bg-gradient-to-b from-transparent to-secondary-50 dark:to-secondary-900"
	/>
</ul>
