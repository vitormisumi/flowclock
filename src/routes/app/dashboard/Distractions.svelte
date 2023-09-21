<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Distraction } from '../types';
	import { getContext } from 'svelte';
	import { Card } from 'flowbite-svelte';

	const distractions: Writable<Distraction[]> = getContext('distractions');

	let reasonDistribution = Object.fromEntries(Object.entries($distractions.reduce(
		(distribution, item) => {
			const reason = item.reason;
			distribution[reason] = (distribution[reason] || 0) + 1;
			return distribution;
		},
		{} as { [key: string]: number }
	)).sort((x, y) => y[1] - x[1]));

	$: console.log(reasonDistribution);
</script>

<Card class="border-0 bg-primary-800 min-w-full">
	<h2 class="p-2 text-center font-semibold text-primary-50 md:text-xl">Distractions</h2>
	<svg width="100%" height="100%" class="rounded-xl bg-primary-900 fill-primary-50 p-2">
		{#each Object.entries(reasonDistribution) as reason, value}
			{#if value < 10}
				<text x="48%" y={value * 50 + 30} text-anchor="end" class="capitalize">{reason[0]}</text>
				<rect x="50%" y={value * 50 + 5} height="40" width="{reason[1] / $distractions.length * 50}%" />
			{/if}
		{/each}
		<line x1="50%" y1="0" x2="50%" y2="100%" class="stroke-primary-800" />
	</svg>
</Card>
