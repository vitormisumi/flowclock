<script lang="ts">
	import type { Settings } from '../settings/types';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { distractions, session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';

	const distractionData: Writable<Settings> = getContext('distractions');

	let open: boolean = false;

	let reason: string;
	let reasons = [
		{ value: 'phone', name: 'phone' },
		{ value: 'colleague', name: 'colleague' },
		{ value: 'message', name: 'message' },
		{ value: 'bathroom', name: 'bathroom' },
		{ value: 'pet', name: 'pet' },
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
	<Button on:click={startDistraction}><i class="fa-solid fa-pause pr-3" />Distraction</Button>
</div>
<Modal
	bind:open
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
	size="sm"
	dismissable={false}
>
	<i class="fa-solid fa-pause font-semibold text-accent-500" />
	<p>{millisecondsToClock($milliseconds)}</p>
	<p class="text-secondary-100">
		Select the reason for the distraction and resume your session once you are ready.
	</p>
	<Select
		underline
		items={reasons}
		bind:value={reason}
		placeholder="Select a reason"
		class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
	/>
	<Button size="sm" on:click={endDistraction}><i class="fa-solid fa-play pr-4" />Resume</Button>
</Modal>
