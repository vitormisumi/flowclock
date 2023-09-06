<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Settings } from '../settings/types';
	import { getContext } from 'svelte';
	import { session, sessionBreak } from './stores';
	import SessionButton from './SessionButton.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import Notification from '../../Notification.svelte';

	const settings: Writable<Settings> = getContext('settings');

	export let form;

	$: minutes = Math.floor((Date.now() - $session.start) / 60000 / $settings.ratio);
</script>

<div
	class="grid gap-4 justify-items-center content-end p-4 text-center text-secondary-100 w-full md:text-xl lg:text-2xl font-light h-full"
>
	{#if $session.running}
		<p class="h-20">
			You have earned {minutes}
			{minutes === 1 ? 'minute' : 'minutes'} of break
		</p>
	{:else if $sessionBreak.running}
		<p class="h-20">
			{$sessionBreak.alarmPlayed ? 'Time for your next session!' : 'Enjoy your break!'}
		</p>
	{:else}
		<p class="h-20">
			You currently have no sessions running. Click the button below to start a new one.
		</p>
	{/if}
	<SessionButton />
	<DistractionButton />
</div>

{#if form}
	{#if form?.success}
		<Notification message={form?.message} success={form?.success} />
	{:else}
		<Notification message={form?.message} success={form?.success} />
	{/if}
{/if}

