<script lang="ts">
	import {
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { dateFromTimestamp, millisecondsToClock, timeFromTimestamp } from '$lib/functions/functions';

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + object.duration;
	}, 0);
</script>

<Card size="md">
	<div class="flex justify-around gap-2 text-center p-4">
		<div>
			<h2 class="text-xl font-bold text-primary-500">Number of Sessions</h2>
			<p>{$filteredSessions.length}</p>
		</div>
		<div>
			<h2 class="text-xl font-bold text-primary-500">Total Duration</h2>
			<p>{millisecondsToClock(duration)}</p>
		</div>
	</div>
	<Table hoverable>
		<TableHead>
			<TableHeadCell>Date</TableHeadCell>
			<TableHeadCell>Start</TableHeadCell>
			<TableHeadCell>End</TableHeadCell>
			<TableHeadCell>Duration</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $filteredSessions as session, i}
				{#if i < 10}
					<TableBodyRow>
						<TableBodyCell>{dateFromTimestamp(session.start)}</TableBodyCell>
						<TableBodyCell>{timeFromTimestamp(session.start)}</TableBodyCell>
						<TableBodyCell>{timeFromTimestamp(session.end)}</TableBodyCell>
						<TableBodyCell>{millisecondsToClock(session.duration)}</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
</Card>
