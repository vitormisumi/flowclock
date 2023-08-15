<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { sessionEnd, sessionStart, breakDuration, breakTimer, alarmPlayed } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	let audio: HTMLAudioElement;

	onMount(() => {
		$breakDuration = (Date.parse($sessionEnd) - Date.parse($sessionStart)) / $settings.ratio;
		if (!$alarmPlayed) {
			setTimeout(() => {
				audio.play();
				$alarmPlayed = true;
			}, $breakDuration);
		}

		const interval = setInterval(() => {
			$breakTimer = $breakDuration - (Date.now() - Date.parse($sessionEnd));
			if ($breakTimer < 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutesLeft = Math.floor($breakTimer / 60000);
</script>

{#if $breakTimer > 0}
	<div>
		<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl p-4">
			Enjoy your break!
		</h1>
		{#if minutesLeft === 1}
			<p class="text-center text-secondary-50">You have 1 minute left</p>
		{:else if minutesLeft === 0}
			<p class="text-center text-secondary-50">You have less than a minute left</p>
		{:else}
			<p class="text-center text-secondary-50">You have {minutesLeft} minutes left</p>
		{/if}
	</div>
{:else}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl md:px-40">
		Time for your next session!
	</h1>
{/if}
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio} />
