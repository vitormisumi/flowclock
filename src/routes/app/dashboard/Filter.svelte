<script lang="ts">
	import { Button, Drawer, Tooltip } from 'flowbite-svelte';
	import { filter, startRow, endRow, openRow, filteredSessions, filteredInterruptions } from './stores';
	import { periods } from '$lib/constants/constants';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const sessions: Writable<UserSession[]> = getContext('sessions');
	const interruptions: Writable<Interruption[]> = getContext('interruptions');

	$: selectedPeriod = periods.filter(
		(x) => x.timeframe === $filter.timeframe && x.current === $filter.current
	);

	let periodDrawerHidden = true;
	
	function openPeriodDrawer() {
		periodDrawerHidden = false;
	}

	function applyFilter(period: Period) {
		periodDrawerHidden = true;
		$filter = { timeframe: period.timeframe, current: period.current};
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

	function filterSessionsByDay(sessions: FilteredSession[], today: Date, current: number): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getDate() + 1 === today.getDate() + current &&
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	function filterInterruptionsByDay(interruptions: Interruption[], today: Date, current: number): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getDate() + 1 === today.getDate() + current &&
				date.getMonth() === today.getMonth() &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	function filterSessionsByCurrentWeek(sessions: FilteredSession[], today: Date): FilteredSession[] {
		return sessions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
			return date > beginningOfWeek;
		});
	}

	function filterInterruptionsByCurrentWeek(interruptions: Interruption[], today: Date): Interruption[] {
		return interruptions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
			return date > beginningOfWeek;
		});
	}

	function filterSessionsByLastWeek(sessions: FilteredSession[], today: Date): FilteredSession[] {
		return sessions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
			const endOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
			return date > beginningOfLastWeek && date < endOfLastWeek;
		});
	}

	function filterInterruptionsByLastWeek(interruptions: Interruption[], today: Date): Interruption[] {
		return interruptions.filter((x) => {
			const date = Date.parse(x.start);
			const beginningOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
			const endOfLastWeek =
				new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
			return date > beginningOfLastWeek && date < endOfLastWeek;
		});
	}

	function filterSessionsByMonth(sessions: FilteredSession[], today: Date, current: number): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getMonth() + 1 === today.getMonth() + current &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	function filterInterruptionsByMonth(interruptions: Interruption[], today: Date, current: number): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return (
				date.getMonth() + 1 === today.getMonth() + current &&
				date.getFullYear() === today.getFullYear()
			);
		});
	}

	function filterSessionsByYear(sessions: FilteredSession[], today: Date, current: number): FilteredSession[] {
		return sessions.filter((x) => {
			const date = new Date(x.start);
			return date.getFullYear() + 1 === today.getFullYear() + current;
		});
	}

	function filterInterruptionsByYear(interruptions: Interruption[], today: Date, current: number): Interruption[] {
		return interruptions.filter((x) => {
			const date = new Date(x.start);
			return date.getFullYear() + 1 === today.getFullYear() + current;
		});
	}

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
	<Button size="sm" class="w-36" on:click={openPeriodDrawer}
		>{selectedPeriod[0].name} <i class="fa-solid fa-chevron-down pl-2"></i></Button
	>
	<Tooltip>Select time period</Tooltip>
</div>
<Drawer
	transitionType="fly"
	transitionParams={{ x: 100 }}
	placement="right"
	width="w-40"
	class="z-50 bg-primary-900"
	bind:hidden={periodDrawerHidden}
>
	<div class="flex flex-wrap justify-center gap-2">
		<h2 class="col-start-2 text-center font-bold text-primary-50">Filter period</h2>
		{#each periods as period}
			<Button
				size="sm"
				class="w-28 {$filter.timeframe === period.timeframe && $filter.current === period.current
					? 'border border-primary-700 bg-transparent'
					: ''}"
				on:click={() => applyFilter(period)}>{period.name}</Button
			>
		{/each}
	</div>
</Drawer>
