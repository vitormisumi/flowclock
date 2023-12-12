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

<button
	class="flex items-center rounded-lg bg-transparent px-3 py-2 text-xs text-red-700 transition-colors hover:bg-primary-700"
	tabindex="0"
	on:click|stopPropagation={() => {
		open = true;
		sessionId = session.id;
	}}
	on:keydown|stopPropagation
>
	<i class="fa-solid fa-trash" />
</button>
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
	<div class="flex w-full justify-center gap-4">
		<form method="POST" action="?/deleteSession" use:enhance={handleClick}>
			<button
				class="rounded-lg border-2 border-red-900 bg-transparent px-5 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-950"
				type="submit"
				disabled={loading}
				on:click|stopPropagation
			>
				Delete
			</button>
		</form>
		<button
			disabled={loading}
			class="flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-primary-50 transition-colors hover:bg-primary-800"
			on:click|stopPropagation={() => (open = false)}>Cancel</button
		>
	</div>
</Modal>
