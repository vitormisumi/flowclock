<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import EditToDoButton from './EditToDoButton.svelte';
	import DeleteToDoButton from './DeleteToDoButton.svelte';

	export let toDo: ToDo;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-ellipsis-vertical" /></Button>
	<Dropdown
		placement="left"
		class="flex justify-items-center rounded-lg bg-secondary-100 p-1 dark:bg-secondary-800"
	>
		<EditToDoButton {toDo} bind:showMenu />
		<DeleteToDoButton {toDo} bind:showMenu />
	</Dropdown>
</div>
