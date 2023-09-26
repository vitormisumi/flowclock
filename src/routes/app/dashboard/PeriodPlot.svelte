<script lang="ts">
	import { Button, Card, Dropdown, Radio } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { dateFromTimestamp } from '$lib/functions/functions';

	let open: boolean = false;

	const years = [
		...new Set([
			new Date($filteredSessions.slice(-1)[0].start).getFullYear(),
			new Date($filteredSessions[0].start).getFullYear()
		])
	];

	const weekdayMap: { [key: number]: string } = {
		0: 'sunday',
		1: 'monday',
		2: 'tuesday',
		3: 'wednesday',
		4: 'thursday',
		5: 'friday',
		6: 'saturday'
	};

	const monthMap: { [key: number]: string } = {
		0: 'january',
		1: 'february',
		2: 'march',
		3: 'april',
		4: 'may',
		5: 'june',
		6: 'july',
		7: 'august',
		8: 'september',
		9: 'october',
		10: 'november',
		11: 'december'
	};

	const periods = {
		hour: Array.from({ length: 24 }, (value, index) => index),
		day: Array.from({ length: 31 }, (value, index) => index + 1),
		weekday: Array.from({ length: 7 }, (value, index) => index),
		month: Array.from({ length: 12 }, (value, index) => index),
		year: Array.from({ length: years[1] - years[0] + 1 }, (value, index) => years[0] + index)
	};

	let group: keyof typeof periods = 'weekday';

	let dates: string;

	$: if ($filteredSessions.length === 0) {
		dates = '-';
	} else if (
		dateFromTimestamp($filteredSessions.slice(-1)[0].start) !=
		dateFromTimestamp($filteredSessions[0].start)
	) {
		dates =
			dateFromTimestamp($filteredSessions.slice(-1)[0].start) +
			' - ' +
			dateFromTimestamp($filteredSessions[0].start);
	} else {
		dates = dateFromTimestamp($filteredSessions[0].start);
	}

	let distribution: { [key: number]: number };

	$: switch (group) {
		case 'hour':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startHour = new Date(item.start).getHours();
							distribution[startHour] = (distribution[startHour] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
		case 'day':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startDay = new Date(item.start).getDate();
							distribution[startDay] = (distribution[startDay] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
		case 'day':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startDay = new Date(item.start).getDate();
							distribution[startDay] = (distribution[startDay] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
		case 'weekday':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startDay = new Date(item.start).getDay();
							distribution[startDay] = (distribution[startDay] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
		case 'month':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startMonth = new Date(item.start).getMonth();
							distribution[startMonth] = (distribution[startMonth] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
		case 'year':
			distribution = Object.fromEntries(
				Object.entries(
					$filteredSessions.reduce(
						(distribution, item) => {
							const startYear = new Date(item.start).getFullYear();
							distribution[startYear] = (distribution[startYear] || 0) + item.duration;
							return distribution;
						},
						{} as { [key: number]: number }
					)
				)
			);
			break;
	}

	$: console.log(periods[group]);
	$: console.log(distribution);
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">Time Frame</h2>
			<p class="text-center text-lg text-accent-500 md:text-2xl">{dates}</p>
		</div>
		<Button size="xs" class="bg-primary-800 hover:bg-primary-700"
			><i class="fa-solid fa-calendar" /></Button
		>
		<Dropdown class="grid gap-2 rounded-lg bg-primary-50 p-3" bind:open>
			{#each Object.keys(periods) as period}
				<li>
					<Radio
						name="sort"
						bind:group
						value={period}
						on:click={() => (open = false)}
						class="text-primary-900">{period}</Radio
					>
				</li>
			{/each}
		</Dropdown>
	</div>
	<svg width="100%" height="100%" class="rounded-xl bg-primary-900 p-2">
		{#each periods[group] as period, index}
			{#if ['hour', 'day'].includes(group)}
				{#if index % 3 === 0}
					<text
						fill="white"
						y="90%"
						x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
						text-anchor="middle"
						dominant-baseline="hanging">{period}</text
					>
				{/if}
			{:else if group === 'year'}
				<text
					fill="white"
					y="90%"
					x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
					text-anchor="middle"
					dominant-baseline="hanging">{period}</text
				>
			{:else if group === 'weekday'}
				<text
					fill="white"
					y="90%"
					x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
					text-anchor="start"
					writing-mode="tb"
					class="capitalize">{weekdayMap[period].slice(0, 3)}</text
				>
			{:else}
				<text
					fill="white"
					y="90%"
					x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
					text-anchor="start"
					writing-mode="tb"
					class="capitalize">{monthMap[period].slice(0, 3)}</text
				>
			{/if}
			{#if distribution[period]}
				<rect
					x="{(100 / (periods[group].length + 1)) * (index + 1 / 2)}%"
					y="{88 -
						(distribution[period] /
							Object.values(distribution).reduce((accumulator, value) => {
								return accumulator + value;
							}, 0)) *
							88}%"
					width="{100 / (periods[group].length + 1)}%"
					height="{(distribution[period] /
						Object.values(distribution).reduce((accumulator, value) => {
							return accumulator + value;
						}, 0)) *
						88}%"
					rx="1%"
					class="fill-primary-700"
				></rect>
			{/if}
		{/each}
		<line x1="0%" x2="100%" y1="88%" y2="88%" class="stroke-primary-800"></line>
	</svg>
</Card>
