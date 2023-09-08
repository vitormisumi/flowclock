<script lang="ts">
	import { onMount } from 'svelte';
	import { session, sessionBreak } from './session/stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	let milliseconds: number = 0;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session.running) {
				milliseconds = Date.now() - $session.start;
			} else if ($sessionBreak.running) {
				if (milliseconds > 0) {
					milliseconds = $sessionBreak.duration - (Date.now() - $session.end);
				} else if (!$sessionBreak.alarmPlayed) {
					audio.play();
					sessionBreak.alarm();
					milliseconds = 0;
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock(milliseconds);

	$: isSession = $page.url.pathname === '/app/session';

	let audio: HTMLAudioElement;
</script>

{#if milliseconds > 0}
	<div
		class="pointer-events-none fixed flex w-screen items-center justify-center divide-x text-center text-secondary-50 transition-all delay-500 duration-500 md:text-xl lg:left-12 lg:text-2xl landscape:left-12"
		style:scale={isSession ? 3 : 1}
		style:top={isSession ? '35%' : '3%'}
	>
		{#if !isSession}
			<i
				class={$session.running ? 'fa-solid fa-clock px-2' : 'fa-solid fa-mug-saucer px-2'}
				transition:slide={{ axis: 'x', duration: 500 }}
			/>
		{/if}
		<p class="px-2 font-mono tracking-tight">
			{clock}
		</p>
	</div>
{/if}
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio} />
