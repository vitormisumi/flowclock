<script lang="ts">
	import { onMount } from 'svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { session } from './session/stores';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

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
		class="text-secondary-50 fixed transition-all duration-500 delay-500 rounded-lg p-2 pointer-events-none flex items-center justify-center divide-x w-[10%] text-center"
		style:scale={isSession ? 3 : 1}
		style:bottom={isSession ? '50%' : '5%'}
		style:right={isSession ? '45%' : '5%'}
	>
		{#if !isSession}
			<i
				class="fa-solid fa-clock text-center px-2"
				in:slide={{ axis: 'x', duration: 500 }}
				out:slide={{ axis: 'x', duration: 500 }}
			/>
		{/if}
		<p class="font-mono tracking-tight px-2">
			{clock}
		</p>
	</div>
{/if}
