<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { sortOptions } from '$lib/constants/constants';
	import { Dropdown } from 'flowbite-svelte';
	import { getContext, onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { canHover } from '../stores';
	import { sorting } from './stores';

	const status: Writable<TaskStatuses[]> = getContext('status');

	export let open: boolean;
	export let success: boolean | undefined;
	export let message: string;

	async function sort(sortBy: string) {
		open = false;
		sorting.sortTasks(sortBy);
		let statuses: TaskStatuses[] = $status;
		statuses.forEach((status: TaskStatuses) => {
			if (status.tasks && status.tasks.length > 0) {
				switch (sortBy) {
					case 'priority':
						status.tasks.sort((a, b) => Number(b.priority) - Number(a.priority));
						break;
					case 'due_date':
						status.tasks.sort((a, b) => {
							if (a.due_date === null) return 1;
							if (b.due_date === null) return -1;
							if (a.due_date && b.due_date) {
								return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
							}
							return 0;
						});
						break;
					case 'name':
						status.tasks.sort((a, b) => a.name.localeCompare(b.name));
						break;
					default:
						status.tasks.sort((a, b) => b.order - a.order);
				}
			}
			status.tasks.forEach((task, index) => {
				task.order = status.tasks.length - index;
			});
		});
		status.set(statuses);

		const response = await fetch('/api/sort', {
			method: 'POST',
			body: JSON.stringify({ statuses, sortBy }),
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
		success = undefined;
	});
</script>

<Button id="sort" size="xs" buttonStyle="menu">
	<iconify-icon icon="ion:filter" />
</Button>
<Dropdown placement="left-start" class="rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700">
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
{#if $canHover}
	<Tooltip placement="left" triggeredBy="#sort">Sort tasks</Tooltip>
{/if}
