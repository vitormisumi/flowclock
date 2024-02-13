<script lang="ts">
	import { millisecondsToClock } from '$lib/functions/functions';
	import { Card } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { filteredSessions, selectedPeriod } from '../dashboard/stores';
	import SessionsTable from './SessionsTable.svelte';
	import TableMenu from './TableMenu.svelte';

	let hidden = true;

	$: duration = $filteredSessions.reduce((accumulator, object) => {
		return accumulator + object.focused_duration;
	}, 0);
</script>

<Card class="h-full min-w-full border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex items-center justify-between">
		<div class="w-8" />
		<p class="text-base font-light text-secondary-900 dark:text-secondary-50 md:text-lg">
			{$selectedPeriod?.name}
		</p>
		<TableMenu bind:hidden />
	</div>
	<div class="flex flex-wrap items-center justify-between gap-2 p-2 text-center">
		<div>
			<h2
				class="text-sm font-thin text-secondary-900 dark:text-secondary-50 md:text-base landscape:text-sm landscape:lg:text-base"
			>
				Sessions
			</h2>
			<p class="text-lg font-semibold text-accent-500 landscape:text-sm landscape:lg:text-2xl">
				{$filteredSessions.length}
			</p>
		</div>
		<div>
			<h2
				class="text-sm font-thin text-secondary-900 dark:text-secondary-50 md:text-base landscape:text-sm landscape:lg:text-base"
			>
				Total
			</h2>
			<p class="text-lg font-semibold text-accent-500 landscape:text-sm landscape:lg:text-2xl">
				{millisecondsToClock(duration)}
			</p>
		</div>
		<div>
			<h2
				class="text-sm font-thin text-secondary-900 dark:text-secondary-50 md:text-base landscape:text-sm landscape:lg:text-base"
			>
				Average Session
			</h2>
			<p class="text-lg font-semibold text-accent-500 landscape:text-sm landscape:lg:text-2xl">
				{duration ? millisecondsToClock(duration / $filteredSessions.length) : '-'}
			</p>
		</div>
	</div>
	{#if !hidden}
		<div transition:slide>
			<SessionsTable />
		</div>
	{/if}
</Card>
