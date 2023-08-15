<script lang="ts">
	import { Button, Toast } from 'flowbite-svelte';
	import { session, sessionBreak, sessionEnd, sessionStart } from './stores';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;

	function startSession() {
		$session = true;
		$sessionBreak = false;
		$sessionStart = new Date().toISOString();
	}

	let show = true;
	let counter = 5;

	function timeout(): any {
		if (--counter > 0) return setTimeout(timeout, 1000);
		show = false;
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
			show = true;
			counter = 5;
			timeout();
		}}
	>
		<Button
			class="bg-secondary-50 hover:bg-secondary-300 focus:ring-secondary-50 text-secondary-900 w-48 md:text-2xl md:w-72 h-12 md:h-16"
			type="submit"><i class="fa-solid fa-stop pr-4" />Break</Button
		>
	</form>
{/if}
{#if form}
	{#if form?.success}
		<Toast color="green" transition={fly} position="bottom-right" bind:open={show}>
			<i class="fa-solid fa-check" slot="icon" />
			{form?.message}
		</Toast>
	{:else}
		<Toast color="red" transition={fly} position="bottom-right" bind:open={show}>
			<i class="fa-solid fa-x" slot="icon" />
			{form?.message}
		</Toast>
	{/if}
{/if}
