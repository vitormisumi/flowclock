<script>
	import Task from './Task.svelte';
	import SessionStopwatch from './SessionStopwatch.svelte';
	import SessionButton from './SessionButton.svelte';
	import BreakTimer from './BreakTimer.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import { session, sessionBreak } from './stores';
	import {fade } from 'svelte/transition'
</script>

{#if !$sessionBreak}
	<div
		class="bg-gradient-radial from-primary-800 to-secondary-900 h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0"
		in:fade
	>
		<Task />
		<SessionStopwatch />
		<div class="grid justify-items-center gap-4">
			<SessionButton />
			{#if $session}
				<DistractionButton />
			{/if}
		</div>
	</div>
{:else}
	<div
		class="bg-gradient-to-b from-primary-700 to-accent-500 h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0"
		in:fade
	>
		<BreakTimer />
		<div class="grid justify-items-center gap-4">
			<SessionButton />
		</div>
	</div>
{/if}
