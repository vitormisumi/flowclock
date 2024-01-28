<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import { timeFromTimestamp, dateFromTimestamp } from '$lib/functions/functions';
	import { enhance } from '$app/forms';
	import { filteredSessions } from './stores';
	import { windowWidth } from '../projects/stores';
	import { getContext } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
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
	class="flex items-center rounded-lg bg-transparent px-3 py-2 text-xs transition-colors hover:bg-primary-200 dark:bg-transparent dark:hover:bg-primary-700"
	tabindex="0"
	on:click|stopPropagation={() => {
		open = true;
		sessionId = session.id;
	}}
	on:keydown|stopPropagation
>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</button>
{#if $windowWidth >= 768}
	<Tooltip placement="left" class="bg-secondary-400 dark:bg-secondary-800">Delete session</Tooltip>
{/if}
<Modal bind:open outsideclose size="xs">
	<i class="fa-solid fa-warning text-3xl dark:text-red-700" />
	<p class="whitespace-normal dark:text-secondary-200">
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
		method="POST"
		action="?/deleteSession"
		class="flex w-full justify-center gap-4"
		use:enhance={handleClick}
	>
		<button
			disabled={loading}
			class="flex items-center rounded-lg bg-primary-200 px-5 py-2.5 text-sm font-medium text-primary-900 transition-colors hover:bg-primary-100 dark:bg-primary-800 dark:text-primary-50"
			on:click|stopPropagation={() => (open = false)}
		>
			Cancel
		</button>
		<button
			class="rounded-lg border-none bg-red-600 px-5 py-2.5 text-sm font-medium text-red-50 transition-colors hover:bg-red-700 focus:ring-0 dark:bg-red-600 dark:text-red-50 hover:dark:bg-red-700"
			type="submit"
			disabled={loading}
			on:click|stopPropagation
		>
			Delete
		</button>
	</form>
</Modal>
