<script lang="ts">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import { session, sessionStart } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';

	const settings: Writable<Settings> = getContext('settings');

	let clock: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session) {
				clock = Date.now() - Date.parse($sessionStart);
			} else {
				clock = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: time = millisecondsToClock(clock);
	$: totalMinutes = Math.floor(clock / 60000);
</script>

<div class="grid justify-items-center text-white drop-shadow-xl shadow-orange-500">
	{#key clock}
		<p class="text-6xl md:text-9xl">
			{time}
		</p>
	{/key}
	<p class="text-sm md:text-md text-secondary-100">
		You have earned {Math.floor(totalMinutes / $settings.ratio)}
		{Math.floor(totalMinutes / $settings.ratio) > 1 ? 'minutes' : 'minute'} of break
	</p>
</div>
