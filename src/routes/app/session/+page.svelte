<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { session, sessionBreak, sessionFocus } from './stores';
	import Message from './Message.svelte';
	import SessionButton from './SessionButton.svelte';
	import Interruptions from './Interruptions.svelte';
	import Notification from '../../Notification.svelte';
	import FocusSelect from './FocusSelect.svelte';

	export let form;

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
						session.start(payload.new.id, Date.parse(payload.new.start));
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
						session.end(Date.parse(payload.new.end));
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

<div
	class="grid h-full w-full content-end justify-items-center text-center font-light text-secondary-100 md:text-xl lg:text-2xl"
>
	<div class="grid w-full max-w-xs gap-1 md:gap-4 lg:gap-8 portrait:gap-2">
		<Message />
		<FocusSelect />
		<SessionButton />
		<Interruptions />
	</div>
</div>
{#if form}
	<Notification message={form?.message} success={form?.success} />
{/if}
