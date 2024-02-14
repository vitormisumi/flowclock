<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import AddToDoButton from './AddToDoButton.svelte.svelte';
	import ToDoList from './ToDoList.svelte';
	import ToDosMenu from './ToDosMenu.svelte';

	let open = false;

	let completedHidden = true;
</script>

<Card class="h-full min-h-full min-w-full gap-1 border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex w-full items-center justify-between">
		<h2 class="pr-1 font-bold text-primary-900 dark:text-primary-50">To-Dos</h2>
		<ToDosMenu bind:open bind:completedHidden />
	</div>
	<div class="grid place-items-center">
		<ToDoList />
		<AddToDoButton />
	</div>
</Card>
