<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { sessionEnd, sessionStart, breakTimer } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';

	const settings: Writable<Settings> = getContext('settings')

	onMount(() => {
		const interval = setInterval(() => {
			$breakTimer = ($sessionEnd - $sessionStart) / $settings.ratio - (Date.now() - $sessionEnd);
			if ($breakTimer < 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutes = Math.floor($breakTimer / 60000);
</script>

{#if $breakTimer > 0}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl">Enjoy your break!</h1>
	<p class="text-center text-secondary-50">
		You have {minutes} {minutes === 1 ? 'minute' : 'minutes'} left
	</p>
{:else}
	<h1 class="text-center text-3xl md:text-6xl text-white drop-shadow-xl md:px-40">
		Time for your next session!
	</h1>
{/if}
