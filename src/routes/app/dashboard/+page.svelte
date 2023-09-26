<script lang="ts">
	import { getContext } from 'svelte';
	import type { Distraction, Session } from '../types';
	import type { Writable } from 'svelte/store';
	import { filter, filteredDistractions, filteredSessions } from './stores';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import Filter from './Filter.svelte';
	import Sessions from './Sessions.svelte';
	import Notification from '../../Notification.svelte';
	import Distractions from './Distractions.svelte';

	export let form;

	const sessions: Writable<Session[]> = getContext('sessions');
	const distractions: Writable<Distraction[]> = getContext('distractions');

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
			$filteredDistractions = $distractions.filter((x) => {
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
				$filteredDistractions = $distractions.filter((x) => {
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
				$filteredDistractions = $distractions.filter((x) => {
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
			$filteredDistractions = $distractions.filter((x) => {
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
			$filteredDistractions = $distractions.filter((x) => {
				const date = new Date(x.start);
				return date.getFullYear() + 1 === today.getFullYear() + current;
			});
			break;
		default:
			$filteredSessions = $sessions;
			$filteredDistractions = $distractions;
	}
</script>

<div
	in:fade={$navigating?.from?.url.pathname === '/app/session'
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<div class="grid gap-4">
		<Filter />
		<div class="grid place-items-start gap-4 lg:grid-cols-2">
			<Sessions />
			<Distractions />
		</div>
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
