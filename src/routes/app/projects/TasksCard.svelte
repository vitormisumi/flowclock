<script lang="ts">
	import { Button, Card, Dropdown, DropdownItem } from 'flowbite-svelte';
	import AddTaskButton from './AddTaskButton.svelte';
	import TasksBoard from './TasksBoard.svelte';
	import ToDosTable from './ToDosTable.svelte';

	let show = false;
</script>

<Card class="h-full min-w-full gap-8 border-0 bg-primary-800">
	<div>
		<p class="font-bold text-primary-50">Tasks</p>
		<TasksBoard />
	</div>
	<div class="grid">
		<div class="flex justify-between">
			<p class="font-bold text-primary-50">To-Dos</p>
			<Button size="xs" class="bg-primary-800 hover:bg-primary-700"
				><i class="fa-solid fa-ellipsis-vertical" /></Button
			>
			<Dropdown>
				<DropdownItem>
					<Button on:click={() => (show = !show)}>{show ? 'Hide' : 'Show'} completed</Button>
				</DropdownItem>
			</Dropdown>
		</div>
		<ToDosTable {show} />
		<AddTaskButton type="to-do" status={19} />
	</div>
</Card>
