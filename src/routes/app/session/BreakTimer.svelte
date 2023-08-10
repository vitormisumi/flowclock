<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import type { Session } from './types';

	const settings: Writable<Settings> = getContext('settings')
	const lastSession: Writable<Session> = getContext('lastSession')

	let breakTimer: number = 1;
	onMount(() => {
		const interval = setInterval(() => {
			breakTimer = (Date.parse($lastSession.finished_at) - Date.parse($lastSession.started_at)) / $settings.ratio - (Date.now() - Date.parse($lastSession.finished_at));
			if (breakTimer < 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutes = Math.floor(breakTimer / 60000);
</script>

{#if breakTimer > 0}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl">Enjoy your break!</h1>
	<p class="text-center text-secondary-50">
		You have {minutes} {minutes === 1 ? 'minute' : 'minutes'} left
	</p>
{:else}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl md:px-40">
		Time for your next session!
	</h1>
{/if}
