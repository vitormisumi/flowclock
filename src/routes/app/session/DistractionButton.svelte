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
	<Button
		size="sm"
		class="bg-secondary-100 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-50"
		on:click={$distraction ? stopDistraction : startDistraction}
		><i class={$distraction ? 'fa-solid fa-play pr-2' : 'fa-solid fa-pause pr-2'} />Resume</Button
	>
</div>
