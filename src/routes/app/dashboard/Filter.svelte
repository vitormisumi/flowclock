<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { filter } from './stores';

	let period = [
		{
			name: 'Today',
			timeframe: 'day',
			current: true
		},
		{
			name: 'Yesterday',
			timeframe: 'day',
			current: false
		},
		{
			name: 'This week',
			timeframe: 'week',
			current: true
		},
		{
			name: 'Last week',
			timeframe: 'week',
			current: false
		},
		{
			name: 'This month',
			timeframe: 'month',
			current: true
		},
		{
			name: 'Last month',
			timeframe: 'month',
			current: false
		},
		{
			name: 'This year',
			timeframe: 'year',
			current: true
		},
		{
			name: 'Last year',
			timeframe: 'year',
			current: false
		},
		{
			name: 'All time',
			timeframe: 'all',
			current: true
		}
	];

	// let startDate: string;

	// $: if ($filter.timeframe === 'day' && $filter.current) {
	//     startDate = new Date().toDateString()
	// } else if ($filter.timeframe === 'day' && !$filter.current) {

	// }
</script>

<div class="flex flex-wrap justify-center gap-2 pb-4">
	{#each period as p}
		{#if $filter.timeframe === p.timeframe && $filter.current === p.current}
			<Button
				size="sm"
				class="w-28"
				on:click={() => ($filter = { timeframe: p.timeframe, current: p.current })}>{p.name}</Button
			>
		{:else}
			<Button
				size="sm"
				class="w-28 border border-primary-700 bg-transparent"
				on:click={() => ($filter = { timeframe: p.timeframe, current: p.current })}>{p.name}</Button
			>
		{/if}
	{/each}
</div>
<!-- <p class="text-white">{startDate}</p> -->
