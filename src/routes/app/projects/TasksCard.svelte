<script lang="ts">
	import { Button, Card, Dropdown, DropdownItem } from 'flowbite-svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import TasksTable from './TasksTable.svelte';
	import ToDosTable from './ToDosTable.svelte';

	let show = false;
</script>

<Card class="h-full min-w-full gap-1 border-0 bg-primary-800">
	<p class="text-xl text-primary-50">Tasks</p>
	<TasksTable />
	<AddTaskButton type="task" />
	<div class="flex justify-between">
		<p class="text-xl text-primary-50">To-Dos</p>
		<Button size="xs" class="bg-primary-800 hover:bg-primary-700"
			><i class="fa-solid fa-ellipsis-vertical" /></Button
		>
		<Dropdown>
			<DropdownItem>
				<Button on:click={() => (show = !show)}>{show ? 'Hide' : 'Show'} completed</Button>
			</DropdownItem>
		</Dropdown>
	</div>
	<ToDosTable {show}/>
	<AddTaskButton type="to-do" />
</Card>
