<script lang="ts">
	import { Button, Modal, Tooltip } from 'flowbite-svelte';
	import { timeFromTimestamp, dateFromTimestamp } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { filteredSessions } from './stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';

	const settings: Writable<Settings> = getContext('settings');

	export let session: FilteredSession;

	let open = false;

	let sessionId: number | null;
	$: sessionToDelete = $filteredSessions.find(({ id }) => id === sessionId);

	let loading = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		formData.append('session_id', JSON.stringify(sessionId));
		loading = true;
		return async ({ update }) => {
			loading = false;
			open = false;
			update();
		};
	};
</script>

<Button
	size="xs"
	class="bg-transparent text-red-700 hover:bg-primary-700"
	on:click={() => {
		open = true;
		sessionId = session.id;
	}}
>
	<i class="fa-solid fa-trash" />
</Button>
<Tooltip placement="left">Delete session</Tooltip>
<Modal
	bind:open
	outsideclose
	size="xs"
	class="bg-secondary-900 text-center landscape:left-8 landscape:md:left-12"
>
	<i class="fa-solid fa-warning text-3xl text-red-700" />
	<p class="whitespace-normal text-secondary-200">
		Delete session at {dateFromTimestamp(
			sessionToDelete?.start,
			$settings.date_format,
			$settings.separator
		)} from
		{timeFromTimestamp(sessionToDelete?.start, $settings.clock_format)} to {timeFromTimestamp(
			sessionToDelete?.end,
			$settings.clock_format
		)}?
	</p>
	<form
		class="flex w-full justify-center gap-4"
		method="POST"
		action="?/deleteSession"
		use:enhance={handleClick}
	>
		<Button
			class="border-2 border-red-900 bg-transparent text-red-700 hover:bg-red-950"
			type="submit"
			disabled={loading}
		>
			Delete
		</Button>
		<Button disabled={loading} on:click={() => (open = false)}>Cancel</Button>
	</form>
</Modal>
