<script lang="ts">
	import { Card, Dropdown, Radio, Tooltip } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { filteredSessions } from './stores';
	import { getContext } from 'svelte';
	import TimeFramePlot from './TimeFramePlot.svelte';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	let dates: string;

	let open = false;

	let years: number[];

	if ($filteredSessions.length === 0) {
		years = [new Date().getFullYear()];
	} else {
		years = [
			...new Set([
				new Date($filteredSessions.slice(-1)[0].start).getFullYear(),
				new Date($filteredSessions[0].start).getFullYear()
			])
		];
	}

	const periods = {
		hour: Array.from({ length: 24 }, (value, index) => index),
		day: Array.from({ length: 31 }, (value, index) => index + 1),
		weekday: Array.from({ length: 7 }, (value, index) => index),
		month: Array.from({ length: 12 }, (value, index) => index),
		year: Array.from(
			{ length: years.length === 1 ? 1 : years[1] - years[0] + 1 },
			(value, index) => years[0] + index
		)
	};

	let group: keyof typeof periods = 'weekday';

	$: {
		if ($filteredSessions.length === 0) {
			dates = '-';
		} else {
			const startDate = dateFromTimestamp(
				$filteredSessions.slice(-1)[0].start,
				$settings.date_format,
				$settings.separator
			);
			const endDate = dateFromTimestamp(
				$filteredSessions[0].start,
				$settings.date_format,
				$settings.separator
			);

			dates = startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
		}
	}
</script>

<Card
	class="h-[max(50vh,_400px)] min-h-full min-w-full border-0 bg-secondary-100 dark:bg-secondary-800"
>
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				Time Frame
			</h2>
			<p class="text-center text-accent-500 md:text-xl">{dates}</p>
		</div>
		<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-calendar" /></Button>
		<Dropdown class="grid gap-2 rounded-lg bg-secondary-200 p-3 dark:bg-secondary-700" bind:open>
			{#each Object.keys(periods) as period}
				<li>
					<Radio
						name="sort"
						value={period}
						class="dark:text-secondary-50"
						on:change={() => (open = false)}
						bind:group
					>
						{period}
					</Radio>
				</li>
			{/each}
		</Dropdown>
	</div>
	<TimeFramePlot {periods} {group} />
</Card>
