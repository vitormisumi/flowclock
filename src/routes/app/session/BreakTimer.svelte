<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionBreak } from './stores';

	let timer = $sessionBreak.duration - (Date.now() - $session.end);

	onMount(() => {
		const interval = setInterval(() => {
			timer = $sessionBreak.duration - (Date.now() - $session.end);
			if (timer < 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: minutesLeft = Math.floor(timer / 60000);
</script>

{#if timer > 0}
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

