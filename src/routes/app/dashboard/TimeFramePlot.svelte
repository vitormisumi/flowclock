<script lang="ts">
	import { monthMap, weekdayMap } from '$lib/constants/constants';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { filteredSessions } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	export let periods: {
		hour: number[];
		day: number[];
		weekday: number[];
		month: number[];
		year: number[];
	};

	export let timeFrameGroup: keyof typeof periods;

	let distribution: { [key: number]: number };

	$: {
		const dateGetter = {
			hour: (date: Date) => date.getHours(),
			day: (date: Date) => date.getDate(),
			weekday: (date: Date) => date.getDay(),
			month: (date: Date) => date.getMonth(),
			year: (date: Date) => date.getFullYear()
		};

		distribution = Object.fromEntries(
			Object.entries(
				$filteredSessions.reduce(
					(distribution, item) => {
						const startPeriod = dateGetter[timeFrameGroup](new Date(item.start));
						distribution[startPeriod] = (distribution[startPeriod] || 0) + item.focused_duration;
						return distribution;
					},
					{} as { [key: number]: number }
				)
			)
		);
	}

	function barHeight(period: number): number {
		return (
			(distribution[period] /
				Object.values(distribution).reduce((accumulator, value) => {
					return accumulator + value;
				}, 0)) *
			73
		);
	}

	let tooltip = false;
	let tooltipData: { period: number; value: number };
	let x: number = 0;
	let y: number = 0;

	function handleTooltip(period: number, index: number) {
		tooltip = true;
		tooltipData = { period: period, value: distribution[period] };
		x = (100 / (periods[timeFrameGroup].length + 1)) * (index + 1);
		y = 82 - barHeight(period);
	}

	function hourFormat(period: number) {
		const is24HourFormat = $settings.clock_format;
		const isMidnight = period === 0;
		const isNoon = period === 12;
		const isMorning = period < 12;

		if (is24HourFormat) {
			return period < 10 ? `0${period}:00` : `${period}:00`;
		}
		if (isMidnight) {
			return '12:00 AM';
		} else if (isMorning) {
			return `${period}:00 AM`;
		} else if (isNoon) {
			return '12:00 PM';
		} else {
			return `${period - 12}:00 PM`;
		}
	}
</script>

<svg width="100%" height="100%" class="rounded-xl bg-secondary-50 p-2 dark:bg-secondary-900">
	{#each periods[timeFrameGroup] as period, index}
		{#if timeFrameGroup === 'hour' && index % 6 === 3}
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="85%"
				text-anchor="middle"
				dominant-baseline="hanging"
				class="text-sm font-thin dark:fill-primary-50 md:text-base"
			>
				{hourFormat(period).split(' ')[0]}
			</text>
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="90%"
				text-anchor="middle"
				dominant-baseline="hanging"
				class="text-sm font-thin dark:fill-primary-50 md:text-base"
			>
				{hourFormat(period).split(' ')[1] ? hourFormat(period).split(' ')[1] : ''}
			</text>
		{:else if timeFrameGroup === 'day' && index % 5 === 0}
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="85%"
				text-anchor="middle"
				dominant-baseline="hanging"
				class="text-sm font-thin dark:fill-primary-50 md:text-base"
			>
				{period}
			</text>
		{:else if timeFrameGroup === 'weekday'}
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="85%"
				text-anchor="start"
				writing-mode="tb"
				class="text-sm font-thin capitalize dark:fill-primary-50 md:text-base"
			>
				{weekdayMap[period].slice(0, 3)}
			</text>
		{:else if timeFrameGroup === 'month'}
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="85%"
				text-anchor="start"
				writing-mode="tb"
				class="text-sm font-thin capitalize dark:fill-primary-50 md:text-base"
			>
				{monthMap[period].slice(0, 3)}
			</text>
		{:else if timeFrameGroup === 'year'}
			<text
				x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1)}%"
				y="85%"
				text-anchor="middle"
				dominant-baseline="hanging"
				class="text-sm font-thin dark:fill-primary-50 md:text-base"
			>
				{period}
			</text>
		{/if}
		{#key distribution}
			{#if distribution[period]}
				<rect
					x="{(100 / (periods[timeFrameGroup].length + 1)) * (index + 1 / 2)}%"
					y="{83 - barHeight(period)}%"
					width="{100 / (periods[timeFrameGroup].length + 1)}%"
					height="{barHeight(period)}%"
					rx="1%"
					class="fill-primary-500 transition-colors hover:fill-primary-600 focus:fill-primary-600 focus:outline-none"
					role="figure"
					on:mouseover={() => handleTooltip(period, index)}
					on:focus={() => handleTooltip(period, index)}
					on:mouseout={() => (tooltip = false)}
					on:blur={() => (tooltip = false)}
				></rect>
			{/if}
		{/key}
	{/each}
	{#if tooltip}
		<text
			x="{x}%"
			y="{y - 4}%"
			text-anchor="middle"
			class="text-sm font-extralight capitalize dark:fill-primary-50"
			role="tooltip"
		>
			{timeFrameGroup === 'hour'
				? hourFormat(tooltipData.period)
				: timeFrameGroup === 'day'
				? tooltipData.period > 9
					? tooltipData.period
					: '0' + tooltipData.period
				: timeFrameGroup === 'weekday'
				? weekdayMap[tooltipData.period]
				: timeFrameGroup === 'month'
				? monthMap[tooltipData.period]
				: tooltipData.period}
		</text>
		<text
			x="{x}%"
			y="{y}%"
			text-anchor="middle"
			class="text-sm dark:fill-primary-50"
			role="tooltip"
		>
			{millisecondsToClock(tooltipData.value)}
		</text>
	{/if}
	<line x1="0%" x2="100%" y1="83%" y2="83%" class="dark:stroke-secondary-800"></line>
</svg>
