<script lang="ts">
	import { navigating } from '$app/stores';
	import { dateFromTimestamp } from '$lib/functions/functions';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import Clock from '../Clock.svelte';
	import Card from './Card.svelte';
	import Filter from './Filter.svelte';
	import PlotCard from './PlotCard.svelte';
	import { filteredInterruptions, filteredSessions } from './stores';

	const sessions: Writable<UserSession[]> = getContext('sessions');
	const settings: Writable<Settings> = getContext('settings');

	export let form;

	$: sessionsWithFocus = $filteredSessions.reduce(
		(acc, item) => (item.task_id || item.intention_id ? acc + 1 : acc),
		0
	);
	$: percentageWithFocus = ((sessionsWithFocus / $filteredSessions.length) * 100).toFixed(1);

	$: filteredProjects = new Set($filteredSessions.map((x) => x.project_id)).size;

	$: sessionsPerProject = isNaN($filteredSessions.length / filteredProjects)
		? '-'
		: ($filteredSessions.length / filteredProjects).toFixed(1);

	let dates: string;

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

	$: numberOfDays = new Set($filteredSessions.map(session => {
        const date = new Date(session.start);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    })).size;

	$: perSession = $filteredSessions.length
		? ($filteredInterruptions.length / $filteredSessions.length).toFixed(2)
		: '-';
</script>

<div
	class="fixed top-0 w-screen scale-50 landscape:left-8 landscape:md:left-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session' ? { duration: 500 } : { duration: 0 }}
>
	<Clock />
</div>
{#if $sessions.length === 0}
	<div class="absolute inset-0 flex items-center justify-center">
		<p class="text-center text-lg dark:text-secondary-100">
			You have no sessions yet. <br />Complete your first session to start analysing your data.
		</p>
	</div>
{:else}
	<div class="flex justify-end pb-4">
		<Filter />
	</div>
	<div
		class="grid grid-flow-row auto-rows-fr grid-cols-2 gap-2 md:h-5/6 md:grid-flow-col md:grid-cols-4 md:gap-4"
	>
		<Card plot="focus">
			<span slot="title"> Sessions with Focus </span>
			<span slot="value"> {sessionsWithFocus}</span>
			<span slot="popover_title"> % of Sessions </span>
			<span slot="popover_value">{percentageWithFocus}%</span>
		</Card>
		<Card plot="projects">
			<span slot="title">Projects</span>
			<span slot="value">{filteredProjects}</span>
			<span slot="popover_title"> Sessions/Project </span>
			<span slot="popover_value">{sessionsPerProject}</span>
		</Card>
		<Card plot="timeframe">
			<span slot="title"> Time Frame </span>
			<span slot="value">{dates}</span>
			<span slot="popover_title">Total Number of Days</span>
			<span slot="popover_value">{numberOfDays}</span>
		</Card>
		<Card plot="interruptions">
			<span slot="title"> Interruptions </span>
			<span slot="value">{$filteredInterruptions.length}</span>
			<span slot="popover_title"> per Session </span>
			<span slot="popover_value">{perSession}</span>
		</Card>
		<PlotCard />
	</div>
{/if}
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
