<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import AddStatusButton from './AddStatusButton.svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import { drag } from './drag';
	import EditStatusButton from './EditStatusButton.svelte';
	import TaskList from './TaskList.svelte';

	export let status: TaskStatus[];

	export let notifications: number;
	export let success: boolean | undefined;
	export let message: string;

	let dragDisabled = true;
	let considering = false;
	let board: HTMLElement;
	let pointerPosition = { x: 0, y: 0 };
	let dndRefY = 0;
	const pixelsFromEdge = 30;
	const scrollSpeed = 2;

	function handleConsider(e: CustomEvent<DndEvent<TaskStatus>>) {
		const {
			items: newItems,
			info: { source, trigger }
		} = e.detail;
		considering = true;
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
		status = newItems;
	}

	async function handleFinalize(e: CustomEvent<DndEvent<TaskStatus>>) {
		const {
			items: newItems,
			info: { source }
		} = e.detail;
		considering = false;
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}

		const orderedStatusColumns = newItems.map(({ tasks, ...item }, index) => ({
			...item,
			order: index + 1
		}));

		const orderedStatus = newItems.map((item, index) => ({ ...item, order: index + 1 }));
		status = orderedStatus;

		const response = await fetch('/api/status', {
			method: 'POST',
			body: JSON.stringify({ statuses: orderedStatusColumns }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			success = true;
			message = 'Statuses order saved';
			notifications += 1;
		} else {
			success = false;
			message = 'Statuses order could not be saved';
		}
	}

	function isWithinBoard(x: number, y: number) {
		return x >= 0 && x <= board.clientWidth && y >= 0 && y <= board.clientHeight;
	}

	function handlePointerMove(e: PointerEvent) {
		const { top, left } = board.getBoundingClientRect();
		pointerPosition.y = e.clientY - top;
		pointerPosition.x = e.clientX - left;
	}

	function handleScroll() {
		dndRefY = board.scrollLeft;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('pointermove', handlePointerMove);
			board.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('pointermove', handlePointerMove);
			board.removeEventListener('scroll', handleScroll);
		}
	});

	$: if (board && considering && isWithinBoard(pointerPosition.x, pointerPosition.y)) {
		dndRefY;
		if (pointerPosition.x < pixelsFromEdge) {
			board.scrollLeft -= scrollSpeed;
		} else if (pointerPosition.x > board.clientWidth - pixelsFromEdge) {
			board.scrollLeft += scrollSpeed;
		}
	}
</script>

<section
	class="flex justify-stretch gap-2 overflow-auto"
	use:dndzone={{
		items: status,
		type: 'columns',
		dragDisabled,
		dropTargetStyle: { outline: '#309FB6 solid 2px' }
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	bind:this={board}
>
	{#each status as s (s.id)}
		<div
			class="grid max-h-96 w-52 shrink-0 grow content-start justify-items-center gap-1 overflow-hidden rounded-lg bg-secondary-50 p-2 hover:cursor-grab dark:bg-secondary-900 landscape:w-80"
			animate:flip
			use:drag
			on:dragging={() => (dragDisabled = false)}
		>
			<EditStatusButton {s} />
			<TaskList
				{s}
				bind:dragDisabled
				bind:considering
				bind:notifications
				bind:success
				bind:message
			/>
			<AddTaskButton status={s.id} />
		</div>
	{/each}
	<AddStatusButton {status} />
</section>
