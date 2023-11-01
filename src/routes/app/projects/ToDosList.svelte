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
			<button
				class="grid w-full rounded-lg border border-primary-900 bg-primary-800 px-2 py-1 font-light text-primary-50 lg:text-base"
				on:mouseenter={() => (openEdit = i)}
				on:mouseleave={() => (openEdit = null)}
				on:click={() => (openRow = openRow === i ? null : i)}
				on:keydown={() => (openRow = openRow === i ? null : i)}
			>
				<div class="flex h-8 w-full items-center justify-between">
					<div class="flex">
						<CompleteToDoButton {toDo}/>
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
				{#if openRow === i}
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
				{/if}
			</button>
		{/if}
	{/each}
</div>
