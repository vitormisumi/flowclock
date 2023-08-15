<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
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

	const sessions: Writable<Session[]> = getContext('sessions');
</script>

<h2 class="text-secondary-50 text-xl font-bold">Last Sessions</h2>
<Table shadow>
	<TableHead>
		<TableHeadCell>Start</TableHeadCell>
		<TableHeadCell>End</TableHeadCell>
		<TableHeadCell>Duration</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each $sessions as session, i}
			{#if i < 10}
				<TableBodyRow>
					<TableBodyCell>{session.started_at}</TableBodyCell>
					<TableBodyCell>{session.ended_at}</TableBodyCell>
					<TableBodyCell>{session.duration}</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
