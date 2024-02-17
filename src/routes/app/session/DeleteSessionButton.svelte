<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { dateFromTimestamp, timeFromTimestamp } from '$lib/functions/functions';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { filteredSessions } from '../dashboard/stores';
	import { canHover } from '../stores';

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
	buttonStyle="menu"
	tabindex="0"
	on:click={(e) => {
		open = true;
		sessionId = session.id;
		e.stopPropagation();
	}}
	on:keydown={(e) => e.stopPropagation()}
>
	<i class="fa-solid fa-trash text-red-700 dark:text-red-700" />
</Button>
{#if $canHover}
	<Tooltip placement="left">Delete session</Tooltip>
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
		<Button
			disabled={loading}
			buttonStyle="cancel"
			on:click={(e) => {
				e.stopPropagation();
				open = false;
			}}
		>
			Cancel
		</Button>
		<Button buttonStyle="red" type="submit" disabled={loading} on:click={(e) => e.stopPropagation}>
			Delete
		</Button>
	</form>
</Modal>
