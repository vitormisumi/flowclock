<script lang="ts">
	import { Button, Modal, Select } from 'flowbite-svelte';
	import { session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { sessionInterruptions } from './stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

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
		open = true;
		const start = Date.now();
		session.pause();
		sessionInterruptions.start(start);
		formData.append('session_id', String($session.id));
		formData.append('start', new Date(start).toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleEnd: SubmitFunction = ({ formData }) => {
		loading = true;
		open = false;
		const end = Date.now();
		session.unpause();
		sessionInterruptions.end(end);
		formData.append('id', String($sessionInterruptions.currentId));
		formData.append('session_id', String($session.id));
		formData.append('end', new Date(end).toISOString());
		formData.append('reason', reason);
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	async function subscribeToRealtime() {
		const realtime = $page.data.supabase
			.channel('interruptions-channel')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'interruptions',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					sessionInterruptions.id(payload.new.id);
				}
			)
			.subscribe();

		if (realtime.error) {
			console.error('Realtime error:', realtime.error);
		}

		return () => {
			$page.data.supabase.removeChannel(realtime);
		};
	}

	onMount(() => {
		subscribeToRealtime();
	});
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
		<Button size="sm" type="submit" disabled={loading}
			><i class="fa-solid fa-play pr-2" />Resume</Button
		>
	</form>
</Modal>
