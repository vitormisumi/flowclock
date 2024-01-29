<script lang="ts">
	import { Card, Popover } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import ToDoList from './ToDoList.svelte';
	import ToDosMenu from './ToDosMenu.svelte';
	import AddToDoButton from './AddToDoButton.svelte.svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	const settings: Writable<Settings> = getContext('settings');

	let open = false;

	let completedHidden = true;

	let hidden = $settings.to_dos_card_hidden;
</script>

<Card class="h-full min-h-full min-w-full gap-1 border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center">
			<h2 class="pr-1 font-bold text-primary-900 dark:text-primary-50">To-Dos</h2>
			<i class="fa-regular fa-circle-question dark:text-secondary-500" id="hover-1" />
			<Popover triggeredBy="#hover-1" class="z-10 w-60 md:w-80" placement="bottom-start">
				<div class="p-2 text-sm">
					<h3 class="font-semibold dark:text-secondary-900">Quick Duties</h3>
					To-Dos are designed for swift and straightforward assignments. In this context, the focus is
					on completing the task rather than tracking the time it takes to finish. Unlike Tasks, To-Dos
					cannot be time tracked. If you require time tracking, consider creating a 'Task' instead. To-Dos
					are more suited to things like small steps within a checklist, chores or quick errands.
				</div>
			</Popover>
		</div>
		<ToDosMenu bind:open bind:hidden bind:completedHidden />
	</div>
	{#if !hidden}
		<div class="w-full" transition:slide>
			<div class="grid place-items-center">
				<ToDoList {completedHidden} />
				<AddToDoButton />
			</div>
		</div>
	{/if}
</Card>
