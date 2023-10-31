<script lang="ts">
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import { session, sessionBreak, milliseconds, sessionInterruptions } from './session/stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');
	const sessions: Writable<UserSession[]> = getContext('sessions');

	let alarm: HTMLAudioElement;
	let warning: HTMLAudioElement;

	onMount(() => {
		if ($sessions[0].end === null) {
			session.start($sessions[0].id, Date.parse($sessions[0].start));
		}
		const interval = setInterval(() => {
			if ($session.running && !$session.pause) {
				$milliseconds = Date.now() - $session.start - $sessionInterruptions.duration;
			} else if ($sessionBreak.running) {
				if ($milliseconds > 1000) {
					$milliseconds = $sessionBreak.duration - (Date.now() - $session.end);
				} else if (!$sessionBreak.alarmPlayed) {
					alarm.play();
					sessionBreak.alarm();
					$milliseconds = 0;
				}
			}
			if (
				$milliseconds >= $settings.warning * 60000 &&
				$session.running &&
				!$session.warning &&
				!$session.dismiss
			) {
				warning.play();
				session.warning();
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock($milliseconds);

	$: isSession = $page.url.pathname === '/app/session';
</script>

<div
	class="pointer-events-none fixed flex w-screen items-center justify-center divide-x {$session.running
		? 'divide-primary-50'
		: 'divide-primary-600'} text-center transition-all delay-500 duration-500 md:text-xl lg:text-2xl landscape:left-8 landscape:md:left-12"
	style:scale={isSession ? 3 : 1}
	style:top={isSession ? '35%' : '3%'}
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

<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={alarm} />
<audio src="https://cdn.freesound.org/previews/442/442943_71257-lq.mp3" bind:this={warning} />
