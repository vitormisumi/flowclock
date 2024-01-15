<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';
	import { slide } from 'svelte/transition';

	export let task: Task;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" class="bg-transparent transition-colors">
		<i class="fa-solid fa-ellipsis-vertical"></i>
	</Button>
	<Dropdown placement="left" class="flex justify-items-center rounded-lg bg-primary-800 p-1">
		<StartTaskButton {task} />
		<EditTaskButton {task} bind:showMenu />
		<DeleteTaskButton {task} />
	</Dropdown>
</div>
