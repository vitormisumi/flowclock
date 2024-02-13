<script lang="ts">
	import { Card, Popover } from 'flowbite-svelte';
	import { selectedPlot } from './stores';

	export let plot: 'focus' | 'projects' | 'timeframe' | 'interruptions';
</script>

<Card
	class="grid cursor-pointer content-center border-0 py-1 transition-colors {$selectedPlot === plot
		? 'bg-primary-500 dark:bg-primary-700'
		: 'bg-secondary-100 hover:bg-primary-500/50 dark:bg-secondary-800 hover:dark:bg-primary-700/50'}"
	on:click={() => ($selectedPlot = plot)}
>
	<h2
		class="text-sm font-thin text-secondary-900 dark:text-secondary-50 md:text-base landscape:text-sm landscape:lg:text-base"
	>
		<slot name="title" />
	</h2>
	<p class="text-lg font-semibold text-accent-500 landscape:text-sm landscape:lg:text-2xl">
		<slot name="value" />
	</p>
</Card>
<Popover placement="right-start" class="border-none bg-secondary-200 dark:bg-secondary-700">
	<h2 class="md:text-md text-sm font-thin text-secondary-900 dark:text-secondary-50">
		<slot name="popover_title" />
	</h2>
	<p class="text-secondary-900 dark:text-secondary-50">
		<slot name="popover_value" />
	</p>
</Popover>
