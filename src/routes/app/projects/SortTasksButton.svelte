<script lang="ts">
	import { Dropdown } from 'flowbite-svelte';
	import { sorting } from './stores';
	import { getContext, onDestroy } from 'svelte';
	import { sortOptions } from '$lib/constants/constants';
	import Button from '$lib/components/Button.svelte';
	import type { Writable } from 'svelte/store';

	const status: Writable<TaskStatuses[]> = getContext('status');

	export let open: boolean;
	export let success: boolean | undefined;
	export let message: string;

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
			body: JSON.stringify({ tasks, sortBy }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			success = true;
			message = 'Tasks sorted';
		} else {
			success = false;
			message = 'Tasks could not be sorted';
		}
	}

	onDestroy(() => {
		success = undefined
	})
</script>

<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-sort" /></Button>
<Dropdown placement="bottom" class="rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700">
	<div class="flex w-20 flex-col gap-1">
		{#each sortOptions as option}
			<Button
				size="xs"
				buttonStyle="menu"
				type="submit"
				name={option.name}
				value={option.value}
				on:click={() => sort(option.value)}
			>
				{option.name}
			</Button>
		{/each}
	</div>
</Dropdown>
