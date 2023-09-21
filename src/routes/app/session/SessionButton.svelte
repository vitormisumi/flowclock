<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { distractionLength, session, sessionBreak, distractions } from './stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	function startSession() {
		sessionBreak.end();
		session.start();
	}

	$: buttonClass =
		$sessionBreak.running && !$sessionBreak.alarmPlayed
			? 'border-2 border-primary-600 bg-transparent hover:bg-primary-800 focus:ring-primary-700 md:text-2xl text-primary-600'
			: 'bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 md:text-2xl transition-colors duration-1000';
</script>

{#if !$session.running}
	<Button size="xl" class={buttonClass} on:click={startSession}
		><i class="fa-solid fa-play pr-4" />Start</Button
	>
{:else}
	<form
		method="POST"
		use:enhance={({ formData }) => {
			session.end();
			sessionBreak.start(($session.end - $session.start - $distractionLength) / $settings.ratio);
			formData.append('session_start', new Date($session.start).toISOString());
			formData.append('session_end', new Date($session.end).toISOString());
			formData.append('distractions', JSON.stringify($distractions));
		}}
	>
		<Button
			size="xl"
			class="bg-secondary-50 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-200 text-xl md:text-2xl"
			type="submit"><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	</form>
{/if}
