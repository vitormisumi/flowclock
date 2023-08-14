<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { session, sessionBreak, sessionEnd, sessionStart } from './stores';
	import { enhance } from '$app/forms';

	function startSession() {
		$session = true;
		$sessionBreak = false;
		$sessionStart = new Date().toISOString();
	}
</script>

{#if !$session}
	<Button
		class="bg-accent-500 hover:bg-accent-600 focus:ring-accent-300 w-48 md:text-2xl md:w-72 h-12 md:h-16"
		on:click={startSession}><i class="fa-solid fa-play pr-4" />Start new session</Button
	>
{:else}
	<form
		method="POST"
		use:enhance={({ formData }) => {
			$session = false;
			$sessionBreak = true;
			$sessionEnd = new Date().toISOString();
			formData.append('session_start', $sessionStart);
			formData.append('session_end', $sessionEnd);
		}}
	>
		<Button
			class="bg-secondary-50 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 w-48 md:text-2xl md:w-72 h-12 md:h-16"
			type="submit"><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	</form>
{/if}
