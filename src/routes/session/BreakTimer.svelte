<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionEnd, sessionStart, breakTimer } from './stores';
	import { ratio } from '../settings/stores';

	onMount(() => {
		const interval = setInterval(() => {
			$breakTimer = ($sessionEnd - $sessionStart) / $ratio - (Date.now() - $sessionEnd);
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
