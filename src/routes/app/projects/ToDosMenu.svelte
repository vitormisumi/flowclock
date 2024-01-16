<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
	import EditToDoButton from './EditToDoButton.svelte';
	import DeleteToDoButton from './DeleteToDoButton.svelte';
	import { slide } from 'svelte/transition';

	export let toDo: ToDo;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" class="bg-transparent transition-colors">
		<i class="fa-solid fa-ellipsis-vertical"></i>
	</Button>
	<Dropdown placement="left" class="flex justify-items-center rounded-lg bg-primary-800 p-1">
		<EditToDoButton {toDo} bind:showMenu />
		<DeleteToDoButton {toDo} bind:showMenu />
	</Dropdown>
</div>