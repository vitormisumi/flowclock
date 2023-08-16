<script lang="ts">
	import SessionStopwatch from './SessionStopwatch.svelte';
	import SessionButton from './SessionButton.svelte';
	import BreakTimer from './BreakTimer.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import { session, sessionBreak } from './stores';
	import Notification from '../Notification.svelte';
	

	export let form;
</script>

<div
	class="h-screen grid justify-items-center content-evenly pb-20 sm:pb-24 lg:pb-0 bg-primary-900"
>
	{#if !$sessionBreak.running}
		<SessionStopwatch />
	{:else}
		<BreakTimer />
	{/if}
	<div class="grid justify-items-center gap-4">
		<SessionButton />
		{#if $session.running}
			<DistractionButton />
		{/if}
	</div>
	{#if form}
		{#if form?.success}
			<Notification message={form?.message} success={form?.success}/>
		{:else}
			<Notification message={form?.message} success={form?.success}/>
		{/if}
	{/if}
</div>
