<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { milliseconds, session, sessionBreak } from './stores';

	const settings: Writable<Settings> = getContext('settings');

	$: minutes = Math.floor($milliseconds / 60000 / $settings.ratio);

	let message: string;

	$: if ($session.running) {
		message = 'Break time: ' + minutes + ' min';
	} else if ($sessionBreak.running) {
		message = $sessionBreak.alarmPlayed ? 'Time for your next session!' : $settings.break_message;
	} else {
		message = '';
	}
</script>

<div class="grid w-full items-center justify-center">
	<p
		class="transition-colors {$sessionBreak.running && !$sessionBreak.alarmPlayed
			? 'text-accent-500 dark:text-accent-500'
			: 'text-secondary-900 dark:text-secondary-50'}"
	>
		{message}
	</p>
</div>
