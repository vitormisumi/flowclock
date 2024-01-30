<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import { session, milliseconds } from './stores';
	import { millisecondsToClock } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { sessionInterruptions } from './stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
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

	let isSubscribed: boolean;

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
					session.pause();
					sessionInterruptions.start(Date.parse(payload.new.start));
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'interruptions',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					if (payload.new.end) {
						session.unpause();
						sessionInterruptions.end(Date.parse(payload.new.end));
					}
				}
			)
			.subscribe((x: string) => {
				console.log(x);
				if (x === 'SUBSCRIBED') {
					isSubscribed = true;
				} else {
					isSubscribed = false;
				}
			});

		if (realtime.error) {
			console.error('Realtime error:', realtime.error);
		}

		return () => {
			$page.data.supabase.removeChannel(realtime);
			isSubscribed = false;
		};
	}

	onMount(() => {
		subscribeToRealtime();

		const interval = setInterval(() => {
			if (!isSubscribed) {
				subscribeToRealtime();
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class={$session.running && $session.id && !open ? 'visible' : 'invisible'}>
	<form method="POST" action="?/startInterruption" use:enhance={handleStart}>
		<Button size={$windowWidth < 768 ? 'xs' : 'md'} type="submit" class="w-full">
			<i class="fa-solid fa-pause pr-3" />Interruption
		</Button>
	</form>
</div>
<Modal bind:open dismissable={false} size="sm">
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
