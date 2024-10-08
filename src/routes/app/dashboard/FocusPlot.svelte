<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { filteredSessions } from './stores';

	const tasks: Writable<Task[]> = getContext('tasks');
	const intentions: Writable<Intention[]> = getContext('intentions');

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredSessions.reduce(
				(distribution, item) => {
					const focus = item.task_id
						? ' ' + $tasks.find((x) => x.id === item.task_id)?.name
						: item.intention_id
						? ' ' + $intentions.find((x) => x.id === item.intention_id)?.name
						: 'no focus';
					if (focus) {
						distribution[focus] =
							(distribution[focus] || 0) + (group === 'frequency' ? 1 : item.focused_duration);
					}
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((a, b) => b[1] - a[1])
	);
</script>

<svg width="100%" height="100%" class="rounded-xl bg-secondary-50 p-2 dark:bg-secondary-900">
	{#each Object.entries(distribution) as focus, i}
		{#if i < 10}
			<text
				x="48%"
				y="{(i + 1) * 9}%"
				text-anchor="end"
				class="text-sm font-thin capitalize md:text-base {focus[0] === 'no focus'
					? 'fill-secondary-500 dark:fill-secondary-500'
					: 'fill-secondary-900 dark:fill-secondary-50'}"
			>
				{focus[0]}
			</text>
			<rect
				x="50%"
				y="{i * 9 + 4}%"
				height="8%"
				width="{(focus[1] /
					Object.values(distribution).reduce((accumulator, i) => {
						return accumulator + i;
					}, 0)) *
					50}%"
				rx="0.2rem"
				class="fill-primary-500"
			/>
			<text
				x="52%"
				y="{(i + 1) * 9}%"
				class="fill-secondary-900 text-sm capitalize dark:fill-secondary-50 md:text-base"
			>
				{group === 'frequency' ? focus[1] : millisecondsToClock(focus[1])}
			</text>
		{/if}
	{/each}
	<line
		x1="50%"
		y1="2%"
		x2="50%"
		y2="{Object.keys(distribution).length >= 10 ? 95 : Object.keys(distribution).length * 9 + 4.5}%"
		class="stroke-secondary-100 dark:stroke-secondary-800"
	/>
	<text
		x="50%"
		y="98%"
		text-anchor="middle"
		class="fill-primary-900 dark:fill-primary-50"
		font-weight="lighter"
	>
		{group} of sessions
	</text>
</svg>
