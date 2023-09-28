<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { filteredSessions } from './stores';

	export let periods: {
		hour: number[];
		day: number[];
		weekday: number[];
		month: number[];
		year: number[];
	};
	export let group: keyof typeof periods;

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

	function barHeight(period: number): number {
		return (
			(distribution[period] /
				Object.values(distribution).reduce((accumulator, value) => {
					return accumulator + value;
				}, 0)) *
			75
		);
	}

	let tooltip: boolean = false;
	let tooltipData: number;
	let x: number = 0;
	let y: number = 0;

	function handleTooltip(period: number, index: number) {
		tooltip = true;
		tooltipData = distribution[period];
		x = (100 / (periods[group].length + 1)) * (index + 1);
		y = 82 - barHeight(period);
	}
</script>

<svg width="100%" height="100%" class="rounded-xl bg-primary-900 p-2">
	{#each periods[group] as period, index}
		{#if group === 'hour'}
			{#if index % 6 === 0}
				<text
					class="fill-primary-50"
					y="85%"
					x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
					text-anchor="middle"
					dominant-baseline="hanging">{period > 9 ? period : '0' + period}:00</text
				>
			{/if}
		{:else if group === 'day'}
			{#if index % 5 === 0}
				<text
					class="fill-primary-50"
					y="85%"
					x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
					text-anchor="middle"
					dominant-baseline="hanging">{period}</text
				>
			{/if}
		{:else if group === 'weekday'}
			<text
				y="85%"
				x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
				text-anchor="start"
				writing-mode="tb"
				class="fill-primary-50 capitalize">{weekdayMap[period].slice(0, 3)}</text
			>
		{:else if group === 'month'}
			<text
				y="85%"
				x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
				text-anchor="start"
				writing-mode="tb"
				class="fill-primary-50 capitalize">{monthMap[period].slice(0, 3)}</text
			>
		{:else}
			<text
				class="fill-primary-50"
				y="85%"
				x="{(100 / (periods[group].length + 1)) * (index + 1)}%"
				text-anchor="middle"
				dominant-baseline="hanging">{period}</text
			>
		{/if}
		{#key distribution}
			<rect
				x="{(100 / (periods[group].length + 1)) * (index + 1 / 2)}%"
				y="{83 - barHeight(period)}%"
				width="{100 / (periods[group].length + 1)}%"
				height="{barHeight(period)}%"
				rx="1%"
				class="fill-primary-700 transition-colors hover:fill-primary-600 focus:fill-primary-600"
				role="figure"
				on:mouseover={() => handleTooltip(period, index)}
				on:focus={() => handleTooltip(period, index)}
				on:mouseout={() => (tooltip = false)}
				on:blur={() => (tooltip = false)}
			></rect>
		{/key}
	{/each}
	{#if tooltip}
		<text x="{x}%" y="{y}%" text-anchor="middle" class="fill-primary-50" role="tooltip"
			>{millisecondsToClock(tooltipData)}</text
		>
	{/if}
	<line x1="0%" x2="100%" y1="83%" y2="83%" class="stroke-primary-800"></line>
</svg>
