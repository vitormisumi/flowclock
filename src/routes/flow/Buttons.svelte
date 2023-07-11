<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { session, sessionBreak, sessionStart, sessionEnd, distraction } from './stores';

	function startSession() {
		$session = true;
		$sessionStart = Date.now();
	}

	function stopSession() {
		$session = false;
		$sessionStart = 0;
		$sessionBreak = true;
		$sessionEnd = Date.now();
	}
</script>

<div class="grid justify-items-center gap-4">
	{#if $session}
		<Button
			class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 text-3xl shadow-lg w-48 h-16"
			on:click={stopSession}><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	{:else}
		<Button
			class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 text-3xl shadow-lg w-48 h-16"
			on:click={startSession}><i class="fa-solid fa-play pr-4" />Start</Button
		>
	{/if}
	{#if $distraction}
		<Button
			class="bg-secondary-100 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 shadow-md"
			on:click={() => ($distraction = !$distraction)}
			><i class="fa-solid fa-pause pr-2" />Distraction</Button
		>
	{:else}
		<Button
			class="bg-secondary-100 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 shadow-md"
			on:click={() => ($distraction = !$distraction)}
			><i class="fa-solid fa-play pr-2" />Resume</Button
		>
	{/if}
</div>
