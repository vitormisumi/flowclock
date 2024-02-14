<script lang="ts">
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import Notification from '../../Notification.svelte';
	import SessionCard from './SessionCard.svelte';
	import TableCard from './TableCard.svelte';
	import {
		endInterruption,
		endSession,
		session,
		sessionBreak,
		sessionFocus,
		startInterruption,
		startSession
	} from './stores';

	const settings: Writable<Settings> = getContext('settings');

	export let form;

	$: if (form?.startData) {
		startSession(form.startData.id, Date.parse(form.startData.start), true);
	}

	$: if (form?.interruptionData) {
		startInterruption(form.interruptionData.id, Date.parse(form.interruptionData.start));
	}

	let isSubscribed: boolean;

	async function subscribeToRealtime() {
		const realtime = $page.data.supabase
			.channel('sessions-channel')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'sessions',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					if (!payload.new.end && payload.new.id !== $session.id) {
						startSession(payload.new.id, Date.parse(payload.new.start));
					}
					if (payload.new.task_id) {
						sessionFocus.set('task', payload.new.task_id, payload.new.project_id);
					} else if (payload.new.intention_id) {
						sessionFocus.set('intention', payload.new.intention_id, payload.new.project_id);
					}
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'sessions',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					if (payload.new.end && payload.new.id === $session.id) {
						const end = Date.parse(payload.new.end);
						endSession(
							end,
							Math.round(
								(end - Date.parse(payload.new.start) - payload.new.interruption_duration) /
									$settings.ratio
							)
						);
					}
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'breaks',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					sessionBreak.start(payload.new.calculated_duration);
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'interruptions',
					filter: 'user_id=eq.' + $page.data.session?.user.id
				},
				(payload: any) => {
					if (!$session.pause && !payload.new.end) {
						startInterruption(payload.new.id, Date.parse(payload.new.start));
					}
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
					if (payload.new.end && $session.pause) {
						endInterruption(Date.parse(payload.new.end));
					}
				}
			)
			.subscribe((x: string) => {
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

<div
	class="flex flex-col w-full items-center h-full text-center font-light dark:text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid w-full max-w-lg gap-1 md:gap-4 portrait:gap-2">
		<SessionCard />
		{#if !$session.running}
			<div transition:slide={{ delay: 500 }}>
				<TableCard />
			</div>
		{/if}
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
