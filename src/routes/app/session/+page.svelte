<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { page } from '$app/stores';
	import {
		endSession,
		session,
		sessionBreak,
		sessionFocus,
		sessionInterruptions,
		startSession,
		startInterruption,
		endInterruption
	} from './stores';
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Interruptions from './Interruptions.svelte';
	import Notification from '../../Notification.svelte';
	import FocusSelect from './FocusSelect.svelte';
	import type { Writable } from 'svelte/store';

	const settings: Writable<Settings> = getContext('settings');

	export let form;

	$: if (form?.startData) {
		startSession(form?.startData[0].id, Date.parse(form?.startData[0].start));
	} else if (form?.breakData && form.breakData[0].end) {
		const end = Date.parse(form?.breakData[0].end);
		endSession(
			end,
			Math.round((end - $session.start - $sessionInterruptions.duration) / $settings.ratio)
		);
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
					if (!payload.new.end) {
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
							Math.round((end - $session.start - $sessionInterruptions.duration) / $settings.ratio)
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
					startInterruption(Date.parse(payload.new.start));
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
	class="grid h-full w-full content-end justify-items-center text-center font-light dark:text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid w-full max-w-xs gap-1 md:gap-4 lg:gap-8 portrait:gap-2">
		<Message />
		{#if $session.running}
			<Interruptions />
		{:else}
			<FocusSelect />
		{/if}
		<SessionButton />
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
