<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { interruptionLength, session, sessionBreak } from './stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';

	const settings: Writable<Settings> = getContext('settings');
	const sessions: Writable<UserSession[]> = getContext('sessions');

	let loading = false;

	const handleStart: SubmitFunction = ({ formData }) => {
		loading = true;
		sessionBreak.end();
		session.start();
		formData.append('start', new Date().toISOString());
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleBreak: SubmitFunction = ({ formData }) => {
		loading = true;
		session.end();
		const duration = Math.round((Date.now() - $session.start - $interruptionLength) / $settings.ratio);
		sessionBreak.start(duration);
		formData.append('id', String($sessions[0].id));
		formData.append('end', new Date().toISOString());
		formData.append('length', String(duration));
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
