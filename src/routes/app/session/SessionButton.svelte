<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {
		endSession,
		session,
		sessionBreak,
		sessionFocus,
		sessionInterruptions,
		startSession
	} from './stores';

	export let settings: Settings;

	let loading = false;

	const handleStart: SubmitFunction = ({ formData }) => {
		loading = true;
		const start = Date.now();
		startSession('', start, true);
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
		formData.append('id', String($session.id));
		formData.append('end', new Date(end).toISOString());
		endSession(
			end,
			Math.round((end - $session.start - $sessionInterruptions.duration) / settings.ratio)
		);
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
			class="flex w-full items-center gap-2 text-2xl duration-1000"
			type="submit"
			disabled={loading}
		>
			<iconify-icon icon="ion:play" />Start
		</Button>
	</form>
{:else}
	<form method="POST" action="?/break" use:enhance={handleBreak}>
		<Button
			size="xl"
			type="submit"
			class="flex w-full items-center gap-2 text-2xl duration-1000"
			disabled={loading || !$session.id}
		>
			<iconify-icon icon="ion:stop" />Break
		</Button>
	</form>
{/if}
