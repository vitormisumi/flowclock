<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { timeFromTimestamp } from '$lib/functions/functions';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { canHover } from '../stores';

	const settings: Writable<Settings> = getContext('settings');

	export let session: FilteredSession;

	let startEdit = false;

	const handleClick: SubmitFunction = ({ formData }) => {
		const newStart = new Date(session.start);
		const newHour = Number(formData.get('start_time')?.slice(0, 2));
		const newMinute = Number(formData.get('start_time')?.slice(3, 5));
		newStart.setHours(newHour, newMinute);
		formData.append('session_id', String(session.id));
		formData.append('start', newStart.toISOString());
		startEdit = false;
		return async ({ update }) => {
			update();
		};
	};
</script>

{#if startEdit}
	<form method="POST" action="?/editSessionStart" class="flex gap-1" use:enhance={handleClick}>
		<input
			type="time"
			name="start_time"
			value={new Date(session.start).toTimeString().slice(0, 5)}
			class="h-8 rounded-md bg-transparent pl-1 text-secondary-300 focus:border-primary-700 focus:ring-0"
		/>
		<Button size="xs" buttonStyle="cancel" on:click={() => (startEdit = false)}>Cancel</Button>
		<Button size="xs" buttonStyle="accent" type="submit">Save</Button>
	</form>
{:else}
	<Button
		buttonStyle="transparent"
		class="col-start-1 row-start-2 cursor-text font-light text-secondary-700 dark:text-secondary-200 flex items-center gap-1"
		on:click={() => (startEdit = true)}
	>
		<iconify-icon icon="ion:play" />{timeFromTimestamp(session.start, $settings.clock_format)}
	</Button>
	{#if $canHover}
		<Tooltip>Edit start time</Tooltip>
	{/if}
{/if}
