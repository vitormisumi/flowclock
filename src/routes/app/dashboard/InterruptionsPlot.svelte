<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { filteredInterruptions } from './stores';

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredInterruptions.reduce(
				(distribution, item) => {
					const reason = item.reason ?? 'no reason';
					distribution[reason] =
						(distribution[reason] || 0) + (group === 'frequency' ? 1 : item.duration ?? 0);
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => y[1] - x[1])
	);
</script>

<svg
	width="100%"
	height={(Object.keys(distribution).length + 1) * 50}
	class="rounded-xl bg-secondary-50 p-2 dark:bg-secondary-900"
>
	{#each Object.entries(distribution) as reason, value}
		{#if value < 10}
			<text
				x="48%"
				y={value * 50 + 30}
				text-anchor="end"
				class="fill-primary-900 capitalize dark:fill-primary-50">{reason[0]}</text
			>
			<rect
				x="50%"
				y={value * 50 + 5}
				height="40"
				width="{(reason[1] /
					Object.values(distribution).reduce((accumulator, value) => {
						return accumulator + value;
					}, 0)) *
					50}%"
				rx="1%"
				class="fill-primary-500"
			/>
			<text
				x="52%"
				y={value * 50 + 30}
				class="fill-primary-900 text-sm capitalize dark:fill-primary-50"
				>{group === 'frequency' ? reason[1] : millisecondsToClock(reason[1])}</text
			>
		{/if}
	{/each}
	<line
		x1="50%"
		y1="0"
		x2="50%"
		y2={Object.keys(distribution).length * 50}
		class="stroke-secondary-100 dark:stroke-secondary-800"
	/>
	<text
		x="50%"
		y="98%"
		text-anchor="middle"
		class="fill-primary-900 dark:fill-primary-50"
		font-weight="lighter">{group} of interruptions</text
	>
</svg>
