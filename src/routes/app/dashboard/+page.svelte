<script lang="ts">
	import { getContext } from 'svelte';
	import type { Interruption, Session } from '../types';
	import type { Writable } from 'svelte/store';
	import { filter, filteredInterruptions, filteredSessions } from './stores';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import Filter from './Filter.svelte';
	import SessionsCard from './SessionsCard.svelte';
	import Notification from '../../Notification.svelte';
	import InterruptionsCard from './InterruptionsCard.svelte';
	import TimeFrameCard from './TimeFrameCard.svelte';

	export let form;

	const sessions: Writable<Session[]> = getContext('sessions');
	const interruptions: Writable<Interruption[]> = getContext('interruptions');

	const today = new Date();
	$: current = $filter.current ? 1 : 0;

	$: switch ($filter.timeframe) {
		case 'day':
			$filteredSessions = $sessions.filter((x) => {
				const date = new Date(x.start);
				return (
					date.getDate() + 1 === today.getDate() + current &&
					date.getMonth() === today.getMonth() &&
					date.getFullYear() === today.getFullYear()
				);
			});
			$filteredInterruptions = $interruptions.filter((x) => {
				const date = new Date(x.start);
				return (
					date.getDate() + 1 === today.getDate() + current &&
					date.getMonth() === today.getMonth() &&
					date.getFullYear() === today.getFullYear()
				);
			});
			break;
		case 'week':
			if (current) {
				$filteredSessions = $sessions.filter((x) => {
					const date = Date.parse(x.start);
					const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
					return date > beginningOfWeek;
				});
				$filteredInterruptions = $interruptions.filter((x) => {
					const date = Date.parse(x.start);
					const beginningOfWeek = new Date().setHours(0, 0, 0, 0) - today.getDay() * 86400000;
					return date > beginningOfWeek;
				});
			} else {
				$filteredSessions = $sessions.filter((x) => {
					const date = Date.parse(x.start);
					const beginningOfLastWeek =
						new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
					const endOfLastWeek =
						new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
					return date > beginningOfLastWeek && date < endOfLastWeek;
				});
				$filteredInterruptions = $interruptions.filter((x) => {
					const date = Date.parse(x.start);
					const beginningOfLastWeek =
						new Date().setHours(23, 59, 59, 999) - 604800000 - (1 + today.getDay()) * 86400000;
					const endOfLastWeek =
						new Date().setHours(23, 59, 59, 999) - (1 + today.getDay()) * 86400000;
					return date > beginningOfLastWeek && date < endOfLastWeek;
				});
			}
			break;
		case 'month':
			$filteredSessions = $sessions.filter((x) => {
				const date = new Date(x.start);
				return (
					date.getMonth() + 1 === today.getMonth() + current &&
					date.getFullYear() === today.getFullYear()
				);
			});
			$filteredInterruptions = $interruptions.filter((x) => {
				const date = new Date(x.start);
				return (
					date.getMonth() + 1 === today.getMonth() + current &&
					date.getFullYear() === today.getFullYear()
				);
			});
			break;
		case 'year':
			$filteredSessions = $sessions.filter((x) => {
				const date = new Date(x.start);
				return date.getFullYear() + 1 === today.getFullYear() + current;
			});
			$filteredInterruptions = $interruptions.filter((x) => {
				const date = new Date(x.start);
				return date.getFullYear() + 1 === today.getFullYear() + current;
			});
			break;
		default:
			$filteredSessions = $sessions;
			$filteredInterruptions = $interruptions;
	}
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	{#if $sessions.length === 0}
		<div class="flex items-center absolute inset-0 justify-center">
			<p class="text-center text-lg text-secondary-100">
				You have no sessions yet. <br />Complete your first session to start analysing your data.
			</p>
		</div>
	{:else}
		<div class="flex justify-center pb-4">
			<Filter />
		</div>
		<div class="grid place-items-start gap-4 lg:grid-cols-2 xl:grid-cols-3">
			<SessionsCard />
			<TimeFrameCard />
			<InterruptionsCard />
		</div>
	{/if}
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
