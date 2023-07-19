<script>
	import Task from './Task.svelte';
	import SessionStopwatch from './SessionStopwatch.svelte';
	import SessionButton from './SessionButton.svelte';
	import BreakTimer from './BreakTimer.svelte';
	import DistractionButton from './DistractionButton.svelte';
	import { session, sessionStart, sessionEnd, sessionBreak, breakTimer } from './stores';
	import { ratio } from '../settings/stores';

	$: breakPercentage = (1 - $breakTimer / (($sessionEnd - $sessionStart) / $ratio)) * 100;
</script>

<div
	class="h-screen grid content-evenly pb-20 sm:pb-24 lg:pb-0"
	style:background={$sessionBreak
		? `linear-gradient(180deg, hsl(188, 60%, ${50 - breakPercentage / 3}%) 0%, hsl(22, 98%, ${50 - breakPercentage / 2}%) ${100 + breakPercentage}%)`
		: `radial-gradient(50% 50% at 50% 50.00%, #19535F 0%, #1B2021 100%)`}
>
	{#if !$sessionBreak}
		<!-- <Task /> -->
		<SessionStopwatch />
	{:else}
		<BreakTimer />
	{/if}
	<div class="grid justify-items-center gap-4">
		<SessionButton />
		{#if $session}
			<DistractionButton />
		{/if}
	</div>
</div>
