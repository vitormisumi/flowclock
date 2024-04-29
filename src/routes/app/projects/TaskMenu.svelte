<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import StartTaskButton from './StartTaskButton.svelte';
	import EditTaskButton from './EditTaskButton.svelte';
	import DeleteTaskButton from './DeleteTaskButton.svelte';

	export let task: Task;
	export let showMenu: number | null;
</script>

<div transition:slide={{ axis: 'x' }}>
	<Button size="xs" buttonStyle="menu">
		<iconify-icon icon="ion:ellipsis-vertical" />
	</Button>
	<Dropdown
		placement="left"
		class="flex justify-items-center rounded-lg bg-secondary-100 p-1 dark:bg-secondary-800"
	>
		<StartTaskButton {task} />
		<EditTaskButton {task} bind:showMenu />
		<DeleteTaskButton {task} />
	</Dropdown>
</div>
