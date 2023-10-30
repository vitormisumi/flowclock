<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { sessionInterruptions, session, sessionBreak } from './stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';

	const settings: Writable<Settings> = getContext('settings');

	let loading = false;

	const handleStart: SubmitFunction = ({ formData }) => {
		loading = true;
		const start = Date.now();
		sessionBreak.end();
		session.start(0, start);
		formData.append('start', new Date(start).toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleBreak: SubmitFunction = ({ formData }) => {
		loading = true;
		const end = Date.now();
		session.end(end);
		sessionBreak.start(
			Math.round((end - $session.start - $sessionInterruptions.duration) / $settings.ratio)
		);
		sessionInterruptions.reset();
		formData.append('id', String($session.id));
		formData.append('end', new Date(end).toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	$page.data.supabase
		.channel('sessions-channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, (payload: any) => {
			if (payload.eventType === 'INSERT' && payload.new && !payload.new.end) {
				session.start(payload.new.id, Date.parse(payload.new.start));
			} else if (
				payload.eventType === 'UPDATE' &&
				payload.new.end &&
				payload.new.id === $session.id
			) {
				session.end(Date.parse(payload.new.end));
			} else if (payload.eventType === 'UPDATE' && payload.new.id === $session.id) {
				sessionInterruptions.update(payload.new.interruption_duration);
			}
		})
		.subscribe();

	$page.data.supabase
		.channel('breaks-channel')
		.on('postgres_changes', { event: '*', schema: 'public', table: 'breaks' }, (payload: any) => {
			if (payload.eventType === 'INSERT') {
				sessionBreak.start(payload.new.calculated_duration);
			}
		})
		.subscribe();
</script>

{#if !$session.running}
	<form method="POST" action="?/start" use:enhance={handleStart}>
		<Button
			size="xl"
			class={$sessionBreak.running && !$sessionBreak.alarmPlayed
				? 'bg-primary-900 text-xl text-primary-600 hover:bg-primary-800 hover:ring hover:ring-primary-700 focus:ring-primary-700 md:text-2xl'
				: 'bg-accent-500 text-xl transition-colors duration-1000 hover:bg-accent-600 focus:ring-accent-300 md:text-2xl'}
			type="submit"
			disabled={loading}
		>
			<i class="fa-solid fa-play pr-4" />Start
		</Button>
	</form>
{:else}
	<form method="POST" action="?/break" use:enhance={handleBreak}>
		<Button
			size="xl"
			class="bg-secondary-50 text-xl text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-200 md:text-2xl"
			type="submit"
			disabled={loading}
		>
			<i class="fa-solid fa-stop pr-4" />Break
		</Button>
	</form>
{/if}
