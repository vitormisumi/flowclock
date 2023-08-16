<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { session, sessionBreak } from './stores';
	import { enhance } from '$app/forms';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	function startSession() {
		session.start();
		sessionBreak.stop();
	}
</script>

{#if !$session.running}
	<Button
		class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 w-48 md:text-2xl md:w-72 h-12 md:h-16"
		on:click={startSession}><i class="fa-solid fa-play pr-4" />Start new session</Button
	>
{:else}
	<form
		method="POST"
		use:enhance={({ formData }) => {
			session.end();
			sessionBreak.start((Date.parse($session.end) - Date.parse($session.start)) / $settings.ratio);
			formData.append('session_start', $session.start);
			formData.append('session_end', $session.end);
		}}
	>
		<Button
			class="bg-secondary-50 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 w-48 md:text-2xl md:w-72 h-12 md:h-16"
			type="submit"><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	</form>
{/if}
