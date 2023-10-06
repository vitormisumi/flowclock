<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import { timeFromTimestamp, dateFromTimestamp } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { filteredSessions } from './stores';
	import type { Session } from '../types';
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../types';
	import { getContext } from 'svelte';

	const settings: Writable<Settings> = getContext('settings');

	export let session: Session;

	let open: boolean = false;

	let sessionId: number | null;
	$: sessionToDelete = $filteredSessions.find(({ id }) => id === sessionId);
</script>

<Button
	size="xs"
	class="bg-transparent hover:bg-primary-700"
	on:click={() => {
		open = true;
		sessionId = session.id;
	}}><i class="fa-solid fa-trash" /></Button
>
<Modal
	bind:open
	outsideclose
	size="xs"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-warning text-3xl text-red-700" />
	<p class="text-secondary-200 whitespace-normal">
		Are you sure you want to delete your session at {dateFromTimestamp(sessionToDelete?.start, $settings.date_format, $settings.separator)} from
		{timeFromTimestamp(sessionToDelete?.start, $settings.clock_format)} to {timeFromTimestamp(sessionToDelete?.end, $settings.clock_format)}?
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteSession"
		use:enhance={({ formData }) => {
			formData.append('session_id', JSON.stringify(sessionId));
		}}
	>
		<Button
			class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
			type="submit"
			on:click={() => (open = false)}>Delete</Button
		>
		<Button on:click={() => (open = false)}>Cancel</Button>
	</form>
</Modal>
