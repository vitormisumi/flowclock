<script lang="ts">
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

	let openEdit: number | null = null;
</script>

<div class="grid gap-1">
	{#each $toDos as toDo, i}
		{#if toDo.project_id === $selectedProject.id && (toDo.done === false || show === true)}
			<div
				class="grid w-full rounded-lg border border-primary-900 bg-primary-900"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
				role="listitem"
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
						{#if toDo.description}
							<p class="whitespace-normal text-primary-100">
								{toDo.description}
							</p>
						{/if}
						<div class="grid grid-cols-2 justify-items-center w-full">
							{#if toDo.due_date}
								<p class="text-primary-100">
									<i class="fa-solid fa-calendar pr-2" />{toDo.due_date}
								</p>
							{:else}
								<p class="text-primary-100">
									<i class="fa-solid fa-calendar pr-2" />No due date
								</p>
							{/if}
							{#if toDo.priority !== null}
								<p class="text-primary-100">
									<i class="fa-solid fa-flag pr-2" />{priorityOptions[toDo.priority]}
								</p>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>
