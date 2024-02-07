<script lang="ts">
	import { page } from '$app/stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import {
		endSession,
		milliseconds,
		session,
		sessionBreak,
		sessionFocus,
		sessionInterruptions,
		startSession
	} from './session/stores';

	const settings: Writable<Settings> = getContext('settings');
	const sessions: Writable<UserSession[]> = getContext('sessions');
	const breaks: Writable<Break[]> = getContext('breaks');

	let alarm: HTMLAudioElement;
	let warning: HTMLAudioElement;

	onMount(() => {
		if ($sessions[0].end === null) {
			startSession($sessions[0].id, Date.parse($sessions[0].start));
			sessionFocus.set(
				$sessions[0].task_id ? 'task' : $sessions[0].intention_id ? 'intention' : '',
				$sessions[0].task_id ?? $sessions[0].intention_id ?? 0,
				$sessions[0].project_id ?? 0
			);
		} else if (
			$sessions[0].id === $breaks[0].session_id &&
			Date.parse($breaks[0].start) + $breaks[0].calculated_duration > Date.now()
		) {
			endSession(Date.parse($sessions[0].end), $breaks[0].calculated_duration);
			$milliseconds = $sessionBreak.duration - (Date.now() - $session.end);
		}

		const interval = setInterval(() => {
			if ($session.running && !$session.pause) {
				$milliseconds = Date.now() - $session.start - $sessionInterruptions.duration;
				if ($milliseconds >= $settings.warning * 60000 && !$session.warning && !$session.dismiss) {
					warning.play();
					session.warning();
				}
			} else if ($sessionBreak.running) {
				if ($milliseconds > 1000) {
					$milliseconds = $sessionBreak.duration - (Date.now() - $session.end);
				} else if (!$sessionBreak.alarmPlayed) {
					alarm.play();
					sessionBreak.alarm();
					$milliseconds = 0;
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	$: clock = millisecondsToClock($milliseconds);

	$: isSession = $page.url.pathname === '/app/session';
</script>

<div
	class="pointer-events-none fixed flex w-screen items-center justify-center divide-x text-center transition-all delay-500 duration-500 md:text-xl lg:text-2xl landscape:left-8 landscape:md:left-12
	{$session.running
		? 'divide-primary-500 text-primary-500'
		: 'divide-secondary-500 text-secondary-500'} 
	{isSession
		? 'top-1/4 scale-[3] md:top-1/3 landscape:top-8 landscape:lg:top-1/3'
		: 'top-4 md:top-5 landscape:top-3 landscape:md:top-4 landscape:lg:top-5'}"
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
