<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import {
		session,
		sessionBreak,
		sessionStart,
		sessionEnd,
		distractionStart,
		distractionEnd
	} from './stores';
	import { ratio } from '../settings/stores';

	let audio: HTMLAudioElement;

	function startSession() {
		$session = true;
		$sessionStart = Date.now();
		$sessionBreak = false;
		$distractionStart = 0;
		$distractionEnd = 0;
	}

	function startBreak() {
		$session = false;
		$sessionBreak = true;
		$sessionEnd = Date.now();
		setTimeout(() => {
			audio.play()
		},($sessionEnd - $sessionStart) / $ratio)
	}
</script>

{#if $session}
	<Button
		class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 text-2xl w-72 h-16"
		on:click={startBreak}><i class="fa-solid fa-stop pr-4" />Break</Button
	>
{:else}
	<Button
		class="bg-secondary-50 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 text-2xl w-72 h-16"
		on:click={startSession}><i class="fa-solid fa-play pr-4" />Start new session</Button
	>
{/if}
<audio src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3" bind:this={audio}></audio>
