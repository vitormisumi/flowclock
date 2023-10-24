<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import EditToDoButton from './EditToDoButton.svelte';
	import DeleteToDoButton from './DeleteToDoButton.svelte';
	import CompleteToDoButton from './CompleteToDoButton.svelte';
	import type { Writable } from 'svelte/store';

	const toDos: Writable<ToDo[]> = getContext('toDos');

	export let show: boolean;

	const priorityOptions: { [key: number]: string } = {
		3: 'High',
		2: 'Medium',
		1: 'Low',
		0: 'None'
	};

	let openRow: number | null = null;

	function toggleRow(i: number) {
		openRow = openRow === i ? null : i;
	}

	let openEdit: number | null = null;

	function mouseEnter(i: number) {
		openEdit = i;
	}

	function mouseLeave() {
		openEdit = null;
	}
</script>

<Table hoverable shadow>
	<TableBody>
		{#each $toDos as toDo, i}
			{#if toDo.project_id === $selectedProject.id && (toDo.done ===false || show === true)}
				<TableBodyRow
					class="cursor-pointer border-primary-800 bg-primary-900 hover:bg-primary-800 lg:text-base"
				>
					<TableBodyCell class="p-0 font-light text-primary-50">
						<div
							class="flex h-10 items-center justify-between p-2"
							on:mouseenter={() => mouseEnter(i)}
							on:mouseleave={() => mouseLeave()}
							role="row"
							tabindex={i}
						>
							<CompleteToDoButton {toDo} />
							<div
								on:click={() => toggleRow(i)}
								on:keydown={() => toggleRow(i)}
								role="row"
								tabindex={i}
								class="w-full"
							>
								<p class="{toDo.done === true ? 'line-through' : 'no-underline'} pl-2">
									{toDo.name}
								</p>
							</div>
							{#if openEdit === i}
								<div in:fade class="flex">
									<EditToDoButton {toDo} />
									<DeleteToDoButton {toDo} />
								</div>
							{/if}
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
			{#if openRow === i}
				<TableBodyRow class="border-primary-800">
					<TableBodyCell colspan="3" class="bg-primary-900 p-0">
						<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
							{#if toDo.description}
								<p class="whitespace-normal text-primary-100">
									{toDo.description}
								</p>
							{/if}
							{#if toDo.due_date}
								<p class="text-primary-100">
									<i class="fa-solid fa-calendar pr-2" />{toDo.due_date}
								</p>
							{/if}
							{#if toDo.priority}
								<p class="text-primary-100">
									<i class="fa-solid fa-flag pr-2" />{priorityOptions[toDo.priority]}
								</p>
							{/if}
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
