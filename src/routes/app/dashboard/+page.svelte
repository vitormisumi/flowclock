<script lang="ts">
	import { getContext } from 'svelte';
	import type { Session, Distraction } from '../types';
	import type { Writable } from 'svelte/store';
	import { filter, filteredSessions, filteredDistractions } from './stores';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { session, sessionBreak } from '../session/stores';
	import Filter from './Filter.svelte';
	import Sessions from './Sessions.svelte';

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
			break;
		case 'week':
			if (current) {
				$filteredSessions = $sessions.filter((x) => {
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
			break;
		case 'year':
			$filteredSessions = $sessions.filter((x) => {
				const date = new Date(x.start);
				return date.getFullYear() + 1 === today.getFullYear() + current;
			});
			break;
		default:
			$filteredSessions = $sessions;
	}
</script>

<div
	class="p-4 md:p-8 lg:p-12"
	in:fade={$navigating?.from?.url.pathname === '/app/session' &&
	($session.running || ($sessionBreak.running && !$sessionBreak.alarmPlayed))
		? { duration: 500, delay: 500 }
		: { duration: 0 }}
>
	<Filter />
	<Sessions />
</div>
