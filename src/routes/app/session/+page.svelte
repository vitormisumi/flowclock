<script lang="ts">
	import BreakEarned from './BreakEarned.svelte';
	import SessionButton from './SessionButton.svelte';
	import BreakTimer from './BreakTimer.svelte';
	// import DistractionButton from './DistractionButton.svelte';
	import { session, sessionBreak } from './stores';
	import Notification from '../../Notification.svelte';

	export let form;
</script>

<div class="relative h-full">
	{#if $session.running}
		<BreakEarned />
	{:else if $sessionBreak.running}
		<BreakTimer />
	{:else}
		<div class="absolute w-full h-full flex justify-center items-center">
			<p class="text-secondary-100 text-center max-w-md">
				You currently have no sessions running. Click the button below to start a new one.
			</p>
		</div>
	{/if}
	<SessionButton />
	<!-- {#if $session.running}
		<DistractionButton />
	{/if} -->
	{#if form}
		{#if form?.success}
			<Notification message={form?.message} success={form?.success} />
		{:else}
			<Notification message={form?.message} success={form?.success} />
		{/if}
	{/if}
</div>
