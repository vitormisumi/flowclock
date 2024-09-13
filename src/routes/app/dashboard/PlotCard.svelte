<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { Card, Dropdown, Radio } from 'flowbite-svelte';
	import { canHover } from '../stores';
	import FocusPlot from './FocusPlot.svelte';
	import InterruptionsPlot from './InterruptionsPlot.svelte';
	import ProjectsPlot from './ProjectsPlot.svelte';
	import TimeFramePlot from './TimeFramePlot.svelte';
	import { filteredSessions, selectedPlot } from './stores';

	export let projects: Project[]
	export let settings: Settings
	export let intentions: Intention[]
	export let tasks: Task[]

	let years: number[];

	let group: 'frequency' | 'duration' = 'frequency';

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

	let timeFrameGroup: keyof typeof periods = 'weekday';

	let open = false;
</script>

<Card
	class="col-span-2 row-span-6 flex min-w-full flex-col gap-2 border-0 bg-secondary-100 dark:bg-secondary-800 md:col-span-3 md:row-span-4"
>
	<div class="flex justify-end">
		<Button id="groupby" size="xs" buttonStyle="menu"><iconify-icon icon="ion:filter" /></Button>
		<Dropdown class="grid gap-2 rounded-lg bg-secondary-200 p-3 dark:bg-secondary-700" bind:open>
			{#if $selectedPlot === 'timeframe'}
				{#each Object.keys(periods) as period}
					<li>
						<Radio
							name="sort"
							value={period}
							class="dark:text-secondary-50"
							on:change={() => (open = false)}
							bind:group={timeFrameGroup}
						>
							{period}
						</Radio>
					</li>
				{/each}
			{:else}
				{#each ['frequency', 'duration'] as option}
					<li>
						<Radio
							name="sort"
							value={option}
							class="dark:text-secondary-50"
							on:change={() => (open = false)}
							bind:group
						>
							{option}
						</Radio>
					</li>
				{/each}
			{/if}
		</Dropdown>
		{#if $canHover}
			<Tooltip triggeredBy="#groupby" placement="left">Group by</Tooltip>
		{/if}
	</div>
	{#if $selectedPlot === 'focus'}
		<FocusPlot {group} {tasks} {intentions}/>
	{:else if $selectedPlot === 'projects'}
		<ProjectsPlot {group} {projects}/>
	{:else if $selectedPlot === 'timeframe'}
		<TimeFramePlot {periods} {timeFrameGroup} {settings}/>
	{:else if $selectedPlot === 'interruptions'}
		<InterruptionsPlot {group} />
	{/if}
</Card>
