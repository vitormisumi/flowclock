<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import type { Writable } from 'svelte/store';
	import type Task from '../session/Task.svelte';
	import { getContext } from 'svelte';

	const tasks: Writable<Task[]> = getContext('tasks');
</script>

<Card class="h-full w-2/3 min-w-full border-0 bg-primary-800">
	<h2>Tasks</h2>
	{#each $tasks as task}
		<p>{task.name}</p>
	{/each}
	<AddTaskButton />
</Card>
