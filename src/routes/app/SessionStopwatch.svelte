<script lang="ts">
	import { onMount } from 'svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { session } from './session/stores';
	import { page } from '$app/stores';

	let stopwatch: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session.running) {
				stopwatch = Date.now() - $session.start;
			} else {
				stopwatch = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock(stopwatch);

	$: isSession = $page.url.pathname === '/app/session';
</script>

{#if $session.running}
	<div
		class="text-secondary-50 fixed transition-all duration-1000 rounded-lg p-2 pointer-events-none translate-x-1/2"
		style:background={isSession ? 'transparent' : '#1b5865'}
		style:font-size={isSession ? '5rem' : '1rem'}
		style:top={isSession ? '30%' : '90%'}
		style:right={isSession ? '50%' : '5%'}
	>
		<p class="font-mono tracking-tight">
			{clock}
		</p>
	</div>
{/if}
