<script lang="ts">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import { session } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';

	const settings: Writable<Settings> = getContext('settings');

	let stopwatch: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session.running) {
				stopwatch = Date.now() - Date.parse($session.start);
			} else {
				stopwatch = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock(stopwatch);
	$: minutes = Math.floor(stopwatch / 60000 / $settings.ratio);
</script>

<div class="grid justify-items-center text-secondary-50 drop-shadow-xl shadow-orange-500">
	{#key stopwatch}
		<p class="text-6xl md:text-9xl font-mono tracking-tighter">
			{clock}
		</p>
	{/key}
	<p class="text-sm md:text-md text-secondary-100">
		You have earned {minutes}
		{minutes > 1 ? 'minutes' : 'minute'} of break
	</p>
</div>
