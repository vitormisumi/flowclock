<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';
	import { invalidateAll } from '$app/navigation';
	import { drag } from './drag';
	import { getContext, onMount, onDestroy } from 'svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import EditStatusButton from './EditStatusButton.svelte';
	import TaskList from './TaskList.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let dragDisabled = true;

	let considering = false; 

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
	
	const handleScroll = () => {
		dndRefY = board.scrollLeft;
	};
	
	onMount(() => {
		window.addEventListener('pointermove', handlePointerMove);
		board.addEventListener('scroll', handleScroll);
	});
	
	onDestroy(() => {
		window.removeEventListener('pointermove', handlePointerMove);
		board.removeEventListener('scroll', handleScroll);
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
			<TaskList {s} bind:dragDisabled bind:considering/>
			<AddTaskButton status={s.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
