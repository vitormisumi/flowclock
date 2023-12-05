<script lang="ts">
	import { filteredSessions } from './stores';

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredSessions.reduce(
				(distribution, item) => {
					distribution[item.project_id || 'no project'] =
						(distribution[item.project_id || 'no project'] || 0) +
						(group === 'frequency' ? 1 : item.duration ?? 0);
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

	const colors = ['red', 'blue', 'green'];

	let tooltip = false;
	let tooltipData: { project: string; percentage: number };
	let x = 0;
	let y = 0;

	function handleTooltip(percentage: number, index: number) {
		tooltip = true;
		tooltipData = { project: Object.keys(distribution)[index], percentage: percentage };
	}

	function handlePointerMove(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;
	}
</script>

<svg
	viewBox="0 0 100 100"
	class="aspect-square rounded-xl bg-primary-900 p-2"
	on:pointermove={handlePointerMove}
>
	<circle r="45" cx="50" cy="50" fill="white" />
	{#each percentages as p, i}
		<circle
			r="22.5"
			cx="50"
			cy="50"
			fill="transparent"
			stroke={colors[i]}
			stroke-width="45"
			stroke-dasharray="{p * (2 * Math.PI * 22.5)} {2 * Math.PI * 22.5}"
			stroke-dashoffset={-(percentages[i - 1] * (2 * Math.PI * 22.5))}
			transform="rotate(-90) translate(-100)"
			role="figure"
			on:mouseover={() => handleTooltip(p, i)}
			on:focus={() => handleTooltip(p, i)}
			on:mouseout={() => (tooltip = false)}
			on:blur={() => (tooltip = false)}
		/>
	{/each}
</svg>
{#if tooltip}
	<p
		class="pointer-events-none fixed left-0 top-0 text-sm text-primary-50 transition-all duration-100"
		role="tooltip"
		style="transform: translate({x + 10}px, {y - 10}px);"
	>
		{tooltipData.project}<br />{(tooltipData.percentage * 100).toFixed(1)}%
	</p>
{/if}
