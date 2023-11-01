<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { getContext } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import AddTaskButton from './AddTaskButton.svelte';
	import AddStatusButton from './AddStatusButton.svelte';
	import EditStatusButton from './EditStatusButton.svelte';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import type { DndEvent } from 'svelte-dnd-action';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let openEdit: number | null = null;

	function handleConsiderColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = event.detail.items;
	}

	async function handleFinalizeColumns(event: CustomEvent<DndEvent<TaskStatuses>>) {
		$status = event.detail.items;
		const response = await fetch('/api/status', {
			method: 'POST',
			body: JSON.stringify({ event: event.detail.items }),
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
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
		const response = await fetch('/api/tasks', {
			method: 'POST',
			body: JSON.stringify({ cardId, event: event.detail }),
			headers: {
				'content-type': 'application/json'
			}
		});
		invalidateAll();
	}
</script>

<section
	class="flex justify-stretch gap-2 overflow-x-scroll"
	use:dndzone={{
		items: $status,
		type: 'columns',
		flipDurationMs: 50,
		dropTargetStyle: { outline: '#E35402 solid 1px' }
	}}
	on:consider={handleConsiderColumns}
	on:finalize={handleFinalizeColumns}
>
	{#each $status as status (status.id)}
		<div
			class="relative grid max-h-96 w-52 shrink-0 grow content-between overflow-y-scroll rounded-lg bg-primary-900 p-2 md:w-60"
			animate:flip
		>
			<div class="absolute flex h-12 w-full justify-between p-2">
				<EditStatusButton {status} />
			</div>
			<div
				class="grid w-full gap-2 rounded-lg pt-10"
				use:dndzone={{
					items: status.tasks,
					dropTargetStyle: { outline: '#E35402 solid 1px' }
				}}
				on:consider={(event) => handleConsiderCards(status.id, event)}
				on:finalize={(event) => handleFinalizeCards(status.id, event)}
			>
				{#each status.tasks as task (task.id)}
					<div
						class="flex h-10 w-full items-center justify-between rounded-lg bg-primary-800 p-2 text-primary-50"
						on:mouseenter={() => (openEdit = task.id)}
						on:mouseleave={() => (openEdit = null)}
						animate:flip
						role="cell"
						tabindex="0"
					>
						<p>{task.name}</p>
						{#if openEdit === task.id}
							<div class="flex p-0" in:fade>
								<StartTaskButton {task}/>
								<EditTaskButton {task} />
								<DeleteTaskButton {task} />
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<AddTaskButton status={status.id} />
		</div>
	{/each}
	<AddStatusButton />
</section>
