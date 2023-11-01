<script lang="ts">
	import { Button, Card, Dropdown, Radio } from 'flowbite-svelte';
	import { filteredInterruptions, filteredSessions } from './stores';
	import InterruptionsPlot from './InterruptionsPlot.svelte';

	$: perSession = $filteredSessions.length
		? ($filteredInterruptions.length / $filteredSessions.length).toFixed(2)
		: '-';

	let group: string = 'frequency';

	let open = false;

	let options: string[] = ['frequency', 'duration'];
</script>

<Card class="h-full min-w-full border-0 bg-primary-800">
	<div class="flex flex-wrap items-center justify-around gap-2 p-2 text-center">
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">Interruptions</h2>
			<p class="text-center text-accent-500 md:text-xl">
				{$filteredInterruptions.length}
			</p>
		</div>
		<div>
			<h2 class="text-sm font-semibold text-primary-50 md:text-lg">per Session</h2>
			<p class="text-center text-accent-500 md:text-xl">{perSession}</p>
		</div>
		<Button size="xs" class="bg-primary-800 hover:bg-primary-700 transition-colors"
			><i class="fa-solid fa-sort" /></Button
		>
		<Dropdown class="grid gap-2 rounded-lg bg-primary-50 p-3" bind:open>
			{#each options as option}
				<li>
					<Radio
						name="sort"
						bind:group
						value={option}
						on:click={() => (open = false)}
						class="text-primary-900">{option}</Radio
					>
				</li>
			{/each}
		</Dropdown>
	</div>
	{#if $filteredInterruptions.length}
		<InterruptionsPlot {group} />
	{/if}
</Card>
