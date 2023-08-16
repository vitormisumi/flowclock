<script lang="ts">
	import Duration from './Duration.svelte';
	import Sessions from './Sessions.svelte';
	import { session } from '../session/stores';
	import { onMount } from 'svelte';
	import { millisecondsToClock } from '$lib/functions/functions';

	let stopwatch: number = 0;

	onMount(() => {
		let start = Date.parse($session.start);
		const interval = setInterval(() => {
			if ($session.running) {
				stopwatch = Date.now() - start;
			} else {
				stopwatch = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock(stopwatch);
</script>

<div
	class="h-screen grid p-4 sm:p-6 md:p-8 lg:p-12 lg:ml-24 content-evenly mb-20 sm:mb-24 lg:mb-0 bg-primary-900 overflow-scroll"
>
	<Sessions />
	<Duration />
</div>

{#if $session.running}
	<div class="fixed bottom-0 right-0 flex divide-x text-white">
		<i class="fa-solid fa-clock px-4" />
		<p class="text-xl md:text-2xl font-mono tracking-tight px-4">
			{clock}
		</p>
	</div>
{/if}
