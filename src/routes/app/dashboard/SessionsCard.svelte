<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import SessionsTable from './SessionsTable.svelte';

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + (Date.parse(object.end) - Date.parse(object.start));
	}, 0);
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<div class="flex justify-around gap-2 p-2 text-center flex-wrap">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Sessions</h2>
			<p class="text-accent-500 md:text-xl">
				{$filteredSessions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Total</h2>
			<p class="text-accent-500 md:text-xl">
				{millisecondsToClock(duration)}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Average Session</h2>
			<p class="text-accent-500 md:text-xl">
				{duration ? millisecondsToClock(duration / $filteredSessions.length): '-'}
			</p>
		</div>
	</div>
	<SessionsTable />
</Card>
