<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { sessionEnd, sessionStart } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	let audio: HTMLAudioElement;

	let breakTimer: number = 1;
	let breakDuration: number = 0;

	onMount(() => {
		breakDuration = (Date.parse($sessionEnd) - Date.parse($sessionStart)) / $settings.ratio;
		const interval = setInterval(() => {
			breakTimer = breakDuration - (Date.now() - Date.parse($sessionEnd));
			if (breakTimer < 0) {
				clearInterval(interval);
				audio.play();
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutes = Math.floor(breakTimer / 60000);
</script>

{#if breakTimer > 0}
	<div>
		<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl">Enjoy your break!</h1>
		<p class="text-center text-secondary-50">
			You have {minutes}
			{minutes === 1 ? 'minute' : 'minutes'} left
		</p>
	</div>
{:else}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl md:px-40">
		Time for your next session!
	</h1>
{/if}
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio} />
