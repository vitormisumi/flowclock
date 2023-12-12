<script lang="ts">
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import { sorting } from './stores';
	import EditToDoButton from './EditToDoButton.svelte';
	import DeleteToDoButton from './DeleteToDoButton.svelte';
	import CompleteToDoButton from './CompleteToDoButton.svelte';
	import ToDosDetails from './ToDosDetails.svelte';
	import type { Writable } from 'svelte/store';

	const toDos: Writable<ToDo[]> = getContext('toDos');

	$: switch ($sorting.toDos) {
		case 'due_date':
			$toDos = $toDos.sort((a, b) => {
				if (a.due_date === null && b.due_date === null) return 0;
				if (a.due_date === null) return 1;
				if (b.due_date === null) return -1;
				const dateA = new Date(a.due_date);
				const dateB = new Date(b.due_date);
				return dateA.getTime() - dateB.getTime();
			});
			break;
		case 'priority':
			$toDos = $toDos.sort((a, b) => b.priority - a.priority);
			break;
		case 'name':
			$toDos = $toDos.sort((a, b) => a.name.localeCompare(b.name));
			break;
	}

	$: console.log($toDos);

	export let show: boolean;

	let openRow: number | null = null;

	let openEdit: number | null = null;
</script>

<ul class="grid gap-1">
	{#each $toDos as toDo, i}
		{#if toDo.project_id === $selectedProject.id && (toDo.done === false || show === true)}
			<li
				class="grid w-full rounded-lg border border-primary-900 bg-primary-900"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
			>
				<div class="flex gap-2 overflow-hidden px-2">
					<CompleteToDoButton {toDo} />
					<button
						class="h-10 grow overflow-hidden text-left font-light text-primary-50 {toDo.done ===
						true
							? 'line-through'
							: 'no-underline'} truncate"
						on:click={() => (openRow = openRow === i ? null : i)}
						on:keydown={() => (openRow = openRow === i ? null : i)}
					>
						{toDo.name}
					</button>
					{#if openEdit === i}
						<div in:fade class="flex py-1.5">
							<EditToDoButton {toDo} />
							<DeleteToDoButton {toDo} />
						</div>
					{/if}
				</div>
				{#if openRow === i}
					<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
						<ToDosDetails {toDo} />
					</div>
				{/if}
			</li>
		{/if}
	{/each}
</ul>
