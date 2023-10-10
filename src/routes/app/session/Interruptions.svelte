<script lang="ts">
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { interruptions, session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';

	let open = false;

	let reason: string;
	let reasons = [
		{ value: 'bathroom', name: 'bathroom' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'door bell', name: 'door bell' },
		{ value: 'message', name: 'message' },
		{ value: 'pet', name: 'pet' },
		{ value: 'phone', name: 'phone' },
		{ value: 'relative', name: 'relative' }
	];

	function startInterruption() {
		interruptions.start();
		session.pause();
		open = true;
	}

	function endInterruption() {
		interruptions.end(reason);
		session.unpause();
		open = false;
	}
</script>

<div style:visibility={$session.running && !open ? 'visible' : 'hidden'}>
	<Button on:click={startInterruption}><i class="fa-solid fa-pause pr-3" />Interruption</Button>
</div>
<Modal
	bind:open
	dismissable={false}
	size="sm"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-pause text-3xl text-secondary-300" />
	<p>{millisecondsToClock($milliseconds)}</p>
	<p class="text-secondary-200">
		Select the reason for the interruption and resume your session once you are ready.
	</p>
	<Select
		underline
		items={reasons}
		bind:value={reason}
		placeholder="Select a reason"
		class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
	/>
	<Button size="sm" on:click={endInterruption}><i class="fa-solid fa-play pr-2" />Resume</Button>
</Modal>
