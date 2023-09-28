<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import SessionsTable from './SessionsTable.svelte';

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + object.duration;
	}, 0);
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<div class="flex justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">Sessions</h2>
			<p class="text-lg text-accent-500 md:text-2xl">
				{$filteredSessions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">Total Duration</h2>
			<p class="text-lg text-accent-500 md:text-2xl">
				{millisecondsToClock(duration)}
			</p>
		</div>
	</div>
	<SessionsTable />
</Card>
