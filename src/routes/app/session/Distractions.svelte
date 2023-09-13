<script lang="ts">
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { distractions, session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';

	let open: boolean = false;

	let reason: string;
	let reasons = [
		{ value: 'phone', name: 'phone' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'message', name: 'colleague' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'colleague', name: 'colleague' }
	];

	function startDistraction() {
		distractions.start();
		session.pause();
		open = true;
	}

	function endDistraction() {
		distractions.end(reason);
		session.unpause();
		open = false;
	}
</script>

<div style:visibility={$session.running && !open ? 'visible' : 'hidden'}>
	<Button size="sm" on:click={startDistraction}
		><i class="fa-solid fa-pause pr-4" />Distraction</Button
	>
</div>
<Modal
	bind:open
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
	size="sm"
	dismissable={false}
>
	<p class="font-semibold text-accent-500">Your session is paused.</p>
	<p>{millisecondsToClock($milliseconds)}</p>
	<p class="text-secondary-100">
		Select the reason for the distraction and resume your session once you are ready.
	</p>
	<Select items={reasons} bind:value={reason} placeholder="Select a reason" />
	<Button size="sm" on:click={endDistraction}><i class="fa-solid fa-play pr-4" />Resume</Button>
</Modal>
