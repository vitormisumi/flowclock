<script lang="ts">
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { drag } from './drag';
	import { priorityColors } from '$lib/constants/constants';
	import DueDate from './DueDate.svelte';
	import TaskMenu from './TaskMenu.svelte';
	import type { Writable } from 'svelte/store';
	import { windowWidth } from './stores';

	const status: Writable<TaskStatuses[]> = getContext('status');

	export let s: TaskStatuses;
	export let dragDisabled: boolean;
	export let considering;

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
		$status = [...$status];
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
		$status[colIdx].tasks = e.detail.items;
		$status = [...$status];
		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ cardId, event: e.detail }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<div
	class="grid min-h-[40px] w-full gap-1 overflow-scroll"
	use:dndzone={{
		items: s.tasks,
		dragDisabled,
		dropTargetStyle: { 'background-color': '#0b0e0e', outline: '#1b5865 solid 1px' }
	}}
	on:consider={(e) => handleConsider(s.id, e)}
	on:finalize={(e) => handleFinalize(s.id, e)}
>
	{#each s.tasks as task (task.id)}
		<div
			class="flex h-10 w-full select-none items-center justify-between overflow-hidden rounded-lg border-l bg-primary-800 p-2 text-primary-50 hover:cursor-grab hover:bg-primary-700 border-{priorityColors[
				task.priority
			]} "
			animate:flip
			use:drag
			on:dragging={() => (dragDisabled = false)}
			on:mouseenter={() => (showMenu = task.id)}
			on:mouseleave={() => (showMenu = null)}
			role="listitem"
		>
			<p class="truncate text-sm font-light md:text-base">{task.name}</p>
			<div class="flex place-items-center justify-end">
				{#if task.due_date}
					<DueDate date={task.due_date} />
				{/if}
				{#if showMenu === task.id || $windowWidth < 768}
					<TaskMenu {task} bind:showMenu />
				{/if}
			</div>
		</div>
	{/each}
</div>
