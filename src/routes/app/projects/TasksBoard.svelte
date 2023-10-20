<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { getContext } from 'svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import DeleteStatusButton from './DeleteStatusButton.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	function handleConsiderColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = event.detail.items;
	}

	function handleFinalizeColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = event.detail.items;
	}

	function handleConsiderCards(cardId: number, event: CustomEvent<DndEvent<Task>>) {
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = event.detail.items;
		$status = [...$status];
	}

	async function handleFinalizeCards(cardId: number, event: CustomEvent<DndEvent<Task>>) {
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = event.detail.items;
		$status = [...$status];
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ cardId, event: event.detail }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	let show: number = 0;
</script>

<section
	class="flex justify-stretch gap-2 overflow-x-scroll"
	use:dndzone={{ items: $status, type: 'columns', flipDurationMs: 50 }}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each $status as status (status.id)}
		<div
			class="relative grid w-32 shrink-0 grow content-between overflow-y-scroll rounded-lg bg-primary-900 p-2"
			animate:flip
		>
			<div
				class="absolute flex w-full justify-between p-2"
				on:mouseenter={() => (show = status.id)}
				on:mouseleave={() => (show = 0)}
				role="heading"
				aria-level={3}
			>
				<h3 class="font-medium text-primary-100">
					{status.status}
				</h3>
				{#if show === status.id}
					<DeleteStatusButton {status} />
				{/if}
			</div>
			<div
				class="flex flex-col justify-start gap-2 rounded-lg pt-8"
				use:dndzone={{
					items: status.tasks,
					dropTargetStyle: { outline: '#E35402 solid 1px' }
				}}
				on:consider={(event) => handleConsiderCards(status.id, event)}
				on:finalize={(event) => handleFinalizeCards(status.id, event)}
			>
				{#each status.tasks as item (item.id)}
					<div class="rounded-lg bg-primary-800 p-2 text-primary-50" animate:flip>
						{item.name}
					</div>
				{/each}
			</div>
			<AddTaskButton type="task" status={status.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
