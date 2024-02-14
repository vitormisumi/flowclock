<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { periods } from '$lib/constants/constants';
	import { Drawer } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
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
	import {
		endRow,
		filter,
		filteredInterruptions,
		filteredSessions,
		openRow,
		selectedPeriod,
		startRow
	} from './stores';

	const sessions: Writable<UserSession[]> = getContext('sessions');
	const interruptions: Writable<Interruption[]> = getContext('interruptions');

	let hidden = true;

	function openPeriodDrawer() {
		hidden = false;
	}

	function applyFilter(period: Period) {
		hidden = true;
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
</script>

<div>
	<Button size="sm" buttonStyle="menu" on:click={openPeriodDrawer}>
		{$selectedPeriod?.name} <i class="fa-solid fa-chevron-down pl-2" />
	</Button>
	{#if $canHover}
		<Tooltip placement="left">Select time period</Tooltip>
	{/if}
</div>
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-full md:w-80 lg:w-96"
	class="z-50 bg-secondary-50 dark:bg-secondary-900"
	bind:hidden
>
	<div class="grid gap-4">
		<div class="grid grid-cols-3 place-items-center">
			<h2 class="col-start-2 text-center font-bold text-primary-900 dark:text-primary-50">
				Filter period
			</h2>
			<Button
				size="xs"
				on:click={() => (hidden = true)}
				class="col-start-3 w-fit place-self-end bg-transparent text-secondary-900 dark:bg-transparent dark:text-secondary-50 md:invisible"
			>
				<i class="fa-solid fa-x" />
			</Button>
		</div>
		{#each periods as period}
			<Button
				size="sm"
				disabled={$filter.timeframe === period.timeframe && $filter.current === period.current}
				on:click={() => applyFilter(period)}
			>
				{period.name}
			</Button>
		{/each}
	</div>
</Drawer>
