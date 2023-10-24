<script lang="ts">
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Writable } from 'svelte/store';

	const sessions: Writable<UserSession[]> = getContext('sessions');
	const interruptions: Writable<Interruption[]> = getContext('interruptions');

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

	let loading = false;

	const handleStart: SubmitFunction = ({ formData }) => {
		loading = true;
		session.pause();
		open = true;
		formData.append('session_id', String($sessions[0].id));
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
	
	const handleEnd: SubmitFunction = ({ formData }) => {
		loading = true;
		session.unpause();
		open = false;
		formData.append('id', String($interruptions[0].id));
		formData.append('session_id', String($sessions[0].id));
		formData.append('end', new Date().toISOString());
		formData.append('reason', reason);
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div style:visibility={$session.running && !open ? 'visible' : 'hidden'}>
	<form method="POST" action="?/startInterruption" use:enhance={handleStart}>
		<Button type="submit">
			<i class="fa-solid fa-pause pr-3" />Interruption
		</Button>
	</form>
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
	<form method="POST" action="?/endInterruption" use:enhance={handleEnd}>
		<Select
			underline
			items={reasons}
			bind:value={reason}
			placeholder="Select a reason"
			class="border-secondary-300 text-primary-50 focus:border-secondary-100 dark:border-secondary-700"
		/>
		<Button size="sm" type="submit" disabled={loading}><i class="fa-solid fa-play pr-2" />Resume</Button>
	</form>
</Modal>
