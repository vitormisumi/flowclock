<script lang="ts">
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { distractions, session, distractionLength } from './stores';

	let running: boolean = false;

	let reason: string;
	let reasons = [
		{ value: 'phone', name: 'phone' },
		{ value: 'colleague', name: 'colleague' },
	];

	function startDistraction() {
		distractions.start();
		running = true;
	}

	function endDistraction() {
		distractions.end(reason);
		running = false;
	}
</script>

<div style:visibility={$session.running ? 'visible' : 'hidden'}>
	{#if !running}
		<Button size="sm" on:click={startDistraction}
			><i class="fa-solid fa-pause pr-4" />Distraction</Button
		>
	{:else}
		<Modal bind:open={running} class="bg-secondary-900" size="sm">
			<p>
				Your session is paused. Select the reason for the distraction and resume your session once
				you are ready.
			</p>
			<Select items={reasons} bind:value={reason} placeholder="Select a reason" />
			<Button size="sm" on:click={endDistraction}><i class="fa-solid fa-play pr-4" />Resume</Button>
		</Modal>
	{/if}
</div>
