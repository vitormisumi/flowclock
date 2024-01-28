<script lang="ts">
	import { Card, Dropdown, Radio } from 'flowbite-svelte';
	import Button from '$lib/components/Button.svelte';
	import { filteredInterruptions, filteredSessions } from './stores';
	import InterruptionsPlot from './InterruptionsPlot.svelte';

	$: perSession = $filteredSessions.length
		? ($filteredInterruptions.length / $filteredSessions.length).toFixed(2)
		: '-';

	let group: string = 'frequency';

	let open = false;

	let options: string[] = ['frequency', 'duration'];
</script>

<Card class="h-full min-w-full border-0 bg-secondary-100 dark:bg-secondary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				Interruptions
			</h2>
			<p class="text-center text-accent-500 md:text-xl">
				{$filteredInterruptions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-900 dark:text-primary-50 md:text-lg">
				per Session
			</h2>
			<p class="text-center text-accent-500 md:text-xl">{perSession}</p>
		</div>
		<Button size="xs" buttonStyle="menu"><i class="fa-solid fa-sort" /></Button>
		<Dropdown class="grid gap-2 rounded-lg bg-secondary-200 p-3 dark:bg-secondary-700" bind:open>
			{#each options as option}
				<li>
					<Radio
						name="sort"
						bind:group
						value={option}
						on:click={() => (open = false)}
						class="dark:text-secondary-50">{option}</Radio
					>
				</li>
			{/each}
		</Dropdown>
	</div>
	{#if $filteredInterruptions.length}
		<InterruptionsPlot {group} />
	{/if}
</Card>
