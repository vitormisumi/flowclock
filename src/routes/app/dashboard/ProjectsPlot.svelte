<script lang="ts">
	import { filteredSessions } from './stores';
	import { getContext } from 'svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
	import type { Writable } from 'svelte/store';

	const projects: Writable<Project[]> = getContext('projects');

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredSessions.reduce(
				(distribution, item) => {
					distribution[item.project_id || 'no project'] =
						(distribution[item.project_id || 'no project'] || 0) +
						(group === 'frequency' ? 1 : item.focused_duration ?? 0);
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => x[1] - y[1])
	);

	let total = 0;
	$: total = Object.values(distribution).reduce((sum, value) => sum + value, 0);

	let percentages: number[] = [];
	$: percentages = Object.values(distribution).map((value) => value / total);

	function startX(i: number) {
		return Math.cos(
			2 *
				Math.PI *
				Object.values(percentages)
					.slice(0, i + 1)
					.reduce((a, b) => a + b, 0)
		);
	}

	function startY(i: number) {
		return Math.sin(
			2 *
				Math.PI *
				Object.values(percentages)
					.slice(0, i + 1)
					.reduce((a, b) => a + b, 0)
		);
	}

	const colors = ['#309FB6', '#E35402', '#885A89', '#F8FFF4', '#ECC30B'];

	let tooltip = false;
	let tooltipData: { project: string; total: number; percentage: number };

	function handleTooltip(i: number) {
		tooltip = true;
		tooltipData = {
			project:
				$projects.find((x) => x.id === Number(Object.keys(distribution)[i]))?.name || 'No project',
			total: Object.values(distribution)[i],
			percentage: percentages[i]
		};
	}
</script>

<svg
	height="100%"
	width="100%"
	class="aspect-square rounded-xl bg-secondary-50 dark:bg-secondary-900 lg:aspect-auto"
>
	<svg height="80%" width="80%" x="10%" y="10%" viewBox="-1 -1 2 2">
		<g class="-rotate-90">
			{#each percentages as p, i}
				<path
					d="M 0 0
					   L {startX(i - 1)} {startY(i - 1)}
					   A 1 1, 0, {p > 0.5 ? 1 : 0}, 1, {startX(i)} {startY(i)}
					   Z"
					fill={colors[i]}
					class="opacity-100 transition-all hover:opacity-80 focus:opacity-80 focus:outline-none"
					role="figure"
					on:mouseover={() => handleTooltip(i)}
					on:focus={() => handleTooltip(i)}
					on:mouseout={() => (tooltip = false)}
					on:blur={() => (tooltip = false)}
				>
				</path>
			{/each}
		</g>
	</svg>
	<text x="50%" y="98%" text-anchor="middle" class="dark:fill-primary-50" font-weight="lighter">
		{group} of sessions
	</text>
	{#if tooltip}
		<text
			class="text-sm font-extralight dark:fill-primary-50"
			role="tooltip"
			x="3%"
			y="3%"
			dominant-baseline="hanging"
		>
			{tooltipData.project}
		</text>
		<text
			class="text-sm dark:fill-primary-50"
			role="tooltip"
			x="3%"
			y="7%"
			dominant-baseline="hanging"
		>
			{group === 'frequency' ? tooltipData.total : millisecondsToClock(tooltipData.total)} ({(
				tooltipData.percentage * 100
			).toFixed(1)}%)
		</text>
	{/if}
</svg>
