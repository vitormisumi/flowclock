<script lang="ts">
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { canHover } from '../stores';
	import CompleteToDoButton from './CompleteToDoButton.svelte';
	import DueDate from './DueDate.svelte';
	import ToDoMenu from './ToDoMenu.svelte';
	import { sorting } from './stores';

	const toDos: Writable<ToDo[]> = getContext('toDos');

	let openRow: number | null = null;
	let opening = false;

	let showMenu: number | null = null;

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
			$toDos = $toDos.sort((a, b) => Number(b.priority) - Number(a.priority));
			break;
		case 'name':
			$toDos = $toDos.sort((a, b) => a.name.localeCompare(b.name));
			break;
	}

	function handleClick(toDo: ToDo) {
		openRow = toDo.description && openRow === null ? toDo.id : null;
		opening = true;
		setTimeout(() => (opening = false), 400);
	}
</script>

<ul class="grid max-h-96 w-full gap-1 overflow-auto">
	{#each $toDos as toDo (toDo.id)}
		<li
			class="grid w-full rounded-lg border border-secondary-50 bg-secondary-50 px-2 dark:border-secondary-900 dark:bg-secondary-900 {toDo.description
				? 'hover:border-primary-200 hover:bg-primary-200 hover:dark:border-primary-800 hover:dark:bg-primary-800'
				: ''}"
			animate:flip={{ duration: opening ? 0 : (d) => Math.sqrt(d) * 120 }}
			on:mouseenter={() => (showMenu = toDo.id)}
			on:mouseleave={() => (showMenu = null)}
		>
			<div class="flex items-center gap-2 overflow-hidden">
				<CompleteToDoButton {toDo} />
				<button
					class="h-10 grow overflow-hidden truncate text-left text-sm font-light text-primary-900 dark:text-primary-50 md:text-base {toDo.description
						? 'cursor-pointer'
						: 'cursor-auto'} {toDo.done === true ? 'line-through' : 'no-underline'}"
					on:click={() => handleClick(toDo)}
					on:keydown={() => handleClick(toDo)}
				>
					{toDo.name}
				</button>
				{#if toDo.due_date}
					<DueDate date={toDo.due_date} />
				{/if}
				{#if showMenu === toDo.id || !$canHover}
					<ToDoMenu {toDo} bind:showMenu />
				{/if}
			</div>
			{#if openRow === toDo.id}
				<div class="flex flex-wrap gap-4 p-2 font-light" transition:slide>
					<p
						class="whitespace-normal text-sm font-light text-primary-800 dark:text-primary-100 md:text-base"
					>
						{toDo.description}
					</p>
				</div>
			{/if}
		</li>
	{/each}
	<div
		class="sticky bottom-0 h-8 w-full bg-gradient-to-b from-transparent to-secondary-100 dark:to-secondary-800"
	/>
</ul>
