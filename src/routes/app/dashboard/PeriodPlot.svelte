<script lang="ts">
	import { Button, Card, Dropdown, Radio } from 'flowbite-svelte';
	import { filteredSessions } from './stores';
	import { dateFromTimestamp } from '$lib/functions/functions';

	$: console.log($filteredSessions.slice(-1));

	let open: boolean = false;
	let group: string = 'week';

	let periods = ['day', 'week', 'month', 'year'];

	let dates: string;

	$: if ($filteredSessions.length === 0) {
		dates = '-';
	} else if (
		dateFromTimestamp($filteredSessions.slice(-1)[0].start) !=
		dateFromTimestamp($filteredSessions[0].start)
	) {
		dates =
			dateFromTimestamp($filteredSessions.slice(-1)[0].start) +
			' - ' +
			dateFromTimestamp($filteredSessions[0].start);
	} else {
		dates = dateFromTimestamp($filteredSessions[0].start);
	}
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-xl">Time Frame</h2>
			<p class="text-center text-lg text-accent-500 md:text-2xl">{dates}</p>
		</div>
		<Button size="xs" class="bg-primary-800 hover:bg-primary-700"
			><i class="fa-solid fa-calendar" /></Button
		>
		<Dropdown class="grid gap-2 rounded-lg bg-primary-50 p-3" bind:open>
			{#each periods as period}
				<li>
					<Radio
						name="sort"
						bind:group
						value={period}
						on:click={() => (open = false)}
						class="text-primary-900">{period}</Radio
					>
				</li>
			{/each}
		</Dropdown>
	</div>
	<svg width="100%" height="100%" class="rounded-xl bg-primary-900 p-2"> </svg>
</Card>
