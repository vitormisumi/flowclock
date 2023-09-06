<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { distraction, distractionStart, distractionEnd, session } from './stores';

	function startDistraction() {
		$distraction = true;
		$distractionStart = Date.now();
	}

	function stopDistraction() {
		$distraction = false;
		$distractionEnd = Date.now();
	}
</script>

<div style:visibility={$session.running ? 'visible' : 'hidden'}>
	{#if $distraction}
		<Button
			class="bg-secondary-100 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900"
			on:click={stopDistraction}><i class="fa-solid fa-play pr-2" />Resume</Button
		>
	{:else}
		<Button
			class="bg-secondary-100 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900"
			on:click={startDistraction}><i class="fa-solid fa-pause pr-2" />Distraction</Button
		>
	{/if}
</div>
