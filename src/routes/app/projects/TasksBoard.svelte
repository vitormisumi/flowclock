<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { getContext } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { priorityColors } from '$lib/constants/constants';
	import { longpress } from './longpress';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import EditStatusButton from './EditStatusButton.svelte';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import DueDate from './DueDate.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let openEdit: number | null = null;

	let dragDisabled = true;

	function handleConsiderColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = event.detail;
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
		$status = newItems;
	}

	async function handleFinalizeColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		const {
			items: newItems,
			info: { source }
		} = event.detail;
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
		$status = newItems;
		const response = await fetch('/api/status', {
			method: 'POST',
			body: JSON.stringify({ event: newItems }),
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
	}

	function handleConsiderCards(cardId: number, event: CustomEvent<DndEvent<Task>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = event.detail;
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = newItems;
		$status = [...$status];
	}

	async function handleFinalizeCards(cardId: number, event: CustomEvent<DndEvent<Task>>) {
		const {
			items: newItems,
			info: { source }
		} = event.detail;
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = event.detail.items;
		$status = [...$status];
		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ cardId, event: event.detail }),
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
	}

	$: console.log(dragDisabled);
</script>

<section
	class="flex justify-stretch gap-2 overflow-x-scroll"
	use:dndzone={{
		items: $status,
		type: 'columns',
		dragDisabled,
		dropTargetStyle: { outline: '#E35402 solid 1px' }
	}}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each $status as status (status.id)}
		<div
			class="grid max-h-96 w-52 shrink-0 grow content-start gap-1 rounded-lg bg-primary-900 p-2 hover:cursor-grab md:w-60"
			animate:flip
			use:longpress
			on:longpress={() => (dragDisabled = false)}
			role="listbox"
			tabindex="0"
		>
			<EditStatusButton {status} />
			<div class="grid h-full content-between gap-1 overflow-hidden">
				<div
					class="grid w-full gap-1 overflow-scroll rounded-lg"
					use:dndzone={{
						items: status.tasks,
						dragDisabled,
						dropTargetStyle: { outline: '#E35402 solid 1px' }
					}}
					on:consider={(event) => handleConsiderCards(status.id, event)}
					on:finalize={(event) => handleFinalizeCards(status.id, event)}
				>
					{#each status.tasks as task (task.id)}
						<div
							class="relative flex h-10 w-full select-none items-center justify-between overflow-hidden rounded-lg bg-primary-800 p-2 text-primary-50 hover:cursor-grab hover:bg-primary-600"
							animate:flip
							use:longpress
							on:longpress={() => (dragDisabled = false)}
							on:mouseenter={() => (openEdit = task.id)}
							on:mouseleave={() => (openEdit = null)}
							role="listitem"
						>
							<div
								class="absolute -left-2 -top-2 h-4 w-4 rotate-45 transition-colors
									bg-{priorityColors[task.priority]}"
							></div>
							<!-- <i class="fa-solid fa-grip-vertical absolute text-secondary-400 md:hidden" /> -->
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
				<AddTaskButton status={status.id} />
			</div>
		</div>
	{/each}
	<AddStatusButton />
</section>
