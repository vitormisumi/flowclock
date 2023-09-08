<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { Session } from '../session/types';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { dateFromTimestamp, timeFromTimestamp } from '$lib/functions/functions';

	const sessions: Writable<Session[]> = getContext('sessions');
</script>

<h2 class="text-xl font-bold text-secondary-50">Last Sessions</h2>
<Table shadow>
	<TableHead>
		<TableHeadCell>Date</TableHeadCell>
		<TableHeadCell>Start</TableHeadCell>
		<TableHeadCell>End</TableHeadCell>
		<TableHeadCell>Duration</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each $sessions as session, i}
			{#if i < 10}
				<TableBodyRow>
					<TableBodyCell>{dateFromTimestamp(session.started_at)}</TableBodyCell>
					<TableBodyCell>{timeFromTimestamp(session.started_at)}</TableBodyCell>
					<TableBodyCell>{timeFromTimestamp(session.ended_at)}</TableBodyCell>
					<TableBodyCell>{session.duration}</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
