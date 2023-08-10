<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { session, sessionBreak } from './stores';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import type { Session } from './types';

	const settings: Writable<Settings> = getContext('settings');
	const lastSession: Writable<Session> = getContext('lastSession');

	let audio: HTMLAudioElement;

	function startSession() {
		$session = true;
		$sessionBreak = false;
	}

	function endSession() {
		$session = false;
		$sessionBreak = true;
		setTimeout(() => {
			audio.play();
		}, (Date.now() - Date.parse($lastSession.started_at)) / $settings.ratio);
	}
</script>

{#if !$session}
	<form method="POST" action="?/start" use:enhance={startSession}>
		<Button
			class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 w-48 md:text-2xl md:w-72 h-12 md:h-16"
			type="submit"><i class="fa-solid fa-play pr-4" />Start new session</Button
		>
	</form>
{:else}
	<form method="POST" action="?/end" use:enhance={endSession}>
		<Button
			class="bg-secondary-50 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 w-48 md:text-2xl md:w-72 h-12 md:h-16"
			type="submit"><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	</form>
{/if}
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio} />
