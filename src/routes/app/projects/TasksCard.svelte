<script lang="ts">
	import { Card, Popover, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { sorting } from './stores';
	import { getContext } from 'svelte';
	import TasksBoard from './TasksBoard.svelte';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	let open = false;

	async function sort(sortBy: string) {
		open = false;
		sorting.sortTasks(sortBy);
		let tasks: TaskStatuses[] = $status
		tasks.forEach((item: TaskStatuses) => {
			if (item.tasks && item.tasks.length > 0) {
				switch (sortBy) {
					case 'priority':
						item.tasks.sort((a, b) => b.priority - a.priority);
						break;
					case 'due_date':
						item.tasks.sort((a, b) => {
							if (a.due_date === null) return 1;
							if (b.due_date === null) return -1;
							if (a.due_date && b.due_date) {
								return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
							}
							return 0;
						})
						break;
					case 'name':
						item.tasks.sort((a, b) => a.name.localeCompare(b.name));
						break;
					default:
						item.tasks.sort((a, b) => b.order - a.order);
				}
			}
		});
		status.set(tasks);
		const response = await fetch('/api/sort', {
			method: 'POST',
			body: JSON.stringify({ tasks }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<Card class="h-full min-h-full min-w-full gap-8 border-0 bg-primary-800">
	<div>
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<h2 class="pr-1 font-bold text-primary-50">Tasks</h2>
				<i class="fa-regular fa-circle-question right-0 top-0 text-secondary-500" id="hover-2" />
				<Popover triggeredBy="#hover-2" class="z-10 w-60 md:w-80" placement="bottom-start">
					<div class="p-2 text-sm">
						<h3 class="font-semibold text-secondary-900">Extended Assignments</h3>
						Tasks are the ideal choice for assignments that require a substantial time commitment and
						might involve multiple stages of completion. You can think of tasks as your go-to for managing
						projects that span an extended period, like preparing a comprehensive research report or
						organizing a major event. Tasks can be linked to sessions to conveniently track the time
						you spend on each one, helping you stay organized and efficient in managing your workload.
					</div>
				</Popover>
			</div>
			<Button size="xs" class="bg-primary-800 transition-colors hover:bg-primary-700">
				<i class="fa-solid fa-ellipsis-vertical" />
			</Button>
			<Dropdown class="p-1" bind:open>
				<DropdownItem class="w-full">
					<i class="fa-solid fa-sort pr-2" />Sort<i class="fa-solid fa-chevron-right pl-2" />
				</DropdownItem>
				<Dropdown placement="right" class="w-40">
					<form method="POST" action="?/sortTasks" use:enhance>
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
		<TasksBoard />
	</div>
</Card>
