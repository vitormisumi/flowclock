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
		).sort((x, y) => y[1] - x[1])
	);

	let total = 0;
	$: total = Object.values(distribution).reduce((sum, value) => sum + value, 0);

	let percentages: number[] = [];
	$: percentages = Object.values(distribution).map((value) => value / total);

	const colors = ['#309FB6', '#E35402', '#885A89', '#F8FFF4', '#ECC30B'];

	let tooltip = false;
	let tooltipData: { project: string; total: number; percentage: number };

	function handleTooltip(percentage: number, index: number) {
		tooltip = true;
		tooltipData = {
			project: Object.keys(distribution)[index],
			total: Object.values(distribution)[index],
			percentage: percentage
		};
	}
</script>

<svg height="100%" width="100%" class="aspect-square rounded-xl bg-primary-900 lg:aspect-auto">
	<g class="-rotate-90" style:transform-origin="50% 50%">
		{#each percentages as p, i}
			<circle
				r="18%"
				cx="50%"
				cy="50%"
				fill="transparent"
				stroke={colors[i]}
				stroke-width="36%"
				stroke-dasharray="{p * (2 * Math.PI * 18)}% {2 * Math.PI * 18}%"
				stroke-dashoffset="{-(percentages[i - 1] * (2 * Math.PI * 18))}%"
				role="figure"
				class="opacity-90 hover:opacity-100 focus:opacity-100 focus:outline-none"
				on:mouseover={() => handleTooltip(p, i)}
				on:focus={() => handleTooltip(p, i)}
				on:mouseout={() => (tooltip = false)}
				on:blur={() => (tooltip = false)}
			/>
		{/each}
	</g>
	<text x="50%" y="98%" text-anchor="middle" class="fill-primary-50" font-weight="lighter">
		{group} of sessions
	</text>
	{#if tooltip}
		<text
			class="fill-primary-50 text-sm font-extralight"
			role="tooltip"
			x="3%"
			y="3%"
			dominant-baseline="hanging"
		>
			{$projects.find((x) => x.id === Number(tooltipData.project))?.name || 'No project'}
		</text>
		<text class="fill-primary-50 text-sm" role="tooltip" x="3%" y="7%" dominant-baseline="hanging">
			{group === 'frequency' ? tooltipData.total : millisecondsToClock(tooltipData.total)} ({(
				tooltipData.percentage * 100
			).toFixed(1)}%)
		</text>
	{/if}
</svg>
