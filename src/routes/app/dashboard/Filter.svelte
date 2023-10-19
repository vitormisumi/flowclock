<script lang="ts">
	import { Button, Drawer, Tooltip } from 'flowbite-svelte';
	import { filter, startRow, endRow, openRow } from './stores';

	let periods = [
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

	$: selected = periods.filter(
		(x) => x.timeframe === $filter.timeframe && x.current === $filter.current
	);

	let hidden = true;
	function open() {
		hidden = false;
	}

	function applyFilter(period: Period) {
		hidden = true;
		$filter = { timeframe: period.timeframe, current: period.current };
		$startRow = 0;
		$endRow = 9;
		$openRow = null;
	}
</script>

<div>
	<Button size="sm" class="w-36" on:click={open}
		>{selected[0].name} <i class="fa-solid fa-chevron-down pl-2"></i></Button
	>
	<Tooltip>Select time period</Tooltip>
</div>
<Drawer transitionType="fly" transitionParams={{x: 100}} placement="right" width="w-40" class="z-50 bg-primary-900" bind:hidden>
	<div class="flex flex-wrap justify-center gap-2">
		{#each periods as period}
			<Button
				size="sm"
				class={$filter.timeframe === period.timeframe && $filter.current === period.current
					? 'w-28'
					: 'w-28 border border-primary-700 bg-transparent'}
				on:click={() => applyFilter(period)}>{period.name}</Button
			>
		{/each}
	</div>
</Drawer>
