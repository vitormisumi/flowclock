<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import SessionsTable from './SessionsTable.svelte';

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + object.focused_duration;
	}, 0);
</script>

<Card class="h-full min-w-full border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex flex-wrap justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				Sessions
			</h2>
			<p class="text-accent-500 md:text-xl">
				{$filteredSessions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">Total</h2>
			<p class="text-accent-500 md:text-xl">
				{millisecondsToClock(duration)}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				Average Session
			</h2>
			<p class="text-accent-500 md:text-xl">
				{duration ? millisecondsToClock(duration / $filteredSessions.length) : '-'}
			</p>
		</div>
	</div>
	<SessionsTable />
</Card>
