<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionBreak } from './session/stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	let clock: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session.running) {
				clock = Date.now() - $session.start;
			} else if ($sessionBreak.running && clock > 0) {
				clock = $sessionBreak.duration - (Date.now() - $session.end);
			} else {
				clock = 0;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clockDisplay = millisecondsToClock(clock);

	$: isSession = $page.url.pathname === '/app/session';
</script>

{#if clock > 0}
	<div
		class="text-secondary-50 fixed transition-all duration-500 delay-500 divide-x pointer-events-none flex items-center justify-center text-center md:text-xl lg:text-2xl w-screen lg:left-12"
		style:scale={isSession ? 3 : 1}
		style:top={isSession ? '40%' : '3%'}
	>
		{#if !isSession}
			<i
				class="fa-solid fa-clock text-center px-2"
				in:slide={{ axis: 'x', duration: 500 }}
				out:slide={{ axis: 'x', duration: 500 }}
			/>
		{/if}
		<p class="font-mono tracking-tight px-2">
			{clockDisplay}
		</p>
	</div>
{/if}
