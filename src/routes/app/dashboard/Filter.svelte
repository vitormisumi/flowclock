<script lang="ts">
	import { Button, Drawer } from 'flowbite-svelte';
	import { filter } from './stores';

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

	let hidden: boolean = true;
	function open() {
		hidden = false;
	}
</script>

<div>
	<Button size="sm" on:click={open}
		>{selected[0].name} <i class="fa-solid fa-chevron-down pl-2"></i></Button
	>
</div>
<Drawer
	placement="top"
	width="w-full"
	transitionType="slide"
	class="grid bg-primary-900 landscape:pr-0 landscape:pl-16 landscape:md:pl-24"
	bind:hidden
>
	<div class="flex flex-wrap justify-center gap-2">
		{#each periods as p}
			{#if $filter.timeframe === p.timeframe && $filter.current === p.current}
				<Button
					size="sm"
					class="w-28"
					on:click={() => {
						hidden = true;
						$filter = { timeframe: p.timeframe, current: p.current };
					}}>{p.name}</Button
				>
			{:else}
				<Button
					size="sm"
					class="w-28 border border-primary-700 bg-transparent"
					on:click={() => {
						hidden = true;
						$filter = { timeframe: p.timeframe, current: p.current };
					}}>{p.name}</Button
				>
			{/if}
		{/each}
	</div>
</Drawer>
