<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { sorting } from './stores';
	import { getContext } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	export let open: boolean;

	async function sort(sortBy: string) {
		open = false;
		sorting.sortTasks(sortBy);
		let tasks: TaskStatuses[] = $status;
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
						});
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

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-sort" /></Button>
<Dropdown placement="bottom" class="rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700">
	<form method="POST" action="?/sortTasks" class="flex w-20 flex-col gap-1" use:enhance>
		<Button
			size="xs"
			buttonStyle="menu"
			class="w-full"
			type="submit"
			name="sort"
			value="name"
			on:click={() => sort('name')}>Name</Button
		>
		<Button
			size="xs"
			buttonStyle="menu"
			class="w-full"
			type="submit"
			name="sort"
			value="due_date"
			on:click={() => sort('due_date')}
		>
			Due Date
		</Button>
		<Button
			size="xs"
			buttonStyle="menu"
			class="w-full"
			type="submit"
			name="sort"
			value="priority"
			on:click={() => sort('priority')}
		>
			Priority
		</Button>
	</form>
</Dropdown>
