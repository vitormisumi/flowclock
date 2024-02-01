<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import { session, milliseconds, startInterruption, endInterruption } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { sessionInterruptions } from './stores';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

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

	let loading = false;

	const handleStart: SubmitFunction = ({ formData }) => {
		loading = true;
		const start = Date.now();
		startInterruption(start);
		formData.append('session_id', String($session.id));
		formData.append('start', new Date(start).toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleEnd: SubmitFunction = ({ formData }) => {
		loading = true;
		const end = Date.now();
		endInterruption(end);
		formData.append('id', String($sessionInterruptions.currentId));
		formData.append('session_id', String($session.id));
		formData.append('end', new Date(end).toISOString());
		formData.append('reason', reason);
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class={$session.running && $session.id ? 'visible' : 'invisible'}>
	<form method="POST" action="?/startInterruption" use:enhance={handleStart}>
		<Button size={$windowWidth < 768 ? 'xs' : 'md'} type="submit" class="w-full">
			<i class="fa-solid fa-pause pr-3" />Interruption
		</Button>
	</form>
</div>
<Modal bind:open={$session.pause} dismissable={false} size="sm">
	<i class="fa-solid fa-pause text-3xl dark:text-secondary-300" />
	<p>{millisecondsToClock($milliseconds)}</p>
	<p class="dark:text-secondary-200">
		Select the reason for the interruption and resume your session once you are ready.
	</p>
	<form method="POST" action="?/endInterruption" use:enhance={handleEnd}>
		<Select
			underline
			items={reasons}
			bind:value={reason}
			placeholder="Select a reason"
			class="text-primary-900 dark:border-secondary-300 dark:dark:border-secondary-700 dark:text-primary-50 focus:dark:border-secondary-100"
		/>
		<Button size={$windowWidth < 768 ? 'xs' : 'md'} type="submit" class="w-full" disabled={loading}>
			<i class="fa-solid fa-play pr-2" />Resume
		</Button>
	</form>
</Modal>
