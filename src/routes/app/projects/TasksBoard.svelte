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
	class="flex w-full gap-2 overflow-x-scroll"
	use:dndzone={{ items: $status, type: 'columns' }}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each $status as column (column.id)}
		<div class="w-full rounded-lg bg-primary-900 p-2" animate:flip>
			<div
				class="flex justify-between"
				on:mouseenter={() => (show = column.id)}
				on:mouseleave={() => (show = 0)}
				role="heading"
				aria-level={3}
			>
				<h3>
					{column.status}
				</h3>
				{#if show === column.id}
					<DeleteStatusButton id={column.id}/>
				{/if}
			</div>
			<div
				class="flex h-full flex-col justify-start gap-2 rounded-lg"
				use:dndzone={{ items: column.tasks }}
				on:consider={(event) => handleConsiderCards(column.id, event)}
				on:finalize={(event) => handleFinalizeCards(column.id, event)}
			>
				{#each column.tasks as item (item.id)}
					<div class="rounded-lg bg-primary-800 p-2 text-primary-50" animate:flip>
						{item.name}
					</div>
				{/each}
			</div>
			<AddTaskButton type="task" status={column.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
