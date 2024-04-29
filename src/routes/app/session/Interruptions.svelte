<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { millisecondsToClock } from '$lib/functions/functions';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Select } from 'flowbite-svelte';
	import { canHover } from '../stores';
	import {
		endInterruption,
		milliseconds,
		session,
		sessionInterruptions,
		startInterruption
	} from './stores';

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

	const handleStart: SubmitFunction = ({ formData }) => {
		const start = Date.now();
		startInterruption(0, start);
		formData.append('session_id', String($session.id));
		formData.append('start', new Date(start).toISOString());
		return async ({ update }) => {
			update();
		};
	};

	const handleEnd: SubmitFunction = ({ formData }) => {
		const end = Date.now();
		formData.append('id', String($sessionInterruptions.currentId));
		formData.append('end', new Date(end).toISOString());
		formData.append('reason', reason);
		endInterruption(end);
		return async ({ update }) => {
			update();
		};
	};
</script>

<form method="POST" action="?/startInterruption" use:enhance={handleStart}>
	<Button
		size={!$canHover ? 'xs' : 'md'}
		type="submit"
		class="w-full bg-secondary-200 dark:bg-secondary-700 flex items-center gap-3"
		buttonStyle="menu"
		disabled={!$session.id}
	>
		<iconify-icon icon="ion:pause" />Interruption
	</Button>
</form>
<Modal bind:open={$session.pause} dismissable={false} size="sm">
	<iconify-icon icon="ion:pause" class="text-3xl dark:text-secondary-300" />
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
		<Button
			size={!$canHover ? 'xs' : 'md'}
			type="submit"
			class="w-full flex items-center gap-2"
			disabled={!$sessionInterruptions.currentId}
		>
			<iconify-icon icon="ion:play" />Resume
		</Button>
	</form>
</Modal>
