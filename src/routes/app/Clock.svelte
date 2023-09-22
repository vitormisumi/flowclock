<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Settings } from './settings/types';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import {
		session,
		sessionBreak,
		distractionLength,
		milliseconds,
		distractions
	} from './session/stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	const settings: Writable<Settings> = getContext('settings');

	let alarm: HTMLAudioElement;
	let warning: HTMLAudioElement;

	onMount(() => {
		const interval = setInterval(() => {
			if ($session.running && !$session.pause) {
				$milliseconds = Date.now() - $session.start - $distractionLength;
			} else if ($sessionBreak.running) {
				if ($milliseconds > 1000) {
					$milliseconds = $sessionBreak.duration - (Date.now() - $session.end);
				} else if (!$sessionBreak.alarmPlayed) {
					alarm.play();
					sessionBreak.alarm();
					distractions.reset();
					$milliseconds = 0;
				}
			}

			if ($milliseconds >= $settings.warning * 60000 && $session.running && !$session.warning) {
				warning.play();
				session.warning();
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock($milliseconds);

	$: isSession = $page.url.pathname === '/app/session';
</script>

{#if $milliseconds > 0}
	<div
		class="pointer-events-none fixed flex w-screen items-center justify-center divide-x text-center transition-all delay-500 duration-500 md:text-xl lg:text-2xl landscape:left-6 landscape:lg:left-12"
		style:scale={isSession ? 3 : 1}
		style:top={isSession ? '30%' : '3%'}
		style:color={$session.running ? '#ebf7fa' : '#257b8d'}
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
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={alarm} />
<audio src="https://cdn.freesound.org/previews/442/442943_71257-lq.mp3" bind:this={warning} />
