<script lang="ts">
    import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
    import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { drag } from './drag';
	import { priorityColors } from '$lib/constants/constants';
    import { invalidateAll } from '$app/navigation';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import DueDate from './DueDate.svelte';
    import type { Writable } from 'svelte/store';

    const status: Writable<TaskStatuses[]> = getContext('status');

	export let s: TaskStatuses;
	export let dragDisabled: boolean;
	export let considering;

	let openEdit: number | null = null;


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
		invalidateAll();
	}
</script>

<div
	class="grid min-h-[40px] w-full gap-1 overflow-scroll rounded-lg"
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
			class="relative flex h-10 w-full select-none items-center justify-between overflow-hidden rounded-lg bg-primary-800 p-2 text-primary-50 hover:cursor-grab hover:bg-primary-600"
			animate:flip
			use:drag
			on:dragging={() => (dragDisabled = false)}
			on:mouseenter={() => (openEdit = task.id)}
			on:mouseleave={() => (openEdit = null)}
			role="listitem"
		>
			<div
				class="absolute -left-2 -top-2 h-4 w-4 rotate-45 transition-colors
				bg-{priorityColors[task.priority]}"
			/>
			<p class="truncate text-sm font-light md:text-base">{task.name}</p>
			{#if openEdit === task.id}
				<div class="flex p-0" in:fade>
					<StartTaskButton {task} />
					<EditTaskButton {task} bind:openEdit />
					<DeleteTaskButton {task} />
				</div>
			{:else if task.due_date}
				<DueDate date={task.due_date} />
			{/if}
		</div>
	{/each}
</div>
