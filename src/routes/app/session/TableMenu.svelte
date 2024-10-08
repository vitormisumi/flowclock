<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { periods } from '$lib/constants/constants';
	import { Dropdown, DropdownDivider } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import {
		endRow,
		filter,
		filteredInterruptions,
		filteredSessions,
		openRow,
		startRow
	} from '../dashboard/stores';
	import { canHover } from '../stores';
	import {
		filterInterruptionsByCurrentWeek,
		filterInterruptionsByDay,
		filterInterruptionsByLastWeek,
		filterInterruptionsByMonth,
		filterInterruptionsByYear,
		filterSessionsByCurrentWeek,
		filterSessionsByDay,
		filterSessionsByLastWeek,
		filterSessionsByMonth,
		filterSessionsByYear
	} from './filter';

	const sessions: Writable<UserSession[]> = getContext('sessions');
	const interruptions: Writable<Interruption[]> = getContext('interruptions');

	function applyFilter(period: Period) {
		$filter = { timeframe: period.timeframe, current: period.current };
		$startRow = 0;
		$endRow = 9;
		$openRow = null;
	}

	let finishedSessions: FilteredSession[];
	$: finishedSessions = $sessions.filter(
		(x): x is FilteredSession => x.focused_duration !== null && x.end !== null
	);

	const today = new Date();
	$: current = $filter.current ? 1 : 0;

	$: {
		switch ($filter.timeframe) {
			case 'day':
				$filteredSessions = filterSessionsByDay(finishedSessions, today, current);
				$filteredInterruptions = filterInterruptionsByDay($interruptions, today, current);
				break;
			case 'week':
				if (current) {
					$filteredSessions = filterSessionsByCurrentWeek(finishedSessions, today);
					$filteredInterruptions = filterInterruptionsByCurrentWeek($interruptions, today);
				} else {
					$filteredSessions = filterSessionsByLastWeek(finishedSessions, today);
					$filteredInterruptions = filterInterruptionsByLastWeek($interruptions, today);
				}
				break;
			case 'month':
				$filteredSessions = filterSessionsByMonth(finishedSessions, today, current);
				$filteredInterruptions = filterInterruptionsByMonth($interruptions, today, current);
				break;
			case 'year':
				$filteredSessions = filterSessionsByYear(finishedSessions, today, current);
				$filteredInterruptions = filterInterruptionsByYear($interruptions, today, current);
				break;
			default:
				$filteredSessions = finishedSessions;
				$filteredInterruptions = $interruptions;
		}
	}

	export let hidden: boolean;

	let open = false;
	let openPeriods = false;
</script>

<Button size="xs" buttonStyle="menu">
	<iconify-icon icon="ion:ellipsis-vertical" />
</Button>
<Dropdown
	class="flex flex-col justify-items-center rounded-lg bg-secondary-200 p-1 dark:bg-secondary-700"
	bind:open
>
	<Button id="calendar" size="xs" buttonStyle="menu" on:click={() => (openPeriods = !openPeriods)}>
		<iconify-icon icon="ion:calendar" />
	</Button>
	<Dropdown
		placement="right-start"
		class="flex w-full flex-col justify-center rounded-md bg-secondary-200 p-1 dark:bg-secondary-700"
		bind:open={openPeriods}
	>
		{#each periods as period}
			<Button
				size="xs"
				buttonStyle="menu"
				class="w-24"
				on:click={() => {
					applyFilter(period);
					open = false;
				}}
			>
				{period.name}
			</Button>
		{/each}
	</Dropdown>
	{#if $canHover}
		<Tooltip placement="left" triggeredBy="#calendar">Filter period</Tooltip>
	{/if}
	<DropdownDivider class="bg-secondary-100 dark:bg-secondary-800" />
	<Button
		size="xs"
		buttonStyle="menu"
		on:click={() => {
			hidden = !hidden;
			open = false;
		}}
	>
		<iconify-icon icon="{hidden ? 'ion:eye' : 'ion:eye-off'}" />
	</Button>
	{#if $canHover}
		<Tooltip placement="left">
			{hidden ? 'Show' : 'Hide'} table
		</Tooltip>
	{/if}
</Dropdown>
