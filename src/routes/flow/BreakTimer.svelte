<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionEnd, sessionStart } from './stores';
	import { ratio } from '../settings/stores';

	let breakTimer: number = 1;

	onMount(() => {
		const interval = setInterval(() => {
			breakTimer = ($sessionEnd - $sessionStart) / $ratio - (Date.now() - $sessionEnd);
            if (breakTimer < 0) {
                clearInterval(interval)
            }
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutes = Math.floor(breakTimer / 1000 / 60);
</script>

{#if breakTimer > 0}
	<h1 class="text-center text-6xl sm:text-8xl text-white drop-shadow-xl">Enjoy your break!</h1>
	<p class="text-center text-secondary-50">
		You still have {minutes} minutes left
	</p>
{:else}
	<h1 class="text-center text-6xl sm:text-8xl text-white px-40 drop-shadow-lg">
		Your break is over, time for your next session 💪
	</h1>
{/if}
