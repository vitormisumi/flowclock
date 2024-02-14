<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { filteredInterruptions } from './stores';

	export let group: string;

	$: distribution = Object.fromEntries(
		Object.entries(
			$filteredInterruptions.reduce(
				(distribution, item) => {
					const reason = item.reason != '' ? item.reason : 'no reason';
					if (reason) {
						distribution[reason] =
							(distribution[reason] || 0) + (group === 'frequency' ? 1 : item.duration ?? 0);
					}
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => y[1] - x[1])
	);
</script>

<svg width="100%" height="100%" class="rounded-xl bg-secondary-50 p-2 dark:bg-secondary-900">
	{#each Object.entries(distribution) as reason, i}
		{#if i < 10}
			<text
				x="48%"
				y="{(i + 1) * 9}%"
				text-anchor="end"
				class="text-sm font-thin capitalize md:text-base {reason[0] === 'no reason'
					? 'fill-secondary-500 dark:fill-secondary-500'
					: 'fill-secondary-900 dark:fill-secondary-50'}"
			>
				{reason[0]}
			</text>
			<rect
				x="50%"
				y="{i * 9 + 4}%"
				height="8%"
				width="{(reason[1] /
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
				class="fill-primary-900 text-sm capitalize dark:fill-primary-50 md:text-base"
			>
				{group === 'frequency' ? reason[1] : millisecondsToClock(reason[1])}
			</text>
		{/if}
	{/each}
	<line
		x1="50%"
		y1="2%"
		x2="50%"
		y2="{Object.keys(distribution).length * 9 + 4.5}%"
		class="stroke-secondary-100 dark:stroke-secondary-800"
	/>
	<text
		x="50%"
		y="98%"
		text-anchor="middle"
		class="fill-primary-900 dark:fill-primary-50"
		font-weight="lighter"
	>
		{group} of interruptions
	</text>
</svg>
