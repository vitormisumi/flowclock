<script lang="ts">
	import { getContext } from 'svelte';
	import { selectedProject } from './stores';
	import { fade, slide } from 'svelte/transition';
	import { sorting } from './stores';
	import EditToDoButton from './EditToDoButton.svelte';
	import DeleteToDoButton from './DeleteToDoButton.svelte';
	import CompleteToDoButton from './CompleteToDoButton.svelte';
	import type { Writable } from 'svelte/store';
	import DueDate from './DueDate.svelte';
	import ToDosMenu from './ToDosMenu.svelte';

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

	export let show: boolean;

	let openRow: number | null = null;

	let showMenu: number | null = null;
	let width: number;
</script>

<svelte:window bind:innerWidth={width} />
<ul class="grid gap-1">
	{#each $toDos as toDo, i}
		{#if toDo.project_id === $selectedProject.id && (toDo.done === false || show === true)}
			<li
				class="grid w-full rounded-lg border border-primary-900 bg-primary-900"
				on:mouseenter={() => (showMenu = toDo.id)}
				on:mouseleave={() => (showMenu = null)}
			>
				<div class="flex items-center gap-2 overflow-hidden px-2">
					<CompleteToDoButton {toDo} />
					<button
						class="h-10 grow overflow-hidden truncate text-left text-sm font-light text-primary-50 md:text-base {toDo.description
							? 'cursor-pointer'
							: 'cursor-auto'} {toDo.done === true ? 'line-through' : 'no-underline'}"
						on:click={() => (openRow = toDo.description && openRow === null ? i : null)}
						on:keydown={() => (openRow = toDo.description && openRow === null ? i : null)}
					>
						{toDo.name}
					</button>
					{#if toDo.due_date}
						<DueDate date={toDo.due_date} />
					{/if}
					{#if showMenu === toDo.id || width < 768}
						<ToDosMenu {toDo} bind:showMenu />
					{/if}
				</div>
				{#if openRow === i}
					<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
						{#if toDo.description}
							<p class="whitespace-normal text-primary-100">
								{toDo.description}
							</p>
						{/if}
					</div>
				{/if}
			</li>
		{/if}
	{/each}
</ul>
