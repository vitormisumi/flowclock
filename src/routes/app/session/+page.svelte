<script lang="ts">
	import Task from './Task.svelte';
	import SessionStopwatch from './SessionStopwatch.svelte';
	import SessionButton from './SessionButton.svelte';
	import BreakTimer from './BreakTimer.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import { session, sessionBreak } from './stores';

	export let form;
</script>

<div class="h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0 bg-primary-900">
	{#if !$sessionBreak}
		<!-- <Task /> -->
		<SessionStopwatch />
	{:else}
		<BreakTimer />
	{/if}
	<div class="grid justify-items-center gap-4">
		<SessionButton {form}/>
		{#if $session}
			<DistractionButton />
		{/if}
	</div>
</div>

