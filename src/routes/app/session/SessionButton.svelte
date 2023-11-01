<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { sessionInterruptions, session, sessionBreak, sessionFocus } from './stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
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
		formData.append('focus_type', String($sessionFocus.type));
		formData.append('focus_id', String($sessionFocus.id));
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
</script>

{#if !$session.running}
	<form method="POST" action="?/start" use:enhance={handleStart}>
		<Button
			size="xl"
			class={$sessionBreak.running && !$sessionBreak.alarmPlayed
				? 'w-full bg-primary-900 p-2 text-xl text-primary-600 transition-colors hover:bg-primary-800 hover:ring hover:ring-primary-700 focus:ring-primary-700 md:p-4 md:text-2xl'
				: 'w-full bg-accent-500 p-2 text-xl transition-colors duration-1000 hover:bg-accent-600 focus:ring-accent-300 md:p-4 md:text-2xl'}
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
			class="w-full bg-secondary-50 text-xl text-secondary-900 transition-colors hover:bg-secondary-300 focus:ring-secondary-200 md:text-2xl"
			type="submit"
			disabled={loading}
		>
			<i class="fa-solid fa-stop pr-4" />Break
		</Button>
	</form>
{/if}
