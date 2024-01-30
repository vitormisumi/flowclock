<script lang="ts">
	import { sessionInterruptions, session, sessionBreak, sessionFocus } from './stores';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import { windowWidth } from '../stores';
	import Button from '$lib/components/Button.svelte';
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
		formData.append('project_id', String($sessionFocus.projectId));
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
			buttonStyle={$sessionBreak.running && !$sessionBreak.alarmPlayed ? 'regular' : 'accent'}
			class="text-3xl w-full duration-1000"
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
			type="submit"
			class="text-3xl w-full duration-1000"
			disabled={loading}
		>
			<i class="fa-solid fa-stop pr-4" />Break
		</Button>
	</form>
{/if}
