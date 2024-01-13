<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { getContext } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { priorityColors } from '$lib/constants/constants';
	import { drag } from './drag';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import EditStatusButton from './EditStatusButton.svelte';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import DueDate from './DueDate.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let openEdit: number | null = null;

	let dragDisabled = true;

	let considering = false; 

	function handleConsiderColumns(e: CustomEvent<DndEvent<TaskStatuses>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		considering = true;
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
		$status = newItems;
	}

	async function handleFinalizeColumns(e: CustomEvent<DndEvent<TaskStatuses>>) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		considering = false;
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

	function handleConsiderCards(cardId: number, e: CustomEvent<DndEvent<Task>>) {
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

	async function handleFinalizeCards(cardId: number, e: CustomEvent<DndEvent<Task>>) {
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

	let board: HTMLElement;
	let mouseY = 0;
	let mouseX = 0;
	let dndRefY = 0; 

	$: if (board && considering && mouseX >= 0 && mouseX <= board.clientWidth && mouseY >= 0 && mouseY <= board.clientHeight) {
		dndRefY 
			if (mouseX < 30) {
				board.scrollLeft -= 2;
			} else if (mouseX > board.clientWidth - 30) {
				board.scrollLeft += 2; 
			}
		}

	const handlePointerMove = (e: PointerEvent) => {
		const {top, left} = board.getBoundingClientRect();
		mouseY = e.clientY - top;
		mouseX = e.clientX - left;
	};
	
	const scrollHandler = () => {
		dndRefY = board.scrollLeft;	
	};
	

	onMount(() => {
			window.addEventListener('pointermove', handlePointerMove);
			board.addEventListener('scroll', scrollHandler);
	});
	
	onDestroy(() => {
		window.removeEventListener('pointermove', handlePointerMove);
		board.removeEventListener('scroll', scrollHandler);
	});
</script>

<section
	class="flex justify-stretch gap-2 overflow-auto"
	use:dndzone={{
		items: $status,
		type: 'columns',
		dragDisabled,
		dropTargetStyle: { outline: '#E35402 solid 1px' }
	}}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
	bind:this={board}
>
	{#each $status as status (status.id)}
		<div
			class="grid max-h-96 w-52 shrink-0 grow content-start gap-1 overflow-hidden rounded-lg bg-primary-900 p-2 hover:cursor-grab md:w-60"
			animate:flip
			use:drag
			on:dragging={() => (dragDisabled = false)}
		>
			<EditStatusButton {status} />
			<div
				class="grid min-h-[40px] w-full gap-1 overflow-scroll rounded-lg"
				use:dndzone={{
					items: status.tasks,
					dragDisabled,
					dropTargetStyle: { 'background-color': '#0b0e0e', outline: '#1b5865 solid 1px' }
				}}
				on:consider={(e) => handleConsiderCards(status.id, e)}
				on:finalize={(e) => handleFinalizeCards(status.id, e)}
			>
				{#each status.tasks as task (task.id)}
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
			<AddTaskButton status={status.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
