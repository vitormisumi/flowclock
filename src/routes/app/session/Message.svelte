<script lang="ts">
	import { Popover } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';
	import { milliseconds, session, sessionBreak, sessionFocus } from './stores';

	export let settings: Settings;
	export let tasks: Task[];
	export let intentions: Intention[];

	$: breakMinutes = Math.floor($milliseconds / 60000 / settings.ratio);

	let focusName: string | undefined;

	$: switch ($sessionFocus.type) {
		case 'task':
			focusName = tasks.find((task) => task.id === $sessionFocus.id)?.name;
			break;
		case 'intention':
			focusName = intentions.find((intention) => intention.id === $sessionFocus.id)?.name;
			break;
		default:
			focusName = undefined;
	}
</script>

<div class="grid w-full items-center justify-center text-secondary-900 dark:text-secondary-50">
	{#if $session.running}
		<p in:fade>Break time: {breakMinutes} min</p>
		{#if focusName}
			<p class="truncate" in:fade>Focusing on: {focusName}</p>
		{/if}
		<Popover class="max-w-md bg-primary-50 dark:bg-primary-900">
			<p class="text-sm font-light text-primary-900 dark:text-primary-50">
				FlowClock sessions are designed to help you stay focused on one task at a time. If you
				finish your task and want to move on to a new one, simply complete the current session,
				select a new task, and start a new session.
			</p>
		</Popover>
	{:else if $sessionBreak.running && !$sessionBreak.alarmPlayed}
		<p class="text-accent-500 dark:text-accent-500" in:fade>{settings.break_message}</p>
	{:else}
		<p in:fade>Time for your next session!</p>
	{/if}
</div>
