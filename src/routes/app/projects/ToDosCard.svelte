<script lang="ts">
	import { Card, Button, Dropdown, DropdownItem, Popover } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import ToDosList from './ToDosList.svelte';
	import AddToDoButton from './AddToDoButton.svelte.svelte';
	import { sorting } from './stores';

	let show = false;

	let open = false;

	function sort(sortBy: string) {
		open = false;
		sorting.sortToDos(sortBy);
	}
</script>

<Card class="h-full min-w-full border-0 bg-primary-800 grid gap-1">
		<div class="flex justify-between">
			<div class="flex items-center">
				<h2 class="pr-1 font-bold text-primary-50">To-Dos</h2>
				<i class="fa-regular fa-circle-question text-secondary-500" id="hover-1" />
				<Popover triggeredBy="#hover-1" class="z-10 w-60 md:w-80" placement="bottom-start">
					<div class="p-2 text-sm">
						<h3 class="font-semibold text-secondary-900">Quick Duties</h3>
						To-Dos are designed for swift and straightforward assignments. In this context, the focus
						is on completing the task rather than tracking the time it takes to finish. Unlike Tasks,
						To-Dos cannot be time tracked. If you require time tracking, consider creating a 'Task' instead.
						To-Dos are more suited to things like small steps within a checklist, chores or quick errands.
					</div>
				</Popover>
			</div>
			<Button size="xs" class="bg-primary-800 transition-colors hover:bg-primary-700">
				<i class="fa-solid fa-ellipsis-vertical" />
			</Button>
			<Dropdown class="p-1" bind:open placement="bottom-end">
				<DropdownItem on:click={() => (show = !show)}>
					<i class="fa-solid {show ? 'fa-eye-slash' : 'fa-eye'} pr-2" />{show ? 'Hide' : 'Show'} completed
				</DropdownItem>
				<DropdownItem class="w-full">
					<i class="fa-solid fa-sort pr-2" />Sort<i class="fa-solid fa-chevron-right pl-2" />
				</DropdownItem>
				<Dropdown placement="right" class="w-40">
					<form method="POST" action="?/sortToDos" use:enhance>
						<DropdownItem>
							<button type="submit" name="sort" value="name" on:click={() => sort('name')}>
								Name
							</button>
						</DropdownItem>
						<DropdownItem>
							<button type="submit" name="sort" value="due_date" on:click={() => sort('due_date')}>
								Due Date
							</button>
						</DropdownItem>
						<DropdownItem>
							<button type="submit" name="sort" value="priority" on:click={() => sort('priority')}>
								Priority
							</button>
						</DropdownItem>
					</form>
				</Dropdown>
			</Dropdown>
		</div>
		<ToDosList {show} />
		<AddToDoButton />
</Card>
