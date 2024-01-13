<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { drag } from './drag';
	import { getContext, onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import EditStatusButton from './EditStatusButton.svelte';
	import TaskList from './TaskList.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let dragDisabled = true;
	let considering = false;
	let board: HTMLElement;
	let pointerPosition = { x: 0, y: 0 };
	let dndRefY = 0;
	const pixelsFromEdge = 30;
	const scrollSpeed = 2;

	function handleConsider(e: CustomEvent<DndEvent<TaskStatuses>>) {
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

	async function handleFinalize(e: CustomEvent<DndEvent<TaskStatuses>>) {
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
		items: $status,
		type: 'columns',
		dragDisabled,
		dropTargetStyle: { outline: '#E35402 solid 1px' }
	}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	bind:this={board}
>
	{#each $status as s (s.id)}
		<div
			class="grid max-h-96 w-52 shrink-0 grow content-start gap-1 overflow-hidden rounded-lg bg-primary-900 p-2 hover:cursor-grab md:w-60"
			animate:flip
			use:drag
			on:dragging={() => (dragDisabled = false)}
		>
			<EditStatusButton {s} />
			<TaskList {s} bind:dragDisabled bind:considering />
			<AddTaskButton status={s.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
