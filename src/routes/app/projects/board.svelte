<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';
    import type { Writable } from 'svelte/store';
    import { getContext } from 'svelte';

    const status: Writable<TaskStatuses[]> = getContext('status');

	function handleConsiderColumns(e: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = e.detail.items;
	}

	function handleFinalizeColumns(e: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = e.detail.items;
	}

	function handleConsiderCards(cardId: number, e: CustomEvent<DndEvent<Task>>) {
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = e.detail.items;
		$status = [...$status];
	}

	function handleFinalizeCards(cardId: number, e: CustomEvent<DndEvent<Task>>) {
		const colIdx = $status.findIndex((c) => c.id === cardId);
		$status[colIdx].tasks = e.detail.items;
		$status = [...$status];
	}
</script>

<section
	class="flex w-full gap-2"
	use:dndzone={{ items: $status, type: 'columns' }}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each $status as column (column.id)}
		<div class="w-full rounded-lg bg-primary-900 p-2" animate:flip>
			<div>{column.status}</div>
			<div
				class="flex h-full flex-col justify-start gap-2 rounded-lg"
				use:dndzone={{ items: column.tasks }}
				on:consider={(e) => handleConsiderCards(column.id, e)}
				on:finalize={(e) => handleFinalizeCards(column.id, e)}
			>
				{#each column.tasks as item (item.id)}
					<div class="rounded-lg bg-primary-800 p-2 text-primary-50" animate:flip>
						{item.name}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
