<script lang="ts">
	import { Button, Card, Dropdown, Radio } from 'flowbite-svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { filteredDistractions, filteredSessions } from './stores';

	$: reasonDistribution = Object.fromEntries(
		Object.entries(
			$filteredDistractions.reduce(
				(distribution, item) => {
					const reason = item.reason;
					distribution[reason] = (distribution[reason] || 0) + 1;
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => y[1] - x[1])
	);

	$: durationDistribution = Object.fromEntries(
		Object.entries(
			$filteredDistractions.reduce(
				(distribution, item) => {
					const reason = item.reason;
					distribution[reason] =
						(distribution[reason] || 0) + Date.parse(item.end) - Date.parse(item.start);
					return distribution;
				},
				{} as { [key: string]: number }
			)
		).sort((x, y) => y[1] - x[1])
	);

	$: perSession = $filteredSessions.length
		? ($filteredDistractions.length / $filteredSessions.length).toFixed(2)
		: 0;

	let group: string = 'frequency';

	$: distribution = group === 'frequency' ? reasonDistribution : durationDistribution;

	let open: boolean = false;
</script>

<Card class="min-w-full border-0 bg-primary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">Distractions</h2>
			<p class="text-center text-lg text-accent-500 md:text-2xl">
				{$filteredDistractions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">per Session</h2>
			<p class="text-center text-lg text-accent-500 md:text-2xl">{perSession}</p>
		</div>
		<Button size="xs" class="bg-primary-800 hover:bg-primary-700"
			><i class="fa-solid fa-sort" /></Button
		>
		<Dropdown class="grid gap-2 rounded-lg bg-primary-50 p-3" bind:open>
			<li>
				<Radio
					name="sort"
					bind:group
					value="frequency"
					on:click={() => (open = false)}
					class="text-primary-900">frequency</Radio
				>
			</li>
			<li>
				<Radio
					name="sort"
					bind:group
					value="duration"
					on:click={() => (open = false)}
					class="text-primary-900">duration</Radio
				>
			</li>
		</Dropdown>
	</div>
	<svg
		width="100%"
		height={(Object.keys(distribution).length + 1) * 50}
		class="rounded-xl bg-primary-900 p-2"
	>
		{#each Object.entries(distribution) as reason, value}
			{#if value < 10}
				<text x="48%" y={value * 50 + 30} text-anchor="end" class="fill-primary-50 capitalize"
					>{reason[0]}</text
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
					class="fill-primary-700"
				/>
				<text x="52%" y={value * 50 + 30} class="fill-primary-50 capitalize"
					>{group === 'frequency' ? reason[1] : millisecondsToClock(reason[1])}</text
				>
			{/if}
		{/each}
		<line
			x1="50%"
			y1="0"
			x2="50%"
			y2={Object.keys(distribution).length * 50}
			class="stroke-primary-800"
		/>
		<text x="50%" y="98%" text-anchor="middle" class="fill-primary-50" font-weight="lighter"
			>{group} of distractions</text
		>
	</svg>
</Card>
