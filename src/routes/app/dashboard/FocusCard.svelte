<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Card, Dropdown, Radio } from 'flowbite-svelte';
	import FocusPlot from './FocusPlot.svelte';
	import { filteredSessions } from './stores';

	let sessionsWithFocus: number;
	let percentageWithFocus: string;

	$: sessionsWithFocus = $filteredSessions.reduce(
		(acc, item) => (item.task_id || item.intention_id ? acc + 1 : acc),
		0
	);
	$: percentageWithFocus = ((sessionsWithFocus / $filteredSessions.length) * 100).toFixed(1);

	let group: string = 'frequency';

	let open = false;

	let options: string[] = ['frequency', 'duration'];
</script>

<Card class="h-full min-w-full border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				Sessions with Focus
			</h2>
			<p class="text-center text-accent-500 md:text-xl">{sessionsWithFocus}</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">% of Sessions</h2>
			<p class="text-center text-accent-500 md:text-xl">{percentageWithFocus}%</p>
		</div>
		<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-sort" /></Button>
		<Dropdown class="grid gap-2 rounded-lg bg-secondary-200 p-3 dark:bg-secondary-700" bind:open>
			{#each options as option}
				<li>
					<Radio
						name="sort"
						value={option}
						class="dark:text-secondary-50"
						on:change={() => (open = false)}
						bind:group
					>
						{option}
					</Radio>
				</li>
			{/each}
		</Dropdown>
	</div>
	{#if sessionsWithFocus}
		<FocusPlot {group} />
	{/if}
</Card>
